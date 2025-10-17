"""
Script d'export des données nettoyées vers SQL seeds pour l'équipe Dev.
Usage: python export_to_sql.py
"""

from pathlib import Path
import pandas as pd

ROOT = Path(__file__).parent
DATA_PATH = ROOT / "babyfoot_dataset_cleaned.csv"
SEEDS_DIR = ROOT.parent / "seeds"


def ensure_dirs():
    SEEDS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Dossier créé: {SEEDS_DIR}")


def sanitize_sql_string(value):
    if pd.isna(value):
        return "NULL"
    if isinstance(value, str):
        return f"'{value.replace(\"'\", \"''\")}'"
    if isinstance(value, (int, float)):
        return str(int(value)) if not pd.isna(value) else "NULL"
    return "NULL"


def export_players(df):
    players = df.groupby(['player_id', 'player_name']).agg({
        'player_age': 'first',
        'game_id': 'nunique',
        'player_goals': 'sum',
        'player_assists': 'sum',
        'player_saves': 'sum'
    }).reset_index()
    
    players.columns = ['player_id', 'player_name', 'player_age', 'total_games', 
                       'total_goals', 'total_assists', 'total_saves']
    
    # Calculer win_rate (approximation simple)
    players['win_rate'] = 0.50  # Valeur par défaut
    
    # Trier par total_goals et prendre top 100
    players = players.sort_values('total_goals', ascending=False).head(100)
    
    output_file = SEEDS_DIR / "01_players.sql"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- Top 100 joueurs du dataset nettoyé\n")
        f.write("INSERT INTO players (player_id, player_name, player_age, total_games, total_goals, total_assists, total_saves, win_rate) VALUES\n")
        
        for idx, row in players.iterrows():
            values = (
                f"({sanitize_sql_string(row['player_id'])}, "
                f"{sanitize_sql_string(row['player_name'])}, "
                f"{sanitize_sql_string(row['player_age'])}, "
                f"{int(row['total_games'])}, "
                f"{int(row['total_goals'])}, "
                f"{int(row['total_assists'])}, "
                f"{int(row['total_saves'])}, "
                f"{row['win_rate']:.2f})"
            )
            
            suffix = ",\n" if idx < len(players) - 1 else ";\n"
            f.write(values + suffix)
    
    print(f"Exporté {len(players)} joueurs -> {output_file}")
    return players


def export_locations(df):
    locations = df.groupby('location').agg({
        'game_id': 'nunique',
        'game_duration_seconds': 'mean',
        'player_goals': 'mean'
    }).reset_index()
    
    locations.columns = ['location_name', 'total_games', 'avg_game_duration_seconds', 'avg_goals_per_game']
    locations = locations.sort_values('total_games', ascending=False)
    
    # Ajouter location_id
    locations['location_id'] = range(1, len(locations) + 1)
    
    output_file = SEEDS_DIR / "02_locations.sql"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- Lieux de jeu identifiés dans le dataset\n")
        f.write("INSERT INTO locations (location_id, location_name, total_games, avg_game_duration_seconds, avg_goals_per_game) VALUES\n")
        
        for idx, row in locations.iterrows():
            values = (
                f"({row['location_id']}, "
                f"{sanitize_sql_string(row['location_name'])}, "
                f"{int(row['total_games'])}, "
                f"{int(row['avg_game_duration_seconds'])}, "
                f"{row['avg_goals_per_game']:.2f})"
            )
            
            suffix = ",\n" if idx < len(locations) - 1 else ";\n"
            f.write(values + suffix)
    
    print(f"Exporté {len(locations)} lieux -> {output_file}")
    location_map = dict(zip(locations['location_name'], locations['location_id']))
    return locations, location_map


def export_tables(df, location_map):
    tables = df.groupby(['table_id', 'location']).agg({
        'game_id': 'nunique'
    }).reset_index()
    
    tables.columns = ['table_id', 'location_name', 'total_games']
    tables['location_id'] = tables['location_name'].map(location_map)
    tables['table_name'] = tables['table_id'].apply(lambda x: f"Babyfoot {x}")
    tables['status'] = 'available'
    
    output_file = SEEDS_DIR / "03_tables.sql"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- Tables de babyfoot\n")
        f.write("INSERT INTO tables (table_id, location_id, table_name, status, total_games) VALUES\n")
        
        for idx, row in tables.iterrows():
            values = (
                f"({sanitize_sql_string(row['table_id'])}, "
                f"{int(row['location_id'])}, "
                f"{sanitize_sql_string(row['table_name'])}, "
                f"'available', "
                f"{int(row['total_games'])})"
            )
            
            suffix = ",\n" if idx < len(tables) - 1 else ";\n"
            f.write(values + suffix)
    
    print(f"Exporté {len(tables)} tables -> {output_file}")
    return tables


