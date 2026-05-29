<div align="center">

# Gestion des Absences

<img src="https://img.shields.io/badge/Full%20Stack-Projet-blueviolet?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Spring%20Boot-Backend-6DB33F?style=for-the-badge&logo=springboot" />
<img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss" />
<img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql" />

---

### *Application web de gestion des absences universitaires*

</div>

---

# À propos du projet

**Gestion des Absences** est une application web full stack développée en binôme permettant de gérer les absences des étudiants au sein d’un établissement universitaire.

Le projet permet :
- La gestion des étudiants et enseignants
- Le suivi des absences
- La gestion des modules et classes
- L’authentification sécurisée avec JWT

---

# Stack Technique

## Frontend
- React JS
- Tailwind CSS
- React Router
- Axios

## Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- REST API
- JWT Authentication

## Base de données
- MySQL

## Outils
- Git & GitHub
- Postman
- Maven
- Node.js

---

# Fonctionnalités

## Admin
- Gestion des étudiants
- Gestion des enseignants
- Gestion des modules
- Gestion des absences

## Enseignant
- Ajouter des absences
- Modifier des absences
- Consulter les classes

## Étudiant
- Voir ses absences
- Consulter ses modules

---

# Endpoints API

```http
POST   /auth/login              # Connexion utilisateur
POST   /auth/register           # Inscription utilisateur

GET    /students                # Liste des étudiants
POST   /students                # Ajouter un étudiant

GET    /teachers                # Liste des enseignants
POST   /teachers                # Ajouter un enseignant

GET    /modules                 # Liste des modules
POST   /modules                 # Ajouter un module

GET    /absences                # Liste des absences
POST   /absences                # Ajouter une absence
PUT    /absences/{id}           # Modifier une absence
DELETE /absences/{id}           # Supprimer une absence
````

---

# Installation

## Backend

```bash
cd backend
mvn spring-boot:run
```

Backend lancé sur :

```bash
http://localhost:8082
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend lancé sur :

```bash
http://localhost:5173
```

---

# Structure du projet

```bash
Gestion-Absences/
│
├── backend/
├── frontend/
└── README.md
```

---

# Réalisé par

* Assia MEZAROU
* Nouhaila MOUFID

---

# Projet universitaire

Projet réalisé dans le cadre d’un projet universitaire.

```
```
