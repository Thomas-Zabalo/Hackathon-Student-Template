# 🔄 API FastAPI - Adaptation au Schéma Dev

## ✅ Schéma SQL


### Tables utilisées :

```sql
-- 1. team
CREATE TABLE team (
    id serial PRIMARY KEY,
    nom varchar
);

-- 2. users
CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar,
    surname varchar,
    adresse varchar,
    mdp varchar,
    team_id integer,
    is_admin boolean,
    created_at timestamp,
    FOREIGN KEY(team_id) REFERENCES team(id)
);

-- 3. babyfoot
CREATE TABLE babyfoot (
    id serial PRIMARY KEY,
    id_match integer,
    is_used boolean,
    etat varchar
);

-- 4. matches
CREATE TABLE matches (
    id serial PRIMARY KEY,
    score_1 integer,
    score_2 integer,
    id_equipe_1 integer NOT NULL,
    id_equipe_2 integer NOT NULL,
    vitesse_max float,
    babyfoot_id integer NOT NULL,
    create_at datetime,
    FOREIGN KEY(id_equipe_1) REFERENCES team(id),
    FOREIGN KEY(id_equipe_2) REFERENCES team(id),
    FOREIGN KEY(babyfoot_id) REFERENCES babyfoot(id)
);

-- 5. goal
CREATE TABLE goal (
    id serial PRIMARY KEY,
    id_equipe integer NOT NULL,
    id_match integer NOT NULL,
    vitesse float,
    FOREIGN KEY(id_equipe) REFERENCES team(id),
    FOREIGN KEY(id_match) REFERENCES matches(id)
);
```

---

## 🎯 Endpoints Adaptés

### **1. Top Buteurs** - `GET /api/defi/top-scorers`

**Adaptation** :
- ✅ Utilise la table `goal` pour compter les buts par équipe
- ✅ Joint avec `users` pour obtenir le nom des joueurs
- ✅ Joint avec `team` pour associer les buts à l'équipe du joueur
- ✅ Compte les buts via `COUNT(g.id)` (nombre de lignes dans `goal` par équipe)

**Logique** :
```sql
SELECT 
    u.id,
    CONCAT(u.name, ' ', u.surname) AS player_name,
    t.nom AS team_name,
    COUNT(g.id) AS total_goals  -- Compte des goals de l'équipe
FROM users u
JOIN team t ON u.team_id = t.id
JOIN matches m ON (m.id_equipe_1 = t.id OR m.id_equipe_2 = t.id)
JOIN goal g ON g.id_match = m.id AND g.id_equipe = t.id
GROUP BY u.id
ORDER BY total_goals DESC
```

**Réponse JSON** :
```json
[
  {
    "user_id": 42,
    "player_name": "Alexandre Martin",
    "team_name": "Les Guerriers",
    "total_goals": 342,
    "total_matches": 98,
    "avg_goals_per_match": 3.49
  }
]
```

---

### **2. Top Équipes** - `GET /api/defi/top-teams`

**Adaptation** :
- ✅ Remplace "Top Défenseurs" (concept absent du schéma)
- ✅ Classement des équipes par nombre de victoires
- ✅ Calcule le win rate par équipe

**Logique** :
```sql
SELECT 
    t.id,
    t.nom,
    COUNT(DISTINCT m.id) AS total_matches,
    SUM(CASE 
        WHEN (m.id_equipe_1 = t.id AND m.score_1 > m.score_2) THEN 1
        WHEN (m.id_equipe_2 = t.id AND m.score_2 > m.score_1) THEN 1
        ELSE 0
    END) AS total_wins
FROM team t
JOIN matches m ON (m.id_equipe_1 = t.id OR m.id_equipe_2 = t.id)
GROUP BY t.id
ORDER BY total_wins DESC
```

**Réponse JSON** :
```json
[
  {
    "team_id": 5,
    "team_name": "Les Champions",
    "total_members": 12,
    "total_matches": 187,
    "total_wins": 105,
    "win_rate": 56.15
  }
]
```

---

### **3. Balance Équipe 1 vs Équipe 2** - `GET /api/defi/team-balance`

**Adaptation** :
- ✅ Analyse l'influence de la **position** (équipe 1 vs équipe 2)
- ✅ Remplace "Rouge vs Bleu" par "Position 1 vs Position 2"
- ✅ Détecte les babyfoots déséquilibrés (> 55% victoires pour une position)

**Logique** :
```sql
SELECT 
    b.id AS babyfoot_id,
    b.etat AS babyfoot_status,
    COUNT(*) AS total_matches,
    SUM(CASE WHEN m.score_1 > m.score_2 THEN 1 ELSE 0 END) AS team1_wins,
    SUM(CASE WHEN m.score_2 > m.score_1 THEN 1 ELSE 0 END) AS team2_wins,
    SUM(CASE WHEN m.score_1 = m.score_2 THEN 1 ELSE 0 END) AS draws
FROM matches m
JOIN babyfoot b ON b.id = m.babyfoot_id
GROUP BY b.id
```

**Réponse JSON** :
```json
[
  {
    "babyfoot_id": 3,
    "babyfoot_status": "bon état",
    "total_matches": 524,
    "team1_wins": 267,
    "team2_wins": 253,
    "draws": 4,
    "team1_win_rate": 50.95,
    "status": "OK - Équilibré"
  },
  {
    "babyfoot_id": 7,
    "babyfoot_status": "usé",
    "total_matches": 187,
    "team1_wins": 105,
    "team2_wins": 80,
    "draws": 2,
    "team1_win_rate": 56.15,
    "status": "ALERTE : Déséquilibré (Équipe 1 avantagée)"
  }
]
```

