# Hackathon - Ynov Toulouse 2025 : Babyfoot du futur - IA & Data

## Equipe

- IA & Data 1 : HAMMADI Otmane
- IA & Data 2 : EL ARJOUNI Mohamed Amine

Et si on réinventait l’expérience babyfoot à Ynov ? L’objectif de ce hackathon est de moderniser et digitaliser l’usage des babyfoots présents dans le Souk pour créer un service _next-gen_, pensé pour près de 1000 étudiants !

Que ce soit via des gadgets connectés, un système de réservation intelligent, des statistiques en temps réel ou des fonctionnalités robustes pour une utilisation massive, nous cherchons des solutions innovantes qui allient créativité et technologie.

Toutes les filières sont invitées à contribuer : Dev, Data, Infra, IoT, Systèmes embarqués… chaque idée compte pour rendre le babyfoot plus fun, plus pratique et plus connecté.

Votre mission : transformer le babyfoot classique en expérience high-tech pour Ynov !

---

> Ce fichier contient les informations spécifiques à l'IA/Data de votre projet. Il suffit d'en remplir une seule fois, même si vous êtes plusieurs IA/Data dans l'équipe.

# Requis

## 📊 Travail Réalisé

### 1. Nettoyage et Préparation des Données ✅

Nous avons développé un script complet de nettoyage (`data_cleaning.py`) qui traite tous les problèmes de qualité du dataset :

#### Problèmes Identifiés et Solutions

| Problème | Impact | Solution Appliquée | Justification |
|----------|--------|-------------------|---------------|
| **Formats de dates multiples** | ~100% des dates | Parser intelligent avec `dateutil` | Conversion vers format ISO standard pour uniformité |
| **Scores avec tirets** | ~15% des scores | Extraction regex `"5-3" → 5 et 3` | Séparation en colonnes numériques distinctes |
| **Noms avec chiffres** | ~8% des noms | Remplacement `3→e, 0→o, 1→i` | Utilisation du `player_canonical_name` quand disponible |
| **Âges en texte** | ~30% des âges | Dictionnaire + regex | Conversion "twenty" → 20 pour analyses numériques |
| **Rôles inconsistants** | ~20% des rôles | Mapping Attack/Defense | Standardisation pour analyses par rôle |
| **Couleurs variées** | ~25% des couleurs | Normalisation vers Red/Blue | Élimination des emojis et variantes linguistiques |
| **Durées multiformats** | ~100% des durées | Conversion en secondes | Format unique pour comparaisons et calculs |
| **Doublons** | ~2% des lignes | Suppression par `game_id + player_id` | Éviter la double comptabilisation |

#### Métriques de Qualité

- **Taux de rétention**: ~92% des lignes conservées
- **Données valides**: Filtrage strict sur game_id, player_id, player_name
- **Standardisation**: 100% des colonnes critiques normalisées

**Fichiers produits:**
- `rendus\ia_data\data_cleaning.ipynb` - Script de nettoyage complet
- `rendus\ia_data\babyfoot_dataset_cleaned.csv` - Dataset nettoyé prêt à l'emploi

---

### 2. Analyse Exploratoire des Données (EDA) ✅

Développement d'un script d'analyse (`data_analysis.py`) répondant aux 3 questions du défi :

#### Question 1: Top 10 des Buteurs 🎯

**Méthode:**
```python
- Groupement par player_id + player_name
- Somme des player_goals
- Calcul de la moyenne buts/partie
- Tri décroissant et extraction des 10 premiers
```

**Résultats:** Top 10 identifié avec statistiques complètes (buts, passes, parties jouées, moyenne)

**Visualisation:** Graphique en barres horizontales avec valeurs

#### Question 2: Top 5 des Défenseurs 🛡️

**Méthode:**
```python
- Filtrage sur player_role == "Defense"
- Groupement par joueur
- Somme des player_saves
- Tri décroissant et extraction des 5 premiers
```

**Justification:** Seuls les défenseurs sont considérés car ce sont eux qui réalisent la majorité des saves

**Résultats:** Top 5 identifié avec statistiques (saves, buts, passes, moyenne saves/partie)

#### Question 3: Influence du Choix du Camp 🎨

**Méthode:**
```python
- Groupement par game_id pour 1 ligne/partie
- Comptage victoires par couleur (Red/Blue)
- Calcul des taux de victoire
- Test Chi-carré pour significativité
- Comparaison des scores moyens
```

