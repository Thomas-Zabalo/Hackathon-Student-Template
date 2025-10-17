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
docker exec -i postgres_db psql -U admin -d labytech < /tmp/restore.sql
```

Ou directement sans fichier temporaire:
```bash
gunzip -c /backups/postgres_dump_20251016_134801.sql.gz | docker exec -i postgres_db psql -U admin -d labytech
```

### Restaurer depuis un backup sur le serveur de backup

Si le serveur BDD est mort, vous pouvez restaurer sur un autre serveur:

```bash
gunzip -c /backups/postgres_dump_20251016_134801.sql.gz | psql -U admin -d labytech -h localhost
```

(Nécessite PostgreSQL client installé et une BDD PostgreSQL disponible)

