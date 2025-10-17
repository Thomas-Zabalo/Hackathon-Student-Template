# Guide d’Installation et Configuration de Prometheus, Node Exporter et Grafana

---

## Aperçu

Ce guide décrit la mise en place d’une **solution complète de supervision système** à l’aide de trois outils open source :

- **Prometheus** → collecte et stocke les métriques  
- **Node Exporter** → expose les métriques système Linux  
- **Grafana** → visualise les données sous forme de tableaux de bord et graphiques interactifs  

Cette architecture permet de **surveiller la santé d’un ou plusieurs serveurs** : CPU, RAM, disque, etc.

---

## Prérequis

- Serveur Linux (ici Debian 13) accessible via SSH  
- Docker et Docker Compose installés (pour Prometheus et Grafana)  
- Accès administrateur ou utilisateur avec privilèges `sudo`  
- Connectivité réseau entre les serveurs supervisés et le serveur Prometheus  

---

## Installation

### Étape 1 : Préparer la structure des fichiers Prometheus

1. Créer le répertoire de travail :

```bash
mkdir -p /opt/prometheus
cd /opt/prometheus
```

2. Créer la structure suivante :

```
/opt/prometheus
 ├── docker-compose.yml
 ├── prometheus.yml
 └── data/              
```

---

### Étape 2 : Déployer Prometheus

#### 1. Fichier docker-compose.yml

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:v2.54.1
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./data:/prometheus
    restart: unless-stopped
```

#### 2. Fichier prometheus.yml

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    monitor: 'home-lab'

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter-bdd'
    scrape_interval: 10s
    static_configs:
      - targets: ['192.168.100.27:9100']  # IP du serveur supervisé
```

#### 3. Lancer Prometheus

```bash
docker compose up -d
```

#### 4. Vérifier l’accès à l’interface web

Ouvrir dans un navigateur :  
**http://192.168.100.32:9090**

---

## Configuration de Node Exporter

**Node Exporter** expose les métriques système d’un serveur Linux sur le port **9100**.  
Prometheus interrogera ce service pour collecter les données.

### Étape 1 : Installation du Node Exporter

Sur le serveur à superviser :

```bash
sudo apt update
sudo apt install prometheus-node-exporter -y
```

### Étape 2 : Vérification du service

Vérifier que le service est actif :

```bash
sudo systemctl status prometheus-node-exporter
```

Sortie attendue :

```
prometheus-node-exporter.service - Prometheus exporter for machine metrics
     Active: active (running)
     Listen: [::]:9100
```

Si le port **9100** est ouvert, Prometheus pourra collecter les métriques.

---

## Configuration de Grafana

Grafana permet de visualiser les métriques collectées sous forme de **dashboards**.

### Étape 1 : Déploiement via Docker

Créer un fichier `docker-compose.yml` :

```yaml
version: '3.8'

services:
  grafana:
    image: grafana/grafana:10.4.2
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
    restart: unless-stopped
```

Démarrer le service :

```bash
docker compose up -d
```

Accéder à Grafana :  
**http://192.168.100.32:3000**  
Identifiants par défaut :  
- **Username :** admin  
- **Password :** admin

---

## Configuration de la Source de Données (Prometheus)

### Étapes :

1. Dans Grafana → aller dans **Settings > Data Sources**  
2. Cliquer sur **Add data source**  
3. Choisir **Prometheus**  
4. Configurer l’URL de l'installation :

```
URL : http://192.168.100.32:9090
```

5. Cliquer sur **Save & test**  
Message de validation : *“Data source is working”*

HF avec les dashboards :)