**Interprétation:**
- Si différence < 5% → Pas d'influence significative
- Si différence > 5% → Avantage potentiel pour une couleur

**Résultats:** Analyse statistique détaillée avec graphiques (camembert, histogrammes)

**Fichiers produits:**
- `ia_data/data_analysis.py` - Script d'analyse (415 lignes)
- `ia_data/top_10_buteurs.png` - Visualisation
- `ia_data/victoires_par_couleur.png` - Visualisation
- `ia_data/distribution_scores.png` - Visualisation

---

### 3. Notebook Jupyter Interactif 📓

Création d'un notebook complet (`exploration.ipynb`) permettant:
- Exploration interactive du dataset
- Reproduction des analyses pas à pas
- Visualisations personnalisables
- Export des résultats en CSV

**Avantages:**
- Pédagogique pour comprendre chaque étape
- Facilite les modifications et tests
- Génère des exports pour les autres équipes

---

### 4. Participation à l'Élaboration de la Base de Données 🗄️

**Fichiers produits:**
- `ia_data/DATABASE_RECOMMENDATIONS.md` - Schéma SQL complet avec justifications EDA (6,500+ lignes)
- `ia_data/DATABASE_SCHEMA.md` - Diagramme ERD visuel
- `ia_data/export_to_sql.py` - Script d'export automatique vers seeds SQL

#### Recommandations pour l'équipe Dev FullStack

**Schéma de base de données conçu** basé sur les insights EDA :

| Table | Justification EDA | Contraintes appliquées |
|-------|-------------------|------------------------|
| `players` | 803 joueurs uniques identifiés | Âge: 12-65 ans (anomalies < 12 et > 60 détectées) |
| `locations` | 30 lieux, "Bar Le Foos" = le plus actif (10,440 parties) | Stats pré-calculées pour dashboards |
| `tables` | Tables T01-T29 identifiées | Liaison avec locations pour analytics |
| `games` | 25,002 parties analysées | Durée: 60-3600s, Scores: 0-10 (basé sur anomalies) |
| `game_players` | Corrélation goals/assists analysée | Buts max: 10/partie (0.5% dépassent = anomalie) |
| `real_time_events` | Pour intégration IoT | Détection anomalies temps réel |

**5 Endpoints API documentés** avec requêtes SQL optimisées :
- `GET /api/leaderboard/scorers` - Top 10 buteurs
- `GET /api/leaderboard/defenders` - Top 5 défenseurs  
- `GET /api/analytics/timeline` - Timeline mensuelle
- `GET /api/analytics/peak-hours` - Heures de pointe (19h = pic)
- `GET /api/analytics/team-balance` - Test Chi-carré Rouge vs Bleu

**6 Indices de performance** recommandés pour :
- Leaderboards (< 50ms attendu)
- Timeline mensuelle (< 100ms pour 25k parties)
- Recherche joueurs (< 20ms)

#### Intégration IoT/Systèmes Embarqués

**Architecture temps réel proposée** :
```
Capteurs → ESP32/MQTT → Backend → WebSocket → Dashboard live
```

**Table `real_time_events`** pour streaming :
- Détection goals/saves en temps réel
- Validation confidence_score ≥ 0.80
- Alerte admin si anomalies (durée > 30min, > 10 buts/min)

**Format MQTT standardisé** :
```
Topic: babyfoot/{location_id}/{table_id}/{event_type}
Payload: {team, timestamp, sensor, confidence}
```

#### Données exportées pour démarrage

**Seeds SQL générés** par `export_to_sql.py` :
- `01_players.sql` - Top 100 joueurs réels du dataset
- `02_locations.sql` - 30 lieux avec statistiques
- `03_tables.sql` - Tables identifiées
- `04_sample_games.sql` - 100 parties représentatives
- `05_game_players.sql` - Participations correspondantes

**Impact pour les autres équipes** :
- ✅ **Dev** : Base de données prête à l'emploi, API specs claires
- ✅ **IoT** : Schéma temps réel, seuils anomalies définis
- ✅ **Infra** : Indices optimisés, vues matérialisées, volumétrie connue

---

### 5. Documentation Complète 📚

Production de 3 documents détaillés:

1. **README.md** (300+ lignes) : Guide complet avec explications techniques
2. **QUICKSTART.md** : Guide rapide en 3 étapes
3. **requirements.txt** : Dépendances (pandas, numpy, matplotlib, seaborn, python-dateutil)

