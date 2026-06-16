# Mais devine, bordel !

**Mais devine, bordel !** est une application web de jeu d’ambiance personnalisable, pensée pour être utilisée sur téléphone en mode paysage.

Les joueurs peuvent mélanger plusieurs modes, choisir leurs catégories et leurs difficultés, modifier les cartes, ajouter leurs propres contenus et installer l’application comme une PWA.

**Version actuelle : 0.4.1**  
**Nom du raccourci : MDB!**  
**Application :** https://88miyou88.github.io/mais-devine-bordel/

---

## Contenu actuel

L’application contient quatre modes et **1 318 cartes officielles** :

| Mode | Cartes | Couleur |
|---|---:|---|
| Deviner les paroles | 143 | Violet |
| Mimer | 395 | Orange |
| Sans le dire ! | 360 | Rose |
| Dessine-moi ça ! | 420 | Turquoise |

Les cartes sont réparties en catégories et en trois niveaux : **Facile**, **Moyen** et **Difficile**.

---

# Comment jouer

## Modes classiques sur le front

Les modes **Deviner les paroles**, **Mimer** et **Sans le dire !** peuvent être utilisés seuls ou mélangés dans la même manche.

1. Choisir une durée : 30, 60, 90 secondes ou une durée personnalisée.
2. Activer un ou plusieurs modes.
3. Toucher une tuile pour choisir les difficultés et les catégories.
4. Lancer la partie.
5. Placer le téléphone horizontalement sur le front, écran tourné vers les autres joueurs.
6. Faire glisser la carte :
   - vers la **droite** si la réponse est validée ;
   - vers la **gauche** pour passer.

Un simple toucher ne change pas la carte.

### Commandes pendant la manche

- **Retour** : annule le dernier swipe et corrige le score.
- **Pause** : suspend le chronomètre.
- **Retourner** : pivote l’affichage à 180°.
- **Terminer** : arrête immédiatement la manche.
- Le fond de la carte devient vert ou rouge pendant le swipe.
- Des guides latéraux indiquent le sens de validation et de passage.
- Les vibrations permettent au joueur qui tient le téléphone de sentir le résultat :
  - petites impulsions pour une carte validée ;
  - vibration longue pour une carte passée.

À la fin, l’application affiche le total des cartes validées, passées et jouées, ainsi que le détail de la manche.

---

# Les quatre modes

## 1. Deviner les paroles

Les joueurs qui voient l’écran chantent le début des paroles affichées en blanc, sur le bon air.

La personne qui tient le téléphone doit retrouver immédiatement la suite affichée en vert.

### Règles

- Il faut chanter, pas simplement lire les paroles.
- Aucun indice parlé supplémentaire n’est autorisé.
- Le titre et l’artiste ou la source sont affichés en bas de la carte pour les joueurs qui voient l’écran.

### Catégories incluses

Disney, comptines et chansons traditionnelles, comédies musicales, variété française, tubes rétro et de soirée, pop et rap français, rock français, anglais et autres cartes personnelles.

---

## 2. Mimer

Les joueurs qui voient l’écran doivent faire deviner la consigne uniquement par des gestes à la personne qui tient le téléphone.

### Règles

- Il est interdit de parler.
- Il est interdit d’épeler, de former des lettres ou de donner la réponse avec les lèvres.
- Les bruitages peuvent être autorisés ou interdits selon les règles décidées par le groupe.

### Exemples de catégories

Animaux, métiers, sports et loisirs, actions du quotidien, émotions, personnages connus, objets, situations absurdes, expressions, fêtes, technologie, voyages, cuisine et catastrophes gênantes.

---

## 3. Sans le dire !

Les joueurs doivent faire deviner le mot ou l’expression affichée à la personne qui tient le téléphone.

### Règles

- Il est interdit de prononcer la réponse.
- Il est interdit d’utiliser un mot de la même famille.
- Lorsque l’option est activée, cinq mots interdits apparaissent en rouge et ne doivent pas être prononcés.

Dans les réglages du mode, l’option **Afficher les mots interdits** permet de choisir entre :

- une version de type Taboo avec mots interdits ;
- une version plus libre où seul le mot principal est affiché.

### Exemples de catégories

Animaux, métiers, objets du quotidien, nourriture, lieux et transports, santé et sport, situations quotidiennes, émotions, technologie, culture populaire, nature et expressions françaises.

---

## 4. Dessine-moi ça !

Le dessinateur lit une consigne puis doit la faire deviner en dessinant sur le téléphone ou sur une feuille.

**Dans la version 0.4.1, ce mode se joue seul.** Il ne peut pas encore être mélangé avec les trois autres modes.

### Configuration

Le joueur peut choisir :

- 3, 5, 7 ou 10 dessins ;
- les catégories ;
- les difficultés ;
- la durée accordée à chaque difficulté ;
- l’activation ou non du son à la fin du temps.

