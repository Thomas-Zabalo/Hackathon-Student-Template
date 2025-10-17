#!/bin/bash

BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/postgres_dump_$TIMESTAMP.sql.gz"

docker exec postgres_db pg_dump -U admin -d postgres | gzip > $BACKUP_FILE

find $BACKUP_DIR -name "postgres_dump_*.sql.gz" -mtime +7 -delete

echo "Backup créé: $BACKUP_FILE"