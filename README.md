# Pokédex de Theo

##  Présentation Vidéo

**Voici ma vidéo YouTube pour la présentation de mon site en musique :D**

-> [Voir la vidéo](https://youtu.be/3O3obRPqAds)

---

##  Description

Application web interactive de Pokédex développée avec React, permettant de consulter, rechercher, filtrer et gérer une collection de Pokémon. L'interface s'inspire des cartes Pokémon TCG Base Set originales avec un design moderne et des effets glassmorphism.

---

##  Fonctionnalités

###  Page d'Accueil

- **Affichage des Pokémon** : Grille responsive de cartes Pokémon (4 par ligne sur desktop)
- **Cartes réalistes** : Design inspiré des cartes Pokémon TCG Base Set avec :
  - Bordure dorée permanente
  - Couleurs par type (18 types différents)
  - Informations complètes (HP, stage d'évolution, attaques, faiblesse, résistance)
  - Effet 3D au survol avec rotation
  - Dimensions authentiques (ratio 5:7)

###  Recherche et Filtrage

- **Barre de recherche** : Recherche de Pokémon par nom (français)
- **Filtre par type** : Filtrage client-side par type de Pokémon
- **Pagination** : Navigation entre les pages (20 Pokémon par page)
- **Compteur de résultats** : Affichage du nombre de Pokémon trouvés

###  Team Builder (Gestion d'Équipe)

- **Ajout à l'équipe** : Bouton sur chaque carte pour ajouter un Pokémon
- **Limite de 6 Pokémon** : Respect de la règle des jeux Pokémon
- **Barre persistante** : Affichage permanent en bas de l'écran avec :
  - 6 slots visuels
  - Miniatures des Pokémon
  - Bouton de retrait par Pokémon
  - Bouton pour vider toute l'équipe
  - Compteur (ex: "Mon Équipe (3/6)")
- **Notifications** : Feedback visuel lors de l'ajout (succès/erreur)
- **Persistance** : Sauvegarde automatique dans LocalStorage
- **Protection contre les doublons** : Impossible d'ajouter deux fois le même Pokémon

###  Page Détails

- **Fiche complète** : Affichage détaillé d'un Pokémon individuel
- **Navigation** : Retour à la liste facilité

###  Création de Pokémon

- **Formulaire complet** : Création de nouveaux Pokémon personnalisés
- **Upload d'image** : Possibilité d'ajouter une image
- **Validation** : Vérification des données saisies

###  Interface Moderne

- **Design glassmorphism** : Effets de flou et transparence
- **Background personnalisé** : Image de fond immersive
- **Animations fluides** : Transitions et effets visuels
- **Responsive design** : Adaptation mobile, tablette et desktop
- **Thème sombre** : Interface optimisée pour une expérience agréable

---

##  Technologies Utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **React Router DOM** - Gestion de la navigation
- **Context API** - Gestion d'état globale (Team Builder)
- **CSS3** - Styling avec glassmorphism et animations
- **Vite** - Build tool et dev server

### Backend (requis)
- **Node.js** - Runtime JavaScript
- **Express** - Framework backend
- **API REST** - Communication avec le frontend

---

##  Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**
- **Git**

---

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/tp-partie-front-Theo-Dominguez.git
cd tp-partie-front-Theo-Dominguez
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer le backend

 **Important** : Ce projet nécessite un backend fonctionnel.

Assurez-vous que le backend est lancé sur `http://localhost:3000` avec les endpoints suivants :

- `GET /api/pokemons?page={page}` - Liste paginée des Pokémon
- `GET /api/pokemons/search/:name` - Recherche par nom
- `GET /api/pokemons/:id` - Détails d'un Pokémon
- `POST /api/pokemons` - Création d'un Pokémon
- `PUT /api/pokemons/:id` - Modification d'un Pokémon
- `DELETE /api/pokemons/:id` - Suppression d'un Pokémon

Le backend doit également servir les images des Pokémon via `/assets/pokemons/`

```bash
git clone https://github.com/votre-username/tp-partie-back-Theo-Dominguez.git
cd tp-partie-back-Theo-Dominguez
```
---

##  Lancement de l'Application

### Mode Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de Production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

### Prévisualisation du Build

```bash
npm run preview
```

---

##  Structure du Projet

```
tp-partie-front-Theo-Dominguez/
├── public/                  # Fichiers statiques
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── DeleteModal.jsx
│   │   ├── Loader.jsx
│   │   ├── Pagination.jsx
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonForm.jsx
│   │   ├── PokemonList.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TeamBar.jsx      # Barre d'équipe persistante
│   │   ├── TypeFilter.jsx
│   │   └── *.css            # Styles des composants
│   ├── contexts/           # Gestion d'état globale
│   │   └── TeamContext.jsx  # Context pour le Team Builder
│   ├── pages/              # Pages de l'application
│   │   ├── Home.jsx
│   │   ├── PokemonDetail.jsx
│   │   ├── CreatePokemon.jsx
│   │   └── *.css
│   ├── services/           # Services API
│   │   └── pokemonService.js
│   ├── styles/             # Styles globaux
│   │   ├── PokemonCard.css
│   │   ├── PokemonList.css
│   │   └── types.css
│   ├── App.jsx             # Composant racine
│   ├── App.css
│   ├── main.jsx            # Point d'entrée
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

---

##  Fonctionnalités Avancées

### Gestion d'État avec Context API

Le **Team Builder** utilise l'API Context de React pour gérer l'état global de l'équipe :

- **TeamContext.jsx** : Fournit les fonctions `addToTeam`, `removeFromTeam`, `clearTeam`, `isInTeam`
- **TeamProvider** : Wrapper qui rend le contexte disponible dans toute l'application
- **LocalStorage** : Persistance automatique de l'équipe

### Persistance des Données

- L'équipe de Pokémon est sauvegardée dans le **LocalStorage** du navigateur
- Les données persistent même après fermeture du navigateur
- Chargement automatique au démarrage de l'application

### Design Responsive

Breakpoints adaptés pour différentes tailles d'écran :

- **Desktop** : 4 cartes par ligne (> 1400px)
- **Tablette large** : 3 cartes par ligne (1024px - 1400px)
- **Tablette** : 2 cartes par ligne (600px - 1024px)
- **Mobile** : 1 carte par ligne (< 600px)

---

##  Personnalisation

### Couleurs par Type

Chaque type de Pokémon possède sa propre palette de couleurs :

- **Fire** : #F08030
- **Water** : #6890F0
- **Grass** : #78C850
- **Electric** : #F8D030
- **Psychic** : #F080FF
- Et 13 autres types...

### Background

L'image de fond est servie par le backend : `http://localhost:3000/assets/pokemons/fond.jpg`

Pour changer le fond, remplacez ce fichier dans le backend.

---

##  Dépannage

### Le site ne charge pas les Pokémon

- Vérifiez que le backend est bien lancé sur `http://localhost:3000`
- Vérifiez la console du navigateur pour les erreurs CORS
- Assurez-vous que la base de données contient des Pokémon

### Les images ne s'affichent pas

- Vérifiez que le dossier `/assets/pokemons/` existe dans le backend
- Vérifiez que les images ont les bons noms (correspondant aux IDs)

### L'équipe ne se sauvegarde pas

- Vérifiez que le LocalStorage n'est pas désactivé dans votre navigateur
- Essayez de vider le cache du navigateur

---

##  Auteur

**Theo Dominguez**

---


**Bon jeu sur le Pokédex de Theo !**
