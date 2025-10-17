# Tests de Charge

## Vue d'ensemble

Les tests de charge permettent de simuler un trafic concurrent sur l'infrastructure web pour évaluer sa robustesse et ses performances. Cette documentation décrit comment configurer et exécuter ces tests.

## Installation

### Apache Bench

Apache Bench est l'outil le plus simple et rapide pour les tests de charge. Il est inclus dans le package apache2-utils.

```bash
apt update
apt install apache2-utils -y
```

Vérification de l'installation :

```bash
ab -V
```

## Utilisation

### Syntaxe générale

```bash
ab [options] [http://]hostname[:port]/path
```

### Options principales

- `-n` : Nombre total de requêtes à générer
- `-c` : Nombre de requêtes concurrentes
- `-t` : Timeout en secondes (délai d'attente par défaut : 30s)

### Sauvegarde des résultat

Pour exporter les résultats dans un fichier texte :

```bash
ab -n 1000 -c 50 http://192.168.100.32/ > resultats_test.txt
```

## Scénarios de test

### Test 1 : Charge faible

Simule une utilisation normale avec peu d'utilisateurs simultanés.

```bash
ab -n 100 -c 10 http://192.168.100.32/
```

Paramètres :
- 100 requêtes totales
- 10 requêtes concurrentes

### Test 2 : Charge moyenne

Simule une utilisation modérée.

```bash
ab -n 1000 -c 50 http://192.168.100.32/
```

Paramètres :
- 1000 requêtes totales
- 50 requêtes concurrentes

### Test 3 : Haute charge

Simule un pic de trafic important.

```bash
ab -n 5000 -c 200 http://192.168.100.32/
```

Paramètres :
- 5000 requêtes totales
- 200 requêtes concurrentes

## Comment ça fonctionne

### Métriques

**Requests per second** : Nombre de requêtes traitées par seconde. Plus c'est élevé, mieux c'est.

**Time per request (mean)** : Temps moyen pour traiter une requête.

**Failed requests** : Nombre de requêtes en erreur. Doit être 0 ou très proche de 0.

**Transfer rate** : Quantité de données transférées par seconde.

**Percentage of requests served within a certain time** : Distribution des temps de réponse. Les valeurs p95 et p99 montrent les pires cas.

### Exemple de résultats

#### Test de charge faible (100 requêtes, 10 concurrent)

```
Server Software:        nginx/1.29.2
Server Hostname:        192.168.100.36
Server Port:            80
Document Path:          /
Concurrency Level:      10
Time taken for tests:   0.014 seconds
Complete requests:      100
Failed requests:        0
Requests per second:    7311.01 [#/sec]
Time per request:       1.368 [ms] (mean)
Transfer rate:          7625.16 [Kbytes/sec]

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:     0    1   1.7      0       5
Waiting:        0    1   1.1      0       5
Total:          0    1   1.7      1       6

Percentage of the requests served within a certain time (ms)
  50%      1
  66%      1
  75%      1
  80%      2
  90%      5
  95%      5
  98%      5
  99%      6
 100%      6
```

**Analyse** : Excellentes performances. Zéro erreurs, temps de réponse très bas (1-2ms), 7300 requêtes par seconde.

#### Test de charge élevée (5000 requêtes, 200 concurrent)

```
Server Software:        nginx/1.29.2
Server Hostname:        192.168.100.36
Server Port:            80
Concurrency Level:      200
Time taken for tests:   0.451 seconds
Complete requests:      5000
Failed requests:        0
Requests per second:    11095.01 [#/sec]
Time per request:       18.026 [ms] (mean)
Transfer rate:          11571.75 [Kbytes/sec]

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.1      0       8
Processing:     3   17   6.9     16     103
Waiting:        0   16   5.8     15     103
Total:          5   18   6.8     16     103

Percentage of the requests served within a certain time (ms)
  50%     16
  66%     17
  75%     18
  80%     18
  90%     20
  95%     25
  98%     36
  99%     51
 100%    103
```

**Analyse** : Très bonne scalabilité. Même avec 200 connexions simultanées, zéro erreurs et augmentation du throughput (11095 req/s vs 7311). Le temps de réponse moyen de 18ms est acceptable. Le pire cas (103ms) correspond aux requêtes en fin de queue, ce qui est normal.

## Résumé des résultats du projet

| Métrique | Charge faible | Charge élevée |
|----------|---------------|---------------|
| Requêtes totales | 100 | 5000 |
| Concurrence | 10 | 200 |
| Req/sec | 7311 | 11095 |
| Temps moyen | 1.37ms | 18.03ms |
| Requêtes en erreur | 0 | 0 |
| Temps max | 6ms | 103ms |

---

## Annexes

### Référence Apache Bench

**Apache Bench** (ab) est un utilitaire fourni avec le serveur HTTP Apache. Il est conçu pour mesurer les performances des serveurs HTTP.

**Ressources officielles** :
- Documentation Apache Bench : https://httpd.apache.org/docs/current/programs/ab.html
- Package apache2-utils : https://packages.ubuntu.com/search?keywords=apache2-utils
