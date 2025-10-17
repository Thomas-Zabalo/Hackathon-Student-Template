"""
FastAPI - Défi Data Science Babyfoot
Endpoints pour accéder aux analyses EDA et statistiques
Compatible avec le schéma SQL existant de l'équipe Dev
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration
app = FastAPI(
    title="Babyfoot Analytics API",
    description="API pour accéder aux analyses du défi Data Science - Schéma Dev compatible",
    version="1.0.0"
)

# CORS pour permettre l'accès depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En production, spécifier les domaines autorisés
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration PostgreSQL
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "database": os.getenv("DB_NAME", "babyfoot_db"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", "postgres"),
    "port": os.getenv("DB_PORT", "5432")
}


# ============================================================================
# MODELS (Pydantic)
# ============================================================================

class Player(BaseModel):
    user_id: int
    player_name: str
    team_name: Optional[str] = None
    total_goals: int
    total_matches: int
    avg_goals_per_match: float


class TeamInfo(BaseModel):
    team_id: int
    team_name: str
    total_members: int
    total_matches: int
    total_wins: int
    win_rate: float


class TeamBalance(BaseModel):
    babyfoot_id: int
    babyfoot_status: str
    total_matches: int
    team1_wins: int
    team2_wins: int
    draws: int
    team1_win_rate: float
    status: str


class GameStats(BaseModel):
    total_matches: int
    total_users: int
    total_teams: int
    total_babyfoots: int
    avg_goals_per_match: float
    total_goals_scored: int


class MatchDetail(BaseModel):
    match_id: int
    team1_id: int
    team1_name: str
    score_1: int
    team2_id: int
    team2_name: str
    score_2: int
    babyfoot_id: int
    vitesse_max: Optional[float] = None
    created_at: Optional[datetime] = None
    winner_team_id: Optional[int] = None


class ChiSquareResult(BaseModel):
    chi2_statistic: float
    p_value: float
    is_significant: bool
    conclusion: str
    team1_wins: int
    team2_wins: int
    draws: int
    team1_win_rate: float


# ============================================================================
# DATABASE CONNECTION
# ============================================================================

def get_db_connection():
    """Créer une connexion à la base de données PostgreSQL"""
    try:
        conn = psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")


# ============================================================================
# ROUTES - DÉFI DATA SCIENCE
# ============================================================================

@app.get("/")
def root():
    """Page d'accueil de l'API"""
    return {
        "message": "Bienvenue sur l'API Babyfoot Analytics - Compatible schéma Dev",
        "version": "1.0.0",
        "schema": "team, users, babyfoot, matches, goal",
        "endpoints": {
            "docs": "/docs",
            "health": "/health",
            "defi": {
                "top_scorers": "/api/defi/top-scorers",
                "top_teams": "/api/defi/top-teams",
                "team_balance": "/api/defi/team-balance",
                "chi_square_test": "/api/defi/chi-square-test"
            },
            "stats": {
                "overview": "/api/stats/overview",
                "recent_matches": "/api/stats/matches"
            }
        }
    }


@app.get("/api/defi/top-scorers", response_model=List[Player])
def get_top_scorers(limit: int = Query(10, ge=1, le=50, description="Nombre de joueurs à retourner")):
    """
    Top buteurs
    Retourne les meilleurs buteurs basés sur le total de buts marqués.
    Utilise les tables: goal, users, team
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Requête adaptée au schéma existant
        query = """
            WITH user_goals AS (
                SELECT 
                    u.id,
                    CONCAT(u.name, ' ', u.surname) AS player_name,
                    t.nom AS team_name,
                    COUNT(DISTINCT g.id_match) AS total_matches,
                    COUNT(g.id) AS total_goals
                FROM users u
                LEFT JOIN team t ON u.team_id = t.id
                LEFT JOIN matches m ON (m.id_equipe_1 = u.team_id OR m.id_equipe_2 = u.team_id)
                LEFT JOIN goal g ON g.id_match = m.id AND g.id_equipe = u.team_id
                GROUP BY u.id, u.name, u.surname, t.nom
                HAVING COUNT(g.id) > 0
            )
            SELECT 
                id AS user_id,
                player_name,
                team_name,
                total_goals,
                total_matches,
                ROUND(total_goals::decimal / NULLIF(total_matches, 0), 2) AS avg_goals_per_match
            FROM user_goals
            ORDER BY total_goals DESC
            LIMIT %s;
        """
        
        cursor.execute(query, (limit,))
        results = cursor.fetchall()
        
        if not results:
            raise HTTPException(status_code=404, detail="Aucun buteur trouvé")
        
        return [
            Player(
                user_id=row['user_id'],
                player_name=row['player_name'],
                team_name=row['team_name'],
                total_goals=row['total_goals'],
                total_matches=row['total_matches'],
                avg_goals_per_match=float(row['avg_goals_per_match'] or 0)
            )
            for row in results
        ]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query error: {str(e)}")
    finally:
        conn.close()


