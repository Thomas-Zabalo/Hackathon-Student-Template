# Installation PostgreSQL avec Docker Compose sur Debian 13 (Proxmox)

Guide d'installation de PostgreSQL via Docker Compose sur une machine virtuelle Debian 13 dans Proxmox.

## Prérequis

- Machine virtuelle Debian 13 configurée dans Proxmox
- Accès root ou sudo
- Connexion internet active

## Installation de Docker et Docker Compose

### 1. Mise à jour du système

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Télécharger le script d'installation Docker

```bash
curl -fsSL https://get.docker.com/ -o get-docker.sh
```

### 3. Exécuter le script d'installation

```bash
sudo sh get-docker.sh
```

### 4. Activer le groupe docker pour l'utilisateur courant

```bash
newgrp docker
```

### 5. Vérification de l'installation

```bash
docker --version
docker compose version
```

## Installation de PostgreSQL avec Docker Compose

### 1. Créer le répertoire pour le projet

```bash
sudo mkdir -p /opt/postgresql-docker
cd /opt/postgresql-docker
```

![Emplacement](Infrastructure/assets/Procedure_deploiement/emplacement.png)
*Emplacement des fichiers de configuration*

### 2. Créer le fichier docker-compose.yml

```bash
sudo nano docker-compose.yml
```

Copiez le contenu suivant :

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    container_name: postgres_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin1234
      POSTGRES_DB: postgres
      PGDATA: /var/lib/postgresql/data/pgdata
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init:/docker-entrypoint-initdb.d  # Pour scripts d'initialisation
    networks:
      - postgres_network
  pgadmin:
    image: dpage/pgadmin4:9.4.0
    container_name: pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin1234
    ports:
      - "8080:80"
    depends_on:
      - postgres
    networks:
      - postgres_network
volumes:
  postgres_data:
networks:
  postgres_network:
    driver: bridge
```

**Important** : Modifiez les valeurs suivantes :
- `POSTGRES_USER` : nom d'utilisateur admin PostgreSQL
- `POSTGRES_PASSWORD` : mot de passe sécurisé PostgreSQL
- `POSTGRES_DB` : nom de la base de données par défaut (postgres)
- `PGADMIN_DEFAULT_EMAIL` : email de connexion pgAdmin
- `PGADMIN_DEFAULT_PASSWORD` : mot de passe pgAdmin

![Docker Compose](Infrastructure/assets/Procedure_deploiement/Docker_compose.png)
*Configuration du fichier docker-compose.yml*

### 3. Créer le répertoire pour les scripts d'initialisation (optionnel)

```bash
mkdir init
```

### 4. Démarrer PostgreSQL et pgAdmin

```bash
sudo docker compose up -d
```

### 4. Vérifier que le conteneur fonctionne

```bash
sudo docker compose ps
```

### 5. Voir les logs

```bash
sudo docker compose logs -f
```

Appuyez sur `Ctrl+C` pour quitter.

## Création des tables de la base de données

Après vous être connecté à pgAdmin, exécutez le script SQL suivant pour créer les tables :

```sql
CREATE TABLE team (
    id INTEGER PRIMARY KEY,
    nom VARCHAR
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR,
    surname VARCHAR,
    addresse VARCHAR,
    mdp VARCHAR,
    team_id INTEGER,
    is_admin BOOLEAN,
    created_at TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES team(id)
);

CREATE TABLE babyfoot (
    id INTEGER PRIMARY KEY,
    id_match INTEGER,
    is_used BOOLEAN,
    etat VARCHAR
);

CREATE TABLE matches (
    id INTEGER PRIMARY KEY,
    score_1 INTEGER,
    score_2 INTEGER,
    id_equipe_1 INTEGER,
    id_equipe_2 INTEGER,
    vitesse_max FLOAT,
    babyfoot_id INTEGER,
    create_at TIMESTAMP,
    FOREIGN KEY (id_equipe_1) REFERENCES team(id),
    FOREIGN KEY (id_equipe_2) REFERENCES team(id),
    FOREIGN KEY (babyfoot_id) REFERENCES babyfoot(id)
);

CREATE TABLE goal (
    id INTEGER PRIMARY KEY,
    id_equipe INTEGER,
    id_match INTEGER,
    vitesse FLOAT,
    FOREIGN KEY (id_equipe) REFERENCES team(id),
    FOREIGN KEY (id_match) REFERENCES matches(id)
);
```

**Note** : Les tables sont créées dans l'ordre pour respecter les dépendances des clés étrangères.

## Création d'un utilisateur pour les développeurs

Après avoir créé les tables, créez un utilisateur PostgreSQL dédié aux développeurs avec des permissions appropriées.

### 1. Se connecter à pgAdmin

- Ouvrez pgAdmin : `http://192.168.100.27:8080`
- Connectez-vous avec les identifiants admin
- Ouvrez le **Query Tool** sur la base `postgres`

### 2. Exécuter le script SQL

```sql
-- 1. Créer l'utilisateur développeur
CREATE USER dev_user WITH PASSWORD 'dev1234';

-- 2. Donner la permission de connexion
GRANT CONNECT ON DATABASE postgres TO dev_user;

-- 3. Donner accès au schéma public
GRANT USAGE ON SCHEMA public TO dev_user;

-- 4. Donner les permissions CRUD (Create, Read, Update, Delete)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO dev_user;

-- 5. Appliquer ces permissions aux futures tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO dev_user;

-- 6. Donner accès aux séquences (pour les IDs auto-incrémentés)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dev_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO dev_user;

-- 7. Permissions sur les fonctions si nécessaire
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO dev_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO dev_user;
```

### 3. Vérifier la création de l'utilisateur

```sql
\du dev_user
```

![Compte utilisateur](Infrastructure/assets/Procedure_deploiement/Compte_user.png)
*Gestion des comptes utilisateurs PostgreSQL*

### Informations de connexion pour les développeurs

**Chaîne de connexion PostgreSQL :**
```
postgresql://dev_user:dev1234@192.168.100.27:5432/postgres
```

**Détails de connexion :**
- **Host** : 192.168.100.27
- **Port** : 5432
- **Database** : postgres
- **Username** : dev_user
- **Password** : dev1234

### Permissions accordées

✅ **dev_user peut :**
- SELECT : Lire les données
- INSERT : Ajouter des données
- UPDATE : Modifier des données
- DELETE : Supprimer des données
- Utiliser les séquences et fonctions

❌ **dev_user ne peut pas :**
- DROP : Supprimer des tables/base
- CREATE TABLE : Créer des tables
- ALTER TABLE : Modifier la structure
- TRUNCATE : Vider des tables
- Gérer les utilisateurs et permissions

## Accès depuis l'hôte Proxmox ou réseau local

PostgreSQL est accessible sur le port 5432 à l'adresse : `192.168.100.27:5432`

## Informations

- **IP du serveur** : 192.168.100.27
- **Répertoire d'installation** : `/opt/postgresql-docker`
- **PostgreSQL Port** : 5432
- **pgAdmin Port** : 8080
- **pgAdmin URL** : http://192.168.100.27:8080
- **Image PostgreSQL** : postgres:16
- **Image pgAdmin** : dpage/pgadmin4:latest
- **Données persistantes** : Volume Docker `postgres_data`
- **Scripts d'initialisation** : Dossier `/opt/postgresql-docker/init`

---

