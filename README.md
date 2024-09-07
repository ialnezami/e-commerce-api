# E-commerce API

## Description

L'**E-commerce API** est une application backend développée avec [NestJS](https://nestjs.com/) qui fournit des fonctionnalités pour gérer un site de vente en ligne. Cette API permet la gestion des utilisateurs, des produits, des catégories, des commandes, du panier, ainsi que l'intégration de passerelles de paiement. L'application utilise **TypeScript** et peut être intégrée avec **MongoDB**.

### Fonctionnalités principales :

- **Authentification JWT** : Inscription, connexion, et gestion des tokens.
- **Gestion des produits** : CRUD (création, lecture, mise à jour, suppression) des produits.
- **Gestion des catégories** : CRUD des catégories de produits.
- **Gestion des commandes** : Passation de commandes, suivi des commandes.
- **Gestion du panier** : Ajout, modification et suppression d'articles du panier.
- **Paiement** : Intégration de passerelles de paiement (ex : Stripe, PayPal).
- **Commentaires et avis produits** (en option).

## Prérequis

- [Node.js](https://nodejs.org/en/) (v14 ou supérieur)
- [npm](https://www.npmjs.com/)
- Base de données (PostgreSQL ou MongoDB)