Réglages par défaut :

| Difficulté | Temps | Points |
|---|---:|---:|
| Facile | 30 secondes | 1 point |
| Moyen | 45 secondes | 2 points |
| Difficile | 60 secondes | 3 points |

Les difficultés sélectionnées sont réparties aussi équitablement que possible dans la série de dessins.

### Déroulement

1. La consigne apparaît sans déclencher le chrono.
2. Le joueur choisit :
   - **Je gribouille ici** pour dessiner sur le téléphone ;
   - **Je massacre une feuille** pour dessiner sur papier ;
   - **Passer ce dessin** pour consommer la tentative sans marquer de point.
3. Le chrono démarre seulement après le choix du support.
4. Le joueur appuie sur **Trouvé !** ou **Passer**.
5. Si le chrono arrive à zéro, la carte est automatiquement comptée comme passée.

Il est interdit d’écrire des lettres, des mots ou des chiffres donnant directement la réponse.

### Dessin sur le téléphone

Le canevas comprend :

- six couleurs simples ;
- un curseur vertical pour régler l’épaisseur du trait ;
- un bouton unique qui alterne entre crayon et gomme ;
- une flèche courbe pour annuler la dernière action ;
- une poubelle rouge pour tout effacer ;
- la possibilité d’annuler un effacement total accidentel ;
- le chrono dans le coin supérieur droit ;
- la progression et le score dans le coin supérieur gauche.

Il n’y a volontairement pas de seau de remplissage pour conserver un outil rapide et fiable.

### Dessin sur papier

Le mot est masqué dès le lancement du chrono. Le téléphone affiche uniquement le temps restant et les boutons **Trouvé !** et **Passer**.

À la fin du temps, l’application peut émettre une vibration et un signal sonore.

### Résultats

Le bilan indique :

- le nombre total de points ;
- le nombre de dessins trouvés ;
- le nombre de dessins joués ;
- la difficulté, les points obtenus et le temps utilisé pour chaque dessin.

---

# Réglage des modes

Chaque tuile de mode ouvre une fenêtre de configuration contenant :

- une explication courte ;
- les règles du mode ;
- l’activation ou la désactivation du mode ;
- le choix des difficultés ;
- le choix des catégories ;
- le nombre de cartes actuellement sélectionnées ;
- les options propres au mode.

Les boutons **Tout** et **Aucun** permettent d’activer ou de désactiver rapidement les modes ou les catégories.

---

# Gestion des cartes et des catégories

Le menu **Gérer les cartes et les boîtes** permet de personnaliser entièrement le contenu.

## Cartes

Selon le mode, une carte peut contenir :

- des paroles à chanter et leur suite ;
- une consigne à mimer ;
- un mot à faire deviner et ses mots interdits ;
- une consigne à dessiner.

Pour chaque carte, il est possible de :

- l’ajouter ;
- la modifier ;
- la dupliquer ;
- changer sa difficulté ;
- la déplacer dans une autre catégorie ;
- l’activer ou la désactiver ;
- la supprimer.

La recherche et le filtre par catégorie facilitent la gestion des grandes bibliothèques.

## Boîtes et catégories

Pour chaque mode, il est possible de :

- créer une catégorie ;
- la renommer ;
- la supprimer.

Lorsqu’une catégorie est supprimée, ses cartes sont déplacées automatiquement dans **Sans catégorie**.

---

# Bibliothèques officielles et données personnelles

Chaque mode possède un fichier de bibliothèque officiel :

- `data.json` : Deviner les paroles ;
- `mimes.json` : Mimer ;
- `words.json` : Sans le dire ! ;
- `drawings.json` : Dessine-moi ça !

Les fichiers officiels sont hébergés dans le dépôt GitHub.

Les modifications réalisées depuis l’application sont enregistrées **localement dans le navigateur du téléphone** :

- cartes personnelles ;
- catégories personnelles ;
- modifications de cartes officielles ;
- sélections de catégories et de difficultés ;
- préférences générales.

Un visiteur de la page publique peut modifier ses propres données locales, mais **ne peut pas modifier les fichiers du dépôt GitHub ni supprimer les cartes des autres utilisateurs**.

Les données locales sont propres à chaque navigateur et à chaque appareil. Effacer les données du navigateur ou désinstaller l’application peut les supprimer si aucune sauvegarde n’a été exportée.

---

# Paramètres avancés

La section **Réglages → Paramètres avancés** regroupe les fonctions techniques afin de ne pas surcharger l’accueil.

## Vérifier les mises à jour

Compare la version installée de chaque bibliothèque avec la version disponible sur GitHub.

## Mettre à jour les bibliothèques

Installe les nouvelles cartes officielles tout en essayant de conserver les ajouts et modifications locales.

## Exporter une sauvegarde

Télécharge un fichier JSON contenant les données locales et les réglages de l’application.

## Restaurer une sauvegarde

