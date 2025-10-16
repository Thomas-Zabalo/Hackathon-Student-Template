# Documentation Backup PostgreSQL avec pg_dump + rsync

## Vue d'ensemble

Cette documentation décrit la mise en place d'une stratégie de sauvegarde automatisée pour une base de données PostgreSQL deployée en Docker. Les backups sont effectués via `pg_dump` et synchronisés sur un serveur de backup via `rsync`.

### Architecture

- **Serveur BDD**: 192.168.100.27
    - PostgreSQL en Docker Compose
    - Utilisateur BDD: `admin`
    - Base de données: `labytech`
    - Container: `postgres_db`

- **Serveur Backup**: 192.168.100.31
    - Réceptacle des backups via rsync
    - Dossier de stockage: `/backups`

### Stratégie

1. Dump SQL complet de la BDD chaque jour (ou tous les 6h) via `pg_dump`
2. Compression en gzip
3. Synchronisation vers le serveur de backup via `rsync`
4. Rétention des 7 derniers backups
5. Exécution automatique via cron

---

## Prérequis

### Sur le serveur BDD (192.168.100.27)

- Docker et Docker Compose
- PostgreSQL
- Accès root ou sudo
- `rsync` installé

### Sur le serveur Backup (192.168.100.31)

- Accès SSH root
- `rsync` installé
- Espace disque suffisant pour les backups

---

## Installation

### Étape 1: Installation de rsync

**Sur les deux serveurs**, installer rsync:

```bash
apt update
apt install rsync
```

Vérifier l'installation:
```bash
rsync --version
```

### Étape 2: Préparation du dossier de backup

**Sur le serveur BDD:**

```bash
mkdir -p /backups
chmod 755 /backups
```

**Sur le serveur Backup:**

```bash
mkdir -p /backups
chmod 755 /backups
```

### Étape 3: Création du script de backup

**Sur le serveur BDD**, créer le script:

```bash
nano /usr/local/bin/backup-postgres.sh
```

Coller le contenu suivant:

```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/postgres_dump_$TIMESTAMP.sql.gz"

# Important: Adapter les paramètres à ton environnement
# - Le nom du container: postgres_db
# - L'utilisateur PostgreSQL: admin
# - La base de données: labytech

# Dump de la BDD depuis le container Docker
docker exec postgres_db pg_dump -U admin -d labytech | gzip > $BACKUP_FILE

# Mettre la fin here
```

Rendre le script exécutable:

```bash
chmod +x /usr/local/bin/backup-postgres.sh
```

**Important:** Vérifier les paramètres du script:
- Container: `postgres_db` (voir `docker ps`)
- Utilisateur: `admin` (voir `docker-compose.yml`)
- Base de données: `labytech` (voir `docker-compose.yml`)

### Étape 4: Configuration SSH sans mot de passe