@app.get("/api/defi/top-teams", response_model=List[TeamInfo])
def get_top_teams(limit: int = Query(5, ge=1, le=20, description="Nombre d'équipes à retourner")):
    """
    Top équipes (classement par victoires)
    
    Note: Le schéma actuel n'a pas de notion de "saves" individuelles.
    Cette route retourne les meilleures équipes par nombre de victoires.
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        query = """
            WITH team_stats AS (
                SELECT 
                    t.id,
                    t.nom,
                    COUNT(DISTINCT u.id) AS total_members,
                    COUNT(DISTINCT m.id) AS total_matches,
                    SUM(CASE 
                        WHEN (m.id_equipe_1 = t.id AND m.score_1 > m.score_2) THEN 1
                        WHEN (m.id_equipe_2 = t.id AND m.score_2 > m.score_1) THEN 1
                        ELSE 0
                    END) AS total_wins
                FROM team t
                LEFT JOIN users u ON u.team_id = t.id
                LEFT JOIN matches m ON m.id_equipe_1 = t.id OR m.id_equipe_2 = t.id
                GROUP BY t.id, t.nom
            )
            SELECT 
                id AS team_id,
                nom AS team_name,
                total_members,
                total_matches,
                total_wins,
                ROUND(100.0 * total_wins / NULLIF(total_matches, 0), 2) AS win_rate
            FROM team_stats
            WHERE total_matches > 0
            ORDER BY total_wins DESC, win_rate DESC
            LIMIT %s;
        """
        
        cursor.execute(query, (limit,))
        results = cursor.fetchall()
        
        if not results:
            raise HTTPException(status_code=404, detail="Aucune équipe trouvée")
        
        return [
            TeamInfo(
                team_id=row['team_id'],
                team_name=row['team_name'],
                total_members=row['total_members'],
                total_matches=row['total_matches'],
                total_wins=row['total_wins'],
                win_rate=float(row['win_rate'] or 0)
            )
            for row in results
        ]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query error: {str(e)}")
    finally:
        conn.close()


@app.get("/api/defi/team-balance", response_model=List[TeamBalance])
def get_team_balance(
    min_matches: int = Query(5, ge=1, description="Nombre minimum de matches pour inclure un babyfoot")
):
    """
    Influence de la position (Équipe 1 vs Équipe 2)
    
    Analyse l'équilibre entre victoires de l'équipe 1 et équipe 2 par babyfoot.
    Équipe 1 = id_equipe_1 (position gauche supposée)
    Équipe 2 = id_equipe_2 (position droite supposée)
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        query = """
            WITH match_results AS (
                SELECT 
                    m.babyfoot_id,
                    COUNT(*) AS total_matches,
                    SUM(CASE 
                        WHEN m.score_1 > m.score_2 THEN 1 
                        ELSE 0 
                    END) AS team1_wins,
                    SUM(CASE 
                        WHEN m.score_2 > m.score_1 THEN 1 
                        ELSE 0 
                    END) AS team2_wins,
                    SUM(CASE 
                        WHEN m.score_1 = m.score_2 THEN 1 
                        ELSE 0 
                    END) AS draws
                FROM matches m
                GROUP BY m.babyfoot_id
                HAVING COUNT(*) >= %s
            )
            SELECT 
                b.id AS babyfoot_id,
                COALESCE(b.etat, 'inconnu') AS babyfoot_status,
                mr.total_matches,
                mr.team1_wins,
                mr.team2_wins,
                mr.draws,
                ROUND(100.0 * mr.team1_wins / mr.total_matches, 2) AS team1_win_rate,
                CASE 
                    WHEN (100.0 * mr.team1_wins / mr.total_matches) > 55 THEN 'ALERTE : Déséquilibré (Équipe 1 avantagée)'
                    WHEN (100.0 * mr.team1_wins / mr.total_matches) < 45 THEN 'ALERTE : Déséquilibré (Équipe 2 avantagée)'
                    ELSE 'OK - Équilibré'
                END AS status
            FROM match_results mr
            JOIN babyfoot b ON b.id = mr.babyfoot_id
            ORDER BY mr.total_matches DESC;
        """
        
        cursor.execute(query, (min_matches,))
        results = cursor.fetchall()
        
        if not results:
            raise HTTPException(status_code=404, detail="Aucune donnée de balance trouvée")
        
        return [
            TeamBalance(
                babyfoot_id=row['babyfoot_id'],
                babyfoot_status=row['babyfoot_status'],
                total_matches=row['total_matches'],
                team1_wins=row['team1_wins'],
                team2_wins=row['team2_wins'],
                draws=row['draws'],
                team1_win_rate=float(row['team1_win_rate']),
                status=row['status']
            )
            for row in results
        ]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query error: {str(e)}")
    finally:
        conn.close()