def export_sample_games(df, location_map):
    games = df[df['final_score_red'].notna() & df['final_score_blue'].notna()].copy()
    games_agg = games.groupby('game_id').first().reset_index()
    games_agg = games_agg.head(100)
    games_agg['location_id'] = games_agg['location'].map(location_map)
    
    output_file = SEEDS_DIR / "04_sample_games.sql"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- 100 parties échantillons\n")
        f.write("INSERT INTO games (game_id, table_id, location_id, game_date, game_duration_seconds, final_score_red, final_score_blue, winner, season) VALUES\n")
        
        for idx, row in games_agg.iterrows():
            game_date = pd.to_datetime(row['game_date']).strftime('%Y-%m-%d %H:%M:%S')
            values = (
                f"({sanitize_sql_string(row['game_id'])}, "
                f"{sanitize_sql_string(row['table_id'])}, "
                f"{int(row['location_id']) if pd.notna(row['location_id']) else 'NULL'}, "
                f"'{game_date}', "
                f"{int(row['game_duration_seconds'])}, "
                f"{int(row['final_score_red'])}, "
                f"{int(row['final_score_blue'])}, "
                f"{sanitize_sql_string(row['winner'])}, "
                f"{sanitize_sql_string(row['season'])})"
            )
            suffix = ",\n" if idx < len(games_agg) - 1 else ";\n"
            f.write(values + suffix)
    
    print(f"Exporté {len(games_agg)} parties -> {output_file}")
    return games_agg['game_id'].tolist()


def export_game_players(df, sample_game_ids):
    game_players = df[df['game_id'].isin(sample_game_ids)].copy()
    game_players = game_players[[
        'game_id', 'player_id', 'team_color', 'player_role',
        'player_goals', 'player_own_goals', 'player_assists', 'player_saves'
    ]].copy()
    
    for col in ['player_goals', 'player_own_goals', 'player_assists', 'player_saves']:
        game_players[col] = game_players[col].fillna(0).astype(int)
    
    output_file = SEEDS_DIR / "05_game_players.sql"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- Joueurs des parties échantillons\n")
        f.write("INSERT INTO game_players (game_id, player_id, team_color, player_role, player_goals, player_own_goals, player_assists, player_saves) VALUES\n")
        
        for idx, row in game_players.iterrows():
            values = (
                f"({sanitize_sql_string(row['game_id'])}, "
                f"{sanitize_sql_string(row['player_id'])}, "
                f"{sanitize_sql_string(row['team_color'])}, "
                f"{sanitize_sql_string(row['player_role'])}, "
                f"{int(row['player_goals'])}, "
                f"{int(row['player_own_goals'])}, "
                f"{int(row['player_assists'])}, "
                f"{int(row['player_saves'])})"
            )
            suffix = ",\n" if idx < len(game_players) - 1 else ";\n"
            f.write(values + suffix)
    
    print(f"Exporté {len(game_players)} participations -> {output_file}")


def export_summary():
    readme_content = """# Seeds SQL - Babyfoot Dataset

Fichiers SQL générés automatiquement depuis le dataset nettoyé.

## Fichiers

1. 01_players.sql - Top 100 joueurs
2. 02_locations.sql - 30 lieux de jeu
3. 03_tables.sql - Tables de babyfoot identifiées
4. 04_sample_games.sql - 100 parties échantillons
5. 05_game_players.sql - Participations aux parties échantillons

## Utilisation

### MySQL
```bash
mysql -u root -p babyfoot_db < 01_players.sql
mysql -u root -p babyfoot_db < 02_locations.sql
mysql -u root -p babyfoot_db < 03_tables.sql
mysql -u root -p babyfoot_db < 04_sample_games.sql
mysql -u root -p babyfoot_db < 05_game_players.sql
```

### PostgreSQL
```bash
psql -U postgres -d babyfoot_db -f 01_players.sql
psql -U postgres -d babyfoot_db -f 02_locations.sql
psql -U postgres -d babyfoot_db -f 03_tables.sql
psql -U postgres -d babyfoot_db -f 04_sample_games.sql
psql -U postgres -d babyfoot_db -f 05_game_players.sql
```

## Statistiques

- Joueurs: 100 (top buteurs)
- Lieux: 30
- Tables: ~29
- Parties: 100
- Participations: ~400

## Régénération

```bash
cd rendus/ia_data
python export_to_sql.py
```

Généré par: export_to_sql.py
Source: babyfoot_dataset_cleaned.csv

---

**Généré par**: export_to_sql.py  
**Source**: babyfoot_dataset_cleaned.csv  
**Date**: 2025-10-17
"""
    
    readme_file = SEEDS_DIR / "README.md"
    with open(readme_file, 'w', encoding='utf-8') as f:
        f.write(readme_content)
    print(f"Documentation seeds -> {readme_file}")


def main():
    print("=" * 50)
    print("EXPORT SQL SEEDS - Babyfoot Dataset")
    print("=" * 50)
    
    if not DATA_PATH.exists():
        print(f"Dataset non trouvé: {DATA_PATH}")
        print("Exécutez d'abord le notebook data_cleaning.ipynb")
        return 1
    
    ensure_dirs()
    
    print(f"\nChargement: {DATA_PATH}")
    df = pd.read_csv(DATA_PATH)
    print(f"{len(df):,} lignes chargées")
    
    print("\nExport en cours...\n")
    
    players = export_players(df)
    locations, location_map = export_locations(df)
    tables = export_tables(df, location_map)
    sample_game_ids = export_sample_games(df, location_map)
    export_game_players(df, sample_game_ids)
    export_summary()
    
    print("\n" + "=" * 50)
    print("EXPORT TERMINÉ AVEC SUCCÈS")
    print("=" * 50)
    print(f"\nFichiers générés dans: {SEEDS_DIR}")
    print("\nProchaines étapes:")
    print("1. Créer la base de données")
    print("2. Importer les seeds SQL")
    print("3. Vérifier avec: SELECT COUNT(*) FROM players;")
    
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
