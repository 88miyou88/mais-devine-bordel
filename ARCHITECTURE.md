# Architecture V0.5.0

La version 0.5 sépare les responsabilités afin d’éviter un unique fichier JavaScript impossible à maintenir.

## JavaScript

- `js-config.js` : constantes, modes, icônes et libellés.
- `js-dom.js` : références aux éléments HTML.
- `js-state.js` : état central de l’application.
- `js-utils.js` : fonctions utilitaires et validation des bibliothèques.
- `js-storage.js` : chargement, normalisation et sauvegarde locale.
- `js-home.js` : accueil et configuration des modes.
- `js-manager.js` : gestion des cartes et des boîtes.
- `js-library-sync.js` : mises à jour, sauvegardes et restauration.
- `js-drawing.js` : mode Dessin, canevas et outils.
- `js-game.js` : moteur de manche, chrono, swipes et résultats.
- `js-diagnostics.js` : diagnostic et service worker.
- `js-main.js` : branchement des événements et démarrage.

## CSS

- `css-base.css` : variables, structure et composants communs.
- `css-manager.css` : gestion des cartes.
- `css-game.css` : partie classique et résultats.
- `css-dialogs.css` : fenêtres et réglages des modes.
- `css-drawing.css` : écrans de dessin.
- `css-home.css` : accueil, responsive et ajustements tactiles.

Les anciens `app.js` et `styles.css` ne sont plus chargés par `index.html` et peuvent être supprimés du dépôt après vérification.