**Sur le serveur BDD**, générer une clé SSH (si elle n'existe pas):

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N ""
```

Copier la clé vers le serveur de backup:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub root@192.168.100.31
```

Il faudra entrer le mot de passe root du serveur de backup.

Tester la connexion SSH (ne doit pas demander de mot de passe):

```bash
ssh root@192.168.100.31 "ls /backups"
```

### Étape 5: Configuration du cron

**Sur le serveur BDD**, éditer le crontab:

```bash
crontab -e
```

Ajouter l'une de ces lignes:

**Option 1: Backup quotidien à 2h du matin**
```
0 2 * * * /usr/local/bin/backup-postgres.sh && rsync -avz /backups/ root@192.168.100.31:/backups/
```

**Option 2: Backup tous les 6 heures**
```
0 */6 * * * /usr/local/bin/backup-postgres.sh && rsync -avz /backups/ root@192.168.100.31:/backups/
```

**Option 3: Backup toutes les heures**
```
0 * * * * /usr/local/bin/backup-postgres.sh && rsync -avz /backups/ root@192.168.100.31:/backups/
```

Sauvegarder et quitter.

Vérifier que le cron est bien enregistré:

```bash
crontab -l
```

---

## Tests et Vérification

### Test manuel du backup

**Sur le serveur BDD:**

```bash
/usr/local/bin/backup-postgres.sh
```

Vérifier la création du fichier:

```bash
ls -lah /backups/
```

Vous devriez voir un fichier `postgres_dump_YYYYMMDD_HHMMSS.sql.gz`.

### Test manuel de rsync

**Sur le serveur BDD:**

```bash
rsync -avz /backups/ root@192.168.100.31:/backups/
```

### Vérification sur le serveur de backup

**Sur le serveur Backup:**

```bash
ls -la /backups/
du -sh /backups/
```

Vous devriez voir les fichiers de backup synchronisés.

### Vérifier l'intégrité d'un backup

**Sur le serveur Backup**, vérifier la structure du dump:

```bash
gunzip -c /backups/postgres_dump_DERNIERDATE.sql.gz | head -50
```

Vous devriez voir du SQL (CREATE TABLE, CREATE INDEX, etc.).

### Consulter les logs du cron

**Sur le serveur BDD:**

```bash
grep CRON /var/log/syslog | tail -20
```

---

## Dépannage

### Erreur: "pg_dump: error: connection to server on socket failed"

**Cause:** Vous tentez d'exécuter `pg_dump` directement sur le host, alors que PostgreSQL est dans Docker.

**Solution:** Utiliser `docker exec postgres_db pg_dump ...` dans le script (déjà appliqué).

### Erreur: "rsync: command not found" côté backup

**Cause:** rsync n'est pas installé sur le serveur de backup.

**Solution:** Sur le serveur backup, exécuter:
```bash
apt install rsync
```

### SSH demande un mot de passe

**Cause:** La clé SSH n'a pas été copiée correctement.

**Solution:** Re-exécuter:
```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub root@192.168.100.31
```

### Le cron ne s'exécute pas

**Cause:** Le service cron n'est pas actif, ou le script a des erreurs.

**Solution:**
- Vérifier que cron est actif: `systemctl status cron`
- Tester le script manuellement: `/usr/local/bin/backup-postgres.sh`
- Vérifier les logs: `grep CRON /var/log/syslog`

### Erreur: "mkdir -p /backups: No such file or directory"

**Cause:** Le dossier parent n'existe pas (très rare).

**Solution:** Créer manuellement:
```bash
mkdir -p /backups
```

---

## Restauration d'urgence

### Restaurer depuis un backup sur le serveur BDD

**Sur le serveur BDD:**

1. Lister les backups disponibles:
```bash
ls -la /backups/
```

2. Décompresser le backup:
```bash
gunzip -c /backups/postgres_dump_20251016_134801.sql.gz > /tmp/restore.sql
```

3. Restaurer la BDD (attention: cela écrase la BDD existante):
```bash
docker exec -i postgres_db psql -U admin -d mabase < /tmp/restore.sql
```

Ou directement sans fichier temporaire:
```bash
gunzip -c /backups/postgres_dump_20251016_134801.sql.gz | docker exec -i postgres_db psql -U admin -d mabase
```

### Restaurer depuis un backup sur le serveur de backup

Si le serveur BDD est mort, vous pouvez restaurer sur un autre serveur:

```bash
gunzip -c /backups/postgres_dump_20251016_134801.sql.gz | psql -U admin -d mabase -h localhost
```

(Nécessite PostgreSQL client installé et une BDD PostgreSQL disponible)

---

## Maintenance

### Monitorer l'espace disque

**Sur le serveur Backup:**

```bash
df -h /backups
du -sh /backups/
```

### Vérifier la dernière exécution du cron

**Sur le serveur BDD:**

```bash
grep "Backup créé" /var/log/syslog | tail -5
```

### Nettoyer les anciens backups manuellement

**Sur le serveur BDD:**

```bash
find /backups -name "postgres_dump_*.sql.gz" -mtime +7 -delete
```

(Les backups > 7 jours seront supprimés)

---

## Résumé des commandes essentielles

```bash
# Test du backup
/usr/local/bin/backup-postgres.sh

# Vérification des backups
ls -la /backups/

# Synchronisation manuelle
rsync -avz /backups/ root@192.168.100.31:/backups/

# Vérifier le cron
crontab -l

# Restauration rapide
gunzip -c /backups/postgres_dump_YYYYMMDD_HHMMSS.sql.gz | docker exec -i postgres_db psql -U admin -d labytech

# Consulter les logs
grep CRON /var/log/syslog | tail -10
```

---

## Références

- Documentation PostgreSQL: https://www.postgresql.org/docs/16/app-pgdump.html
- Documentation rsync: https://linux.die.net/man/1/rsync
- Documentation Docker: https://docs.docker.com/