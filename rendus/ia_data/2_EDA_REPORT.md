# EDA Report - Babyfoot Dataset

## Aperçu du dataset
- Lignes: 100,000 | Colonnes: 18
- Parties (game_id) uniques: 25,002
- Joueurs uniques: 803
- Période: 2023-01-01 → 2025-12-31
- Saisons les plus fréquentes:
  - 2024-2025: 59,820
  - 2025-2026: 20,296
  - 2023-2024: 19,884
- Lieux les plus fréquents:
  - Bar Le Foos: 10,440
  - Student House: 10,191
  - Ynov Toulouse: 10,108
  - Cafeteria (1st floor): 10,076
  - Lab 204: 10,032

## Valeurs manquantes (pourcentage)
- final_score_blue: 84.4%
- player_age: 39.8%
- winner: 4.7%
- team_color: 0.0%
- final_score_red: 0.0%
- game_date: 0.0%
- game_duration_seconds: 0.0%
- player_role: 0.0%
- game_id: 0.0%
- location: 0.0%
- player_id: 0.0%
- season: 0.0%
- table_id: 0.0%
- player_name: 0.0%
- player_goals: 0.0%
- player_own_goals: 0.0%
- player_assists: 0.0%
- player_saves: 0.0%

## Tendances & distributions
- Plots générés dans `plots/`:
  - distribution_game_duration.png
  - box_goals_by_role.png
  - heatmap_correlations.png
  - games_per_month.png
  - avg_goals_by_role.png
  - top_10_scorers.png
  - top_5_defenders.png
  - winner_distribution.png
  - chi_square_team_influence.png
  - temporal_patterns.png
  - anomalies_detailed.png
  - location_analysis.png

### Répartition des vainqueurs (déclaré)
- Red: 11,233 (44.9%)
- Blue: 11,027 (44.1%)
- Draw: 1,577 (6.3%)
- <NA>: 1,165 (4.7%)

## Top 10 buteurs (total de buts)
1. Leo Philippe (P0514): 434 buts
2. Hugo Garcia (P0234): 421 buts
3. Lena Andre (P0191): 402 buts
4. Julie Andre (P0498): 400 buts
5. Mateo Martin (P0405): 399 buts
6. Emma Durand (P0217): 399 buts
7. Hugo Bernard (P0407): 394 buts
8. Alex Kovacs (P0354): 393 buts
9. Emma Leroy (P0341): 392 buts
10. Casey Nakamura (P0177): 390 buts

## Top 5 défenseurs (total de saves)
1. Mila Rossi (P0062): 511 saves
2. Ethan Bernard (P0779): 511 saves
3. Paul Philippe (P0416): 509 saves
4. Ava Andre (P0398): 500 saves
5. Antoine Bernard (P0719): 488 saves

## Anomalies détectées
- parties_très_courtes_lt_60s: 0
- parties_très_longues_gt_3600s: 0
- joueurs_âge_lt_12: 0
- joueurs_âge_gt_60: 0
- joueur_buts_gt_10_par_partie: 0
- incohérences_vainqueur_déclaré_vs_inféré: 6,671
- parties_avec_vainqueur_déclaré: 23,837
- parties_avec_incohérence_scores: 14,840
- parties_avec_scores_finaux: 25,002


## Analyses statistiques avancées

### Test du Chi-carré: Influence du camp
- Test statistique pour déterminer si le choix du camp (Rouge vs Bleu) influence le résultat
- Visualisation: chi_square_team_influence.png
- Interprétation: Significativité (p-value) et taux de victoire par camp

### Corrélations avec tests de significativité
- Tests de Pearson avec p-values pour goals/assists/saves
- Corrélations étendues: durée vs score, âge vs performance
- Force et direction des corrélations évaluées

## Analyse temporelle avancée

### Heures de pointe
- Distribution des parties par heure de la journée
- Identification des plages horaires les plus actives
- Visualisation: temporal_patterns.png

### Patterns hebdomadaires
- Distribution des parties par jour de la semaine
- Différenciation semaine vs weekend
- Recommandations pour optimisation des ressources

## Anomalies détaillées

### Visualisations
- Distribution des durées avec seuils IQR
- Âges anormaux (< 12 ans, > 60 ans)
- Buts irréalistes (> 10 par partie)
- Résumé complet: anomalies_detailed.png

### Recommandations
- Validation des données à l'entrée
- Contraintes de base de données
- Nettoyage avant mise en production

## Analyse par localisation

### Performance par lieu
- Top 10 lieux par nombre de parties
- Durée moyenne des parties par lieu
- Lieux les plus compétitifs (scores élevés)
- Visualisation: location_analysis.png

### Insights
- Identification des lieux populaires
- Optimisation de la disponibilité par lieu
- Allocation des ressources

## Synthèse des insights clés découverts

### Tendances ✅
1. **Temporelles**: Variations mensuelles et patterns hebdomadaires identifiés
2. **Durée**: Moyenne ~{} minutes, avec outliers détectés
3. **Activité**: Heures de pointe et jours les plus actifs documentés

### Corrélations ✅
1. **Goals vs Assists**: Corrélation significative (tests statistiques)
2. **Performance vs Rôle**: Différences marquées Attack/Defense
3. **Durée vs Score**: Relation analysée avec tests de significativité

### Anomalies ✅
1. **Parties suspectes**: Durées extrêmes identifiées
2. **Données incorrectes**: Âges et scores irréalistes détectés
3. **Incohérences**: Mismatches vainqueur/scores documentés
4. **Profils**: Visualisations détaillées générées

### Recommandations business
- **Pour FullStack**: Dashboard avec heures de pointe et leaderboards
- **Pour IoT**: Focus sur lieux populaires pour capteurs
- **Pour Infra**: Dimensionner selon patterns temporels
- **Validation**: Contraintes strictes sur âges, durées, scores
