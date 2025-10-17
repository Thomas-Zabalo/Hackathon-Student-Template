# Guide d'Installation et Configuration HAProxy

---

## Aperçu

HAProxy est un équilibreur de charge TCP/HTTP haute performance **natif à pfSense**. Il distribue le trafic entrant sur plusieurs serveurs backend, fournissant des capacités d'équilibrage de charge et de basculement.

## Prérequis

- Pare-feu pfSense installé et accessible
- Serveurs backend opérationnels et accessibles depuis pfSense
- Connectivité réseau établie entre pfSense et les serveurs backend
- Accès administrateur à l'interface web de pfSense

---

## Installation

### Étape 1 : Accéder au gestionnaire de paquets

1. Se connecter à l'interface web de pfSense
2. Naviguer vers **System > Package Manager > Available Packages**

### Étape 2 : Installer le paquet HAProxy

1. Localiser `haproxy` dans la liste des paquets
2. Cliquer sur le bouton **+** pour installer
3. Attendre la fin de l'installation (généralement 1-2 minutes)
4. Vérifier l'installation sous **System > Package Manager > Installed Packages**

### Étape 3 : Accéder au module HAProxy

Une fois installé, HAProxy apparaîtra dans le menu Services :

- Naviguer vers **Services > HAProxy**
- Vérifier que **Settings > Enable HAProxy** est coché
- Cliquer sur **Save**

---

## Configuration du Backend

Les backends définissent les serveurs qui recevront le trafic de HAProxy.

### Configurer les serveurs backend

1. Aller dans **Services > HAProxy > Backend**
2. Cliquer sur **Add** pour créer un nouveau pool backend

### Remplir les détails du backend

| Champ | Valeur | Remarques |
|-------|--------|-----------|
| **Name** | `webservers_backend` | Identifiant descriptif |
| **Balance Algorithm** | `Roundrobin` | Distribue la charge équitablement |
| **Sticky Table** | `Disabled` | Ou activer pour la persistance de session |

### Ajouter les serveurs

Pour chaque serveur backend, cliquer sur **Add** dans la section Servers :

| Champ | Exemple | Objectif |
|-------|---------|----------|
| **Name** | `web1` | Identifiant du serveur |
| **Address** | `192.168.100.36` | Adresse IP interne |
| **Port** | `80` | Port du service |
| **Weight** | `1` | Poids pour la distribution |

Répéter pour les serveurs supplémentaires (ex : web2, web3).

### Configurer les contrôles de santé

1. **Check Method :** Sélectionner `HTTP`
2. **HTTP Check Method :** Sélectionner `GET`
3. **URL :** Laisser vide (par défaut `/`)

### Sauvegarder la configuration du backend

Cliquer sur **Save** pour appliquer les modifications.

---

## Configuration du Frontend

Les frontends définissent les points d'entrée du trafic entrant.

### Créer un frontend

1. Aller dans **Services > HAProxy > Frontend**
2. Cliquer sur **Add** pour créer un nouveau frontend

### Configurer les paramètres du frontend

| Champ | Valeur | Objectif |
|-------|--------|----------|
| **Name** | `http_frontend` | Identifiant descriptif |
| **Status** | Activé ✓ | Active le frontend |
| **Type** | `HTTP` | Type de protocole |
| **External Address** | `0.0.0.0:80` | Écoute sur toutes les interfaces, port 80 |
| **Default Backend** | `webservers_backend` | Route vers le pool backend |
| **Timeout Client** | `30000` | Délai d'expiration de la connexion client (ms) |

### Options supplémentaires

- **Description :** Ajouter un contexte sur l'objectif du frontend
- **Client Timeout :** Ajuster si les clients se déconnectent inopinément

### Sauvegarder la configuration du frontend

Cliquer sur **Save** pour appliquer les modifications.

---

## Gestion du Service

### Démarrer le service HAProxy

1. Naviguer vers **Services > HAProxy > Control**
2. Cliquer sur le bouton **Start**
3. Vérifier que le statut affiche **running** (indicateur vert)

### Redémarrer le service

Après les changements de configuration, redémarrer HAProxy :

1. Aller dans **Services > HAProxy > Control**
2. Cliquer sur **Restart**
3. Attendre 5-10 secondes pour la stabilisation du service

### Arrêter le service

Cliquer sur **Stop** pour désactiver HAProxy. À utiliser lors de la maintenance.

---

## Vérification et Tests

### Vérifier l'état du service

1. Naviguer vers **Services > HAProxy > Stats**
2. Vérifier que tous les backends affichent le statut **UP** (vert)
3. Surveiller les connexions actives et le trafic

### Tester l'équilibreur de charge

Depuis un client sur le réseau :

```bash
curl http://[IP_PFSENSE]:80/
```

Résultat attendu : Réponse d'un des serveurs backend, indiquant un équilibrage de charge réussi.

### Vérifier les contrôles de santé

Dans la page Stats :
- Vérifier les **Cum. sessions** pour confirmer que les requêtes sont traitées
- Vérifier que le compte **Errors** est zéro ou minimal
- Surveiller les **Bytes In/Out** pour le flux de trafic

---

## Ressources supplémentaires

- Documentation officielle HAProxy : https://www.haproxy.org/
- Module HAProxy de pfSense : https://docs.netgate.com/pfsense/en/latest/packages/haproxy.html