---

### **4. Test Chi-carré** - `GET /api/defi/chi-square-test`

**Adaptation** :
- ✅ Teste l'influence de la **position** (équipe 1 vs équipe 2)
- ✅ Remplace "Rouge vs Bleu" par analyse de position
- ✅ Même calcul statistique (χ² et p-value)

**Conclusion adaptée** :
- Si significatif + team1_win_rate > 50% : *"L'ÉQUIPE 1 (position 1) a un avantage significatif"*
- Si significatif + team1_win_rate < 50% : *"L'ÉQUIPE 2 (position 2) a un avantage significatif"*

**Réponse JSON** :
```json
{
  "chi2_statistic": 8.2341,
  "p_value": 0.016,
  "is_significant": true,
  "conclusion": "L'ÉQUIPE 1 (position 1) a un avantage significatif (+0.61% de victoires)",
  "team1_wins": 12543,
  "team2_wins": 12389,
  "draws": 70,
  "team1_win_rate": 50.17
}
```

---

### **5. Statistiques Globales** - `GET /api/stats/overview`

**Adaptation** :
- ✅ Compte total de matches, users, teams, babyfoots
- ✅ Moyenne de buts par match (score_1 + score_2)
- ✅ Total de goals enregistrés dans la table `goal`

**Réponse JSON** :
```json
{
  "total_matches": 25002,
  "total_users": 803,
  "total_teams": 156,
  "total_babyfoots": 30,
  "avg_goals_per_match": 6.42,
  "total_goals_scored": 160513
}
```

---

### **6. Matches Récents** - `GET /api/stats/matches`

**Nouveauté** : Affiche les derniers matches avec détails complets

**Réponse JSON** :
```json
[
  {
    "match_id": 25002,
    "team1_id": 42,
    "team1_name": "Les Guerriers",
    "score_1": 10,
    "team2_id": 17,
    "team2_name": "Les Aigles",
    "score_2": 8,
    "babyfoot_id": 3,
    "vitesse_max": 87.5,
    "created_at": "2025-10-17T14:30:00",
    "winner_team_id": 42
  }
]
```

---

## 🔑 Points Clés de l'Adaptation

### ✅ Ce qui fonctionne directement :

1. **Top buteurs** → Via jointure `users` ↔ `team` ↔ `matches` ↔ `goal`
2. **Balance positions** → Analyse `score_1` vs `score_2` dans `matches`
3. **Test Chi-carré** → Calcul global sur toutes les matches
4. **Stats globales** → Agrégations sur `matches`, `users`, `team`, `babyfoot`

### ⚠️ Limitations du schéma actuel :

| Concept Souhaité | Présent ? | Alternative API |
|------------------|-----------|-----------------|
| **Saves individuelles** | ❌ Non | Top équipes par victoires |
| **Lieux (locations)** | ❌ Non | Analyse par `babyfoot_id` |
| **Durée de partie** | ❌ Non | Analyse `vitesse_max` disponible |
| **Joueurs individuels dans match** | ❌ Non | Agrégation via `team` |
| **Rouge vs Bleu** | ❌ Non | Équipe 1 vs Équipe 2 (position) |

### 💡 Recommandations (optionnelles) :

Si l'équipe Dev veut enrichir le schéma plus tard :

```sql
-- Ajout futur possible : saves individuelles
ALTER TABLE goal ADD COLUMN player_id integer;
ALTER TABLE goal ADD COLUMN is_save boolean DEFAULT FALSE;

-- Ajout futur possible : durée de match
ALTER TABLE matches ADD COLUMN duration_seconds integer;

-- Ajout futur possible : lieux
CREATE TABLE locations (
    id serial PRIMARY KEY,
    name varchar
);
ALTER TABLE babyfoot ADD COLUMN location_id integer;
```

---

## 🚀 Utilisation

### Installation

```cmd
cd rendus/ia_data/api
install.bat
```

### Configuration

Éditez `.env` :
```env
DB_HOST=localhost
DB_NAME=babyfoot_db
DB_USER=postgres
DB_PASSWORD=votre_password
DB_PORT=5432
```

### Démarrage

```cmd
start_api.bat
```

### Test

```cmd
test_api.bat
```

Ou ouvrez : **http://localhost:8000/docs**

---

## 📊 Comparaison Schéma EDA vs Schéma Dev

| Élément | Schéma EDA (Dataset) | Schéma Dev (Actuel) | Adaptation API |
|---------|----------------------|---------------------|----------------|
| **Joueurs** | player_id, player_name, player_age | users (id, name, surname) | ✅ Jointure users + team |
| **Buts** | player_goals (individuel) | goal (par équipe) | ✅ COUNT(goal) par team |
| **Saves** | player_saves (individuel) | ❌ Absent | ⚠️ Remplacé par top équipes |
| **Position** | team_color (rouge/bleu) | id_equipe_1/id_equipe_2 | ✅ Position 1 vs 2 |
| **Lieux** | location_name | ❌ Absent | ⚠️ Utilise babyfoot_id |
| **Durée** | game_duration | ❌ Absent | ❌ Non disponible |
| **Vitesse** | ❌ Absent | vitesse_max | ✅ Disponible |

---

## ✅ Validation de Compatibilité

L'API est **100% compatible** avec le schéma fourni :

- ✅ Utilise uniquement les 5 tables existantes
- ✅ Respecte toutes les foreign keys
- ✅ Aucune modification de schéma requise
- ✅ Fonctionne immédiatement après installation

**Prêt pour le hackathon !** 🎉

---

**Équipe IA & Data - Hackathon Babyfoot Ynov 2025**
