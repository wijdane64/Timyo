# Appointly - Application de réservation de rendez-vous

## 📁 Documentation du Projet



### 🗓 Planification
[![trello](https://img.shields.io/badge/🗓_Planification_trello-View-blue?style=for-the-badge&logo=jira)](https://trello.com/invite/b/68927905ebdf30c5c5e59afe/ATTId79f6b015b2d6cc671fe27f38210b49c0608AB02/timyo)

### 📊 Diagramme de classes
[![Lucidchart](https://img.shields.io/badge/📊_Diagramme_de_classe-View-blue?style=for-the-badge&logo=lucidchart)](https://lucid.app/lucidchart/38a9b316-6423-4804-a8c4-9f9c947166e5/edit?page=0_0&invitationId=inv_aea5e30a-afee-4ff2-844e-9b216899c22f#)

### 📊 Diagramme de cas d'utilisation
[![Lucidchart](https://img.shields.io/badge/📊_Diagramme_use_case-View-blue?style=for-the-badge&logo=lucidchart)](https://lucid.app/lucidchart/83dc62f6-ff8b-4ffe-bc5b-b911dcfe0b71/edit?page=0_0&invitationId=inv_be4d7ee4-a189-4b96-ae00-e545648b67ca#)

---

## 🎯 Objectif du projet
Appointly est une application web de réservation de rendez-vous permettant aux utilisateurs de créer, consulter et annuler leurs rendez-vous, tandis que les administrateurs peuvent gérer l’agenda et les utilisateurs.  
L’application utilise **Laravel Sanctum en mode cookie-based (SPA Authentication)** avec un frontend **React** sécurisé.

---

## 👥 Rôles
- **User** : gestion de ses rendez-vous
- **Admin** : gestion globale des rendez-vous et des utilisateurs

---

## 🧩 User Stories

### Utilisateur
- **US1** : Créer un rendez-vous avec date et heure
- **US2** : Consulter la liste de mes rendez-vous
- **US3** : Annuler un rendez-vous avant sa date

### Administrateur
- **US4** : Lister tous les rendez-vous
- **US5** : Approuver ou rejeter un rendez-vous
- **US6** : Consulter la liste des utilisateurs

---

## 🖥 Pages & Fonctionnalités

### 🔐 Pages d’authentification
- LoginPage
- RegisterPage

### 👤 Dashboard User
- Liste de ses rendez-vous
- Création d’un nouveau rendez-vous
- Annulation d’un rendez-vous

### 🛠 Dashboard Admin
- Liste complète des rendez-vous (utilisateur, date, heure, statut)
- Validation ou rejet des rendez-vous
- Gestion des utilisateurs et rôles

---

## ⚙️ Fonctionnalités principales
- Authentification sécurisée avec Laravel Sanctum (cookies & sessions)
- Gestion multi-rôles (admin / user)
- API REST Laravel
- Relations Eloquent (User hasMany Appointments)
- Middlewares `isUser` et `isAdmin`
- Notifications toast (succès / erreurs)
- Routes protégées côté frontend (ProtectedRoute)

---

## 🛠 Stack Technique

### Backend
- Laravel
- Laravel Sanctum (SPA Authentication)
- MySQL
- Eloquent ORM
- PHPUnit (tests unitaires)

### Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router
- Jest & React Testing Library

---

## 🗄 Base de données
Tables principales :
- `users`
- `appointments`

Relations :