Réimporte une sauvegarde précédemment exportée.

## Diagnostic

Affiche notamment :

- la version de l’application ;
- le nombre de cartes et de catégories de chaque mode ;
- les versions des bibliothèques ;
- la prise en charge du service worker ;
- l’orientation de l’écran ;
- la disponibilité des vibrations, du plein écran et du maintien de l’écran allumé ;
- la dernière erreur connue.

Le diagnostic peut être copié pour faciliter le dépannage.

## Réinitialiser les bibliothèques officielles

Restaure les cartes officielles dans leur état d’origine.

Cette opération annule les modifications locales apportées aux cartes officielles, mais conserve les cartes et catégories personnelles.

---

# Installation sur téléphone

L’application est une **Progressive Web App**.

## Installation proposée par l’application

Lorsque le navigateur le permet, un bouton **Installer l’application** apparaît sur l’accueil.

## Installation manuelle sur Android

Dans Chrome :

1. ouvrir l’application ;
2. ouvrir le menu du navigateur ;
3. choisir **Installer l’application** ou **Ajouter à l’écran d’accueil**.

Le raccourci s’appelle **MDB!**.

## Fonctionnement hors ligne

Le service worker met en cache les fichiers principaux. Après un premier chargement réussi, l’application peut fonctionner sans connexion pour la majorité de ses fonctions.

Les vérifications et mises à jour des bibliothèques nécessitent une connexion Internet.

---

# Confort d’utilisation

Au lancement d’une partie, l’application tente, lorsque le navigateur l’autorise, de :

- passer en plein écran ;
- verrouiller l’orientation en paysage ;
- maintenir l’écran allumé.

Ces fonctions dépendent du navigateur et du téléphone. Leur disponibilité peut être vérifiée dans le diagnostic.

L’affichage peut également être retourné à 180° depuis l’accueil ou pendant une partie.

---

# Structure du dépôt

```text
index.html             Interface principale
app.js                 Logique du jeu et gestion des données
styles.css             Mise en forme et animations
sw.js                  Service worker et cache hors ligne
manifest.webmanifest   Configuration de la PWA
icon-192.png           Petite icône de l’application
icon-512.png           Grande icône de l’application
data.json              Bibliothèque Deviner les paroles
mimes.json             Bibliothèque Mimer
words.json             Bibliothèque Sans le dire !
drawings.json           Bibliothèque Dessine-moi ça !
README.md               Documentation du projet
```

---

# Mise à jour sur GitHub Pages

Pour publier une nouvelle version :

1. remplacer ou ajouter les fichiers concernés dans la branche `main` ;
2. valider le commit ;
3. attendre le redéploiement automatique de GitHub Pages ;
4. ouvrir l’application avec un paramètre de version, par exemple :

```text
https://88miyou88.github.io/mais-devine-bordel/?v=041
```

5. fermer puis rouvrir l’application installée ;
6. vérifier la version dans **Réglages → Paramètres avancés → Diagnostic**.

Si l’ancienne interface reste affichée, il peut être nécessaire d’attendre la mise à jour du service worker ou de vider le cache du site.

---

# Limites actuelles de la version 0.4.1

- **Dessine-moi ça !** se joue uniquement seul.
- Le véritable système multijoueur avec noms, tours et scores cumulés n’est pas encore intégré.
- Les rotations équilibrées entre joueurs et modes ne sont pas encore intégrées.
- Les cartes d’une même famille ne sont pas encore automatiquement bloquées entre plusieurs modes.
- Le dessin sur téléphone ne possède pas de seau de remplissage.

---

# Évolutions prévues

## Dessin mélangé aux autres modes

Une carte Dessin devra plus tard :

- mettre le chrono général en pause ;
- déclencher une vibration spéciale et un son désactivable ;
- demander au joueur de récupérer le téléphone ;
- proposer directement le choix téléphone, papier ou passage ;
- lancer un mini-chrono indépendant ;
- enregistrer le résultat ;
- appliquer une déduction temporelle équitable ;
- permettre de remettre le téléphone sur le front avant la reprise.

Le nombre de dessins devra être configurable et identique pour tous les joueurs.

## Multijoueur

Sont également prévus :

- un nombre configurable de joueurs à partir de deux ;
- le choix d’un à tous les modes disponibles ;
- un ordre commun ;
- une rotation aléatoire équilibrée ;
- une rotation équilibrée simple en solution de secours ;
- un score total et un score par mode.

## Familles invisibles

Une future option pourrait attribuer une famille invisible aux cartes, par exemple `CHAT`, `PIZZA` ou `AVION`, afin d’éviter qu’un même concept apparaisse plusieurs fois dans différents modes pendant une même manche ou un même cycle.

Cette fonction restera facultative et ne sera ajoutée que si elle demeure simple et légère.

---

# Version

**Mais devine, bordel ! — 0.4.1**

Projet personnel en développement actif.