@app.get("/api/defi/chi-square-test", response_model=ChiSquareResult)
def get_chi_square_test():
    """
    Influence de la position d'équipe
    
    Calcule le test Chi-carré pour déterminer si la position (équipe 1 vs équipe 2)
    influence significativement le résultat des matches.
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        # Récupérer les données globales
        query = """
            SELECT 
                SUM(CASE WHEN score_1 > score_2 THEN 1 ELSE 0 END) AS team1_wins,
                SUM(CASE WHEN score_2 > score_1 THEN 1 ELSE 0 END) AS team2_wins,
                SUM(CASE WHEN score_1 = score_2 THEN 1 ELSE 0 END) AS draws,
                COUNT(*) AS total_matches
            FROM matches;
        """
        
        cursor.execute(query)
        result = cursor.fetchone()
        
        if not result or result['total_matches'] == 0:
            raise HTTPException(status_code=404, detail="Aucune donnée de match trouvée")
        
        team1_wins = result['team1_wins']
        team2_wins = result['team2_wins']
        draws = result['draws']
        total_matches = result['total_matches']
        
        # Calculer le test Chi-carré
        # Hypothèse nulle : distribution égale (50% équipe 1, 50% équipe 2)
        expected_wins = total_matches / 2
        
        # Chi-carré = Σ((Observé - Attendu)² / Attendu)
        chi2_statistic = (
            ((team1_wins - expected_wins) ** 2) / expected_wins +
            ((team2_wins - expected_wins) ** 2) / expected_wins
        )
        
        # Approximation simple de la p-value pour 1 degré de liberté
        # Pour χ² critique à α=0.05 (95% confiance) = 3.841
        if chi2_statistic > 10.828:  # p < 0.001
            p_value = 0.001
        elif chi2_statistic > 6.635:  # p < 0.01
            p_value = 0.01
        elif chi2_statistic > 3.841:  # p < 0.05
            p_value = 0.05
        else:
            p_value = 0.10  # Non significatif
        
        is_significant = chi2_statistic > 3.841  # Seuil α = 0.05
        team1_win_rate = round(100.0 * team1_wins / total_matches, 2)
        
        conclusion = ""
        if is_significant:
            if team1_win_rate > 50:
                conclusion = f"L'ÉQUIPE 1 (position 1) a un avantage significatif (+{team1_win_rate - 50:.2f}% de victoires)"
            else:
                conclusion = f"L'ÉQUIPE 2 (position 2) a un avantage significatif (+{50 - team1_win_rate:.2f}% de victoires)"
        else:
            conclusion = "Aucune différence significative entre les positions (hypothèse nulle acceptée)"
        
        return ChiSquareResult(
            chi2_statistic=round(chi2_statistic, 4),
            p_value=p_value,
            is_significant=is_significant,
            conclusion=conclusion,
            team1_wins=team1_wins,
            team2_wins=team2_wins,
            draws=draws,
            team1_win_rate=team1_win_rate
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query error: {str(e)}")
    finally:
        conn.close()


# ============================================================================
# ROUTES - STATISTIQUES GÉNÉRALES
# ============================================================================

@app.get("/api/stats/overview", response_model=GameStats)
def get_overview_stats():
    """
    Statistiques générales du système
    Basé sur le schéma: team, users, babyfoot, matches, goal
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        query = """
            SELECT 
                COUNT(DISTINCT m.id) AS total_matches,
                COUNT(DISTINCT u.id) AS total_users,
                COUNT(DISTINCT t.id) AS total_teams,
                COUNT(DISTINCT b.id) AS total_babyfoots,
                ROUND(AVG(m.score_1 + m.score_2), 2) AS avg_goals_per_match,
                COUNT(DISTINCT g.id) AS total_goals_scored
            FROM matches m
            CROSS JOIN users u
            CROSS JOIN team t
            CROSS JOIN babyfoot b
            LEFT JOIN goal g ON g.id_match = m.id;
        """
        
        cursor.execute(query)
        result = cursor.fetchone()
        
        if not result:
            raise HTTPException(status_code=404, detail="Aucune statistique disponible")
        
        return GameStats(
            total_matches=result['total_matches'] or 0,
            total_users=result['total_users'] or 0,
            total_teams=result['total_teams'] or 0,
            total_babyfoots=result['total_babyfoots'] or 0,
            avg_goals_per_match=float(result['avg_goals_per_match'] or 0),
            total_goals_scored=result['total_goals_scored'] or 0
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query error: {str(e)}")
    finally:
        conn.close()


@app.get("/api/stats/matches", response_model=List[MatchDetail])
def get_recent_matches(limit: int = Query(10, ge=1, le=50)):
    """
    Matches récents avec détails complets
    Basé sur la table matches avec jointures team
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        query = """
            SELECT 
                m.id AS match_id,
                m.id_equipe_1 AS team1_id,
                t1.nom AS team1_name,
                m.score_1,
                m.id_equipe_2 AS team2_id,
                t2.nom AS team2_name,
                m.score_2,
                m.babyfoot_id,
                m.vitesse_max,
                m.create_at AS created_at,
                CASE 
                    WHEN m.score_1 > m.score_2 THEN m.id_equipe_1
                    WHEN m.score_2 > m.score_1 THEN m.id_equipe_2
                    ELSE NULL
                END AS winner_team_id
            FROM matches m
            JOIN team t1 ON m.id_equipe_1 = t1.id
            JOIN team t2 ON m.id_equipe_2 = t2.id
            ORDER BY m.create_at DESC
            LIMIT %s;
        """
        
        cursor.execute(query, (limit,))
        results = cursor.fetchall()
        
        if not results:
            raise HTTPException(status_code=404, detail="Aucun match trouvé")
        
        return [
            MatchDetail(
                match_id=row['match_id'],
                team1_id=row['team1_id'],
                team1_name=row['team1_name'],
                score_1=row['score_1'],
                team2_id=row['team2_id'],
                team2_name=row['team2_name'],
                score_2=row['score_2'],
                babyfoot_id=row['babyfoot_id'],
                vitesse_max=row['vitesse_max'],
                created_at=row['created_at'],
                winner_team_id=row['winner_team_id']
            )
            for row in results
        ]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query error: {str(e)}")
    finally:
        conn.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
