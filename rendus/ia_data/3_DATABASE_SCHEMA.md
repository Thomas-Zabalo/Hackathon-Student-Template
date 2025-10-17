# Schéma de Base de Données - Diagramme ERD

```mermaid
erDiagram
    PLAYERS ||--o{ GAME_PLAYERS : participe
    GAMES ||--o{ GAME_PLAYERS : contient
    LOCATIONS ||--o{ GAMES : accueille
    LOCATIONS ||--o{ TABLES : possède
    TABLES ||--o{ GAMES : héberge
    TABLES ||--o{ REAL_TIME_EVENTS : génère

    PLAYERS {
        varchar player_id PK
        varchar player_name
        int player_age
        int total_games
        int total_goals
        int total_assists
        int total_saves
        decimal win_rate
        timestamp created_at
        timestamp updated_at
    }

    LOCATIONS {
        int location_id PK
        varchar location_name UK
        boolean is_active
        int capacity
        int total_games
        int avg_game_duration_seconds
        decimal avg_goals_per_game
        timestamp created_at
    }

    TABLES {
        varchar table_id PK
        int location_id FK
        varchar table_name
        enum status
        date last_maintenance
        int total_games
    }

    GAMES {
        varchar game_id PK
        varchar table_id FK
        int location_id FK
        datetime game_date
        int game_duration_seconds
        int final_score_red
        int final_score_blue
        enum winner
        varchar season
        timestamp created_at
    }

    GAME_PLAYERS {
        int game_player_id PK
        varchar game_id FK
        varchar player_id FK
        enum team_color
        enum player_role
        int player_goals
        int player_own_goals
        int player_assists
        int player_saves
    }

    REAL_TIME_EVENTS {
        bigint event_id PK
        varchar table_id FK
        enum event_type
        enum team_color
        timestamp timestamp
        varchar sensor_id
        decimal confidence_score
        json raw_data
    }
```

## Relations clés

- **1 Joueur** → **N Participations** (GAME_PLAYERS)
- **1 Partie** → **4 Participations** (2 Rouge, 2 Bleu)
- **1 Lieu** → **N Tables** → **N Parties**
- **1 Table** → **N Événements temps réel** (IoT)

## Contraintes d'intégrité

### Basées sur l'analyse EDA

1. **Âges réalistes**: 12 ≤ player_age ≤ 65
2. **Durées valides**: 60s ≤ game_duration ≤ 3600s
3. **Scores plausibles**: 0 ≤ final_score_* ≤ 10
4. **Buts individuels**: player_goals ≤ 10
5. **Équipes équilibrées**: 2 joueurs Rouge + 2 joueurs Bleu par partie

---

Généré depuis l'analyse EDA - Voir `DATABASE_RECOMMENDATIONS.md` pour détails complets.