---

## 🤝 Collaboration avec les Autres Équipes

### Pour l'équipe Dev FullStack:
- ✅ Dataset nettoyé en CSV prêt pour import en base de données
- ✅ Format standardisé compatible SQL/NoSQL
- ✅ Statistiques exportables pour dashboard (top buteurs, défenseurs)
- ✅ Schéma de données documenté

### Pour l'équipe IoT/Systèmes Embarqués:
- ✅ Structure de données de référence pour capteurs
- ✅ Statistiques historiques pour comparaison avec données temps réel
- ✅ Benchmarks de performances (scores moyens, durées)

### Pour l'équipe Infra:
- ✅ Dataset de test réaliste pour tests de charge
- ✅ Volume de données connu (~100k lignes)
- ✅ Scripts reproductibles pour génération de données de test

---

## 🛠️ Choix Techniques

### Langage et Bibliothèques
- **Python 3.9+** : Standard pour la Data Science
- **Pandas** : Manipulation efficace de grands datasets
- **Matplotlib/Seaborn** : Visualisations professionnelles
- **python-dateutil** : Parsing robuste de dates variées

### Architecture du Code
- **Programmation Orientée Objet** : Classes `BabyfootDataCleaner` et `BabyfootAnalyzer`
- **Méthodes chaînables** : `cleaner.load_data().clean_dates().clean_scores()`
- **Rapports automatiques** : Métriques de qualité générées automatiquement
- **Modularité** : Chaque fonction de nettoyage est indépendante

### Gestion des Erreurs
- Validation des entrées avec `try/except`
- Valeurs par défaut intelligentes pour données manquantes
- Messages d'erreur explicites avec emojis pour lisibilité

---

## 🎯 Difficultés Rencontrées

### 1. Diversité des Formats
- **Problème**: Dates, durées et scores dans 5+ formats différents
- **Solution**: Regex + parsing intelligent + gestion des cas limites

### 2. Noms de Joueurs avec Caractères Spéciaux
- **Problème**: "Jul13 Mor3au" au lieu de "Julie Moreau"
- **Solution**: Utilisation de `player_canonical_name` comme référence + nettoyage

### 3. Données Manquantes Critiques
- **Problème**: ~8% de lignes sans game_id ou player_id
- **Solution**: Marquage comme invalides + exclusion du dataset final

### 4. Ambiguïté du "Winner"
- **Problème**: 15+ variantes (Red, rouge, R, 🔴, etc.)
- **Solution**: Mapping exhaustif vers Red/Blue/Draw standardisés

---

## 📈 Résultats et Impact

### Qualité des Données
- **Avant** : Dataset brut avec ~40% de valeurs problématiques
- **Après** : Dataset nettoyé avec 92% de lignes exploitables

### Utilisabilité
- Scripts prêts à l'emploi (installation + exécution en 2 min)
- Documentation complète pour autonomie des équipes
- Format standard compatible avec tous les outils

### Réponses au Défi
- ✅ Top 10 buteurs identifiés avec statistiques
- ✅ Top 5 défenseurs identifiés avec critères justifiés
- ✅ Influence du camp analysée avec méthode statistique rigoureuse

---

## 🚀 Pistes d'Amélioration Futures

Si plus de temps était disponible:

1. **Machine Learning** : Prédiction du gagnant basée sur composition d'équipe
2. **Détection d'anomalies** : Identification automatique de parties suspectes
3. **Analyse temporelle** : Évolution des performances par saison
4. **Clustering** : Groupement de joueurs par style de jeu
5. **API REST** : Endpoint pour requêtes en temps réel sur statistiques

---

## 💡 Conclusion

Notre travail en IA/Data fournit une base solide et exploitable pour tout le projet:
- Dataset propre et standardisé
- Analyses statistiques rigoureuses
- Documentation complète
- Code réutilisable et maintenable

Les autres équipes peuvent utiliser nos résultats immédiatement pour:
- Peupler leur base de données (Dev)
- Comparer avec données capteurs (IoT)
- Tester leur infrastructure (Infra)

**Contribution clé**: Nous avons transformé un dataset brut et chaotique en une ressource exploitable et fiable pour l'ensemble du projet.

---

**Note importante**: Tout le code a été écrit et compris par nous-mêmes. Les assistants IA ont servi uniquement pour la structure initiale et la documentation, jamais copié-collé sans compréhension.
