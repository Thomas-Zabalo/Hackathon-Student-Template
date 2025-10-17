# **📊 Supervision avec Prometheus, Node Exporter et Grafana**

## **🧱 Objectif**

Mettre en place une solution complète de **monitoring système** (CPU, RAM, stockage) à l’aide de :

- **Prometheus** → collecte et stockage des métriques
- **Node Exporter** → expose les métriques système Linux
- **Grafana** → visualisation (graphes, camemberts, dashboards)

---

## **⚙️ 1️⃣ Installation de Prometheus (Docker)**

### **📁 Structure des fichiers**

Crée un dossier :

```powershell
mkdir -p /opt/prometheus
cd /opt/prometheus
```

Fichiers nécessaires :

```powershell
/opt/prometheus
 ├── docker-compose.yml
 ├── prometheus.yml
 └── data/               # stockage de la base Prometheus
```

**🐳 docker-compose.yml**

```powershell
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

**⚙️ prometheus.yml**

```powershell
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
      - targets: ['192.168.100.27:9100']  # IP du serveur surveillé
```

**▶️ Démarrage**

```powershell
docker compose up -d
```

Accès à l’interface Prometheus :

👉 [http://192.168.100.32:9090](http://192.168.100.32:9090/)

## **🧩 2️⃣ Installation du Node Exporter (sur le serveur Debian)**

### **📦 Installation**

```powershell
sudo apt update
sudo apt install prometheus-node-exporter -y
```

**🚀 Vérification du service**

```powershell
sudo systemctl status prometheus-node-exporter
```

Il doit écouter sur le port **9100** :

```powershell
prometheus-node-exporter.service - Prometheus exporter for machine metrics
     Active: active (running)
     Listen: [::]:9100
```

### **📊 3️⃣ Installation de Grafana (Docker)**

```powershell
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

Démarre Grafana :

```powershell
docker compose up -d
```

Accès à l’interface :

👉 [http://192.168.100.32:3000](http://192.168.100.32:3000/)

****

### **🔗 4️⃣ Lier Grafana à Prometheus**

### **Étapes :**

1. Ouvre Grafana → **⚙️ Settings → Data sources**
2. Clique sur **Add data source**
3. Choisis **Prometheus**
4. Configure :

```powershell
URL : http://prometheus:9090
(ou http://192.168.100.32:9090)
```

1. Clique sur **Save & test** → ✅ “Data source is working”

## **5️⃣ Créer un Dashboard de supervision**

### **➕ Étapes de base**

1. Dans Grafana → **+ → Dashboard → Add a new panel**
2. Choisis ta source de données Prometheus

**📈 CPU Utilization (%)**

```powershell
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

- **Title** : CPU Utilization
- **Unit** : Percent (0–100)

**📈 Memory Usage (%)**

```powershell
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100
```

- **Title** : Memory Usage
- **Unit** : Percent (0–100)

**📈 Disk Usage (%)**

```powershell
(1 - (node_filesystem_free_bytes{fstype!~"tmpfs|overlay"} 
      / node_filesystem_size_bytes{fstype!~"tmpfs|overlay"})) * 100
```

- **Title** : Disk Usage
- **Unit** : Percent (0–100)

## **🍰 6️⃣ Graphique “Camembert” pour le stockage**

### **⚙️ Type de panel**

- Type → **Pie chart** (ou “Pie chart (beta)”)

### **🔹 Requête 1 : Espace utilisé (%)**

```powershell
(1 - (node_filesystem_free_bytes{mountpoint="/", fstype!~"tmpfs|overlay"} 
      / node_filesystem_size_bytes{mountpoint="/", fstype!~"tmpfs|overlay"})) * 100
```

- **Legend** : Espace utilisé (%)

### **🔹 Requête 2 : Espace libre (%)**

```powershell
(node_filesystem_free_bytes{mountpoint="/", fstype!~"tmpfs|overlay"} 
 / node_filesystem_size_bytes{mountpoint="/", fstype!~"tmpfs|overlay"}) * 100
```

- **Legend** : Espace libre (%)
