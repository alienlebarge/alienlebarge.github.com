+++
date = "2016-03-18T07:28:30Z"
description = "Dans le cadre du développement d'une libraire distribué, est-il bon d'utiliser Bootstrap ?"
tags = ["bootstrap", "pattern", "library", "styleguide"]
title = "Pourquoi ne pas utiliser Bootstrap ?"

+++

Voici une question qui revient éternellement dans le monde du web.

> Faut-il utiliser Bootstrap ou non ?

Je vais tenter de répondre à cette question, mais en prenant en compte un contexte particulier. Il s'agit de celui de développer une libraire de patterns distribuée à large échelle.
Cette libraire comprend des styles, des fonctionnalités et de la documentation qui peuvent être utilisés, quelle que soit la technologie qui produit le frontend.

Vous l'aurez assez vite compris, je pense que dans ce contexte, il vaut mieux développer une solution maison.

## Arguments

### Développer un framework pour ses propres besoins

Bootstrap a énormément de composants. Mais vous avez très rarement (jamais ?) besoin de tout ce qui est mis à votre disposition.

Développer son propre framwork permet de construire un outil qui réponde à vos besoins. Vous développer uniquement ce qui vous est nécessaire.

Cela a pour avantage de restreindre le poids des fichiers.  
Vos visiteurs éviteront ainsi de télécharger des styles, des scripts, des fonctionnalités inutilisés. Tout le monde n'a pas un forfait de donnée illimité.
Ayez une attitude responsable. [Consulter un site a un coût](https://whatdoesmysitecost.com/ "Calculer le coup de consultation de votre site"). D'autant plus si c'est via un forfait mobile.

De plus, moins de ressources à télécharger augmentera la vitesse d'affichage de vos pages.

#### Oui, mais...

Certains vont me dire qu’il n’est pas obligatoire d’inclure toutes les fonctionnalités. Il suffit de les supprimer de `bootstrap.less`.

C'est un fait. Mais cela reste du haut niveau.  
Imaginez que vous ayez besoin d'un système de grille. Mais que tout ce qui permet de placer une colonne avant une autre (<span lang="en">pull</span> et <span lang="en">push</span>) ne vous intéresse pas. Et bien il est impossible de supprimer cela finement. Vous supprimer tout le fichier `grid.less` ou pas: tout ou rien.

Une autre technique serait d'utiliser le <span lang="en">UnCSS</span>. Cela veut dire construire des pages avec tous les composants désirés puis supprimer au moyen d'un outil les styles non utilisés dans ces pages.
C'est également très difficilement applicable et à maintenir dans le cadre d'un système distribué.

Développer son propre framework vous permet d'avoir un outil léger et optimisé.

### Contrainte de suivre le développement de Bootstrap

Soumettre une nouvelle fonctionnalité ou même corriger un bug peut prendre du temps.

Dans le cas où vous devez introduire une nouvelle fonctionnalité. Manque de chance, cette fonctionnalité est critique.  
Et bien, temps que ce changement n'est pas validé et intégré à Bootstrap, vous devez maintenir un *fork* auquel vous devez faire suivre les évolutions de Bootstrap.

Il peut arriver que votre changement ne soit jamais intégré à Bootstrap.
Imaginons qu'au sein de votre entreprise des personnes utilisent  des navigateurs qui ne sont plus supportés par Bootstrap (c'est une histoire vraie). Si un bug les concerne et que vous voulez le corriger, il y a très peu de chance qu'il soit accepté pour être intégré à Bootstrap.
Cela veut dire que vous devrez maintenir un fork et supporter les montées de version de bootstrap.

Être maitre de son framework permet de corriger rapidement des bugs ou d'implémenter de nouvelles fonctionnalités sans être dépendant du cycle de vie d'un produit.

### Customisation

Afin de customiser Bootstrap, il est possible d'écraser des styles existants avec une nouvelle CSS au moyen d'un thème ou autre. Cela veut dire qu’on augmente le poids de la feuille de style. Il y a donc plus de données à charger pour les navigateurs.

Modifier directement les fichiers de Bootstrap est également possible. Mais dans ce cas, attendez-vous à avoir des montées de version pénible.

Vous l'aurez compris, customiser Bootstrap a des coûts non négligeables en termes de maintenance.

## Quand est-ce bien d'utiliser Bootstrap ?

Je ne suis pas un anti-bootstrap. Mais je pense qu'il ne s'applique pas à toutes les situations.

Voici une liste de cas dans laquelle l'utilisation de Bootstrap peut se révéler utile.

- Manque de ressource (temps, personnes).
- Prototypage.
- Ce n'est pas vous qui assurez la maintenance et l'évolution.
- Le site est un "one shot". Il ne va pas évoluer.
- Il n'y a pas de contrainte de chargement.
- Vous n'allez pas développez de nouveau composant et aller suivre les évolutions de Bootstrap les yeux fermés.
