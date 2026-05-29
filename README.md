
<div align="center">

# Gestion des Absences

### Application Web Full Stack de Gestion Universitaire

<br>

<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Spring_Boot-Backend-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-Design-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />

<br><br>

> Gestion moderne des absences, étudiants, enseignants et modules.

</div>

---

# Aperçu du Projet

**Gestion des Absences** est une application web développée en binôme permettant de digitaliser la gestion des absences dans un établissement universitaire.

L’application offre :
- Une interface moderne 
- Une gestion des étudiants et enseignants
- Une gestion complète des absences
- Une organisation simple et efficace des modules et classes

---

# Fonctionnalités

<table>
<tr>
<td width="50%">

## Admin
- Gestion des étudiants
- Gestion des enseignants
- Gestion des modules
- Gestion des absences
- Consultation des données

</td>

<td width="50%">

## Enseignant
- Ajouter des absences
- Modifier des absences
- Consulter les classes
- Suivre les étudiants

</td>
</tr>
</table>

---

## Étudiant
- Consulter ses absences
- Voir ses modules
- Accéder à son espace personnel

---

# Stack Technique

<div align="center">

| Frontend | Backend | Base de données | Outils |
|----------|----------|----------------|---------|
| React JS | Spring Boot | MySQL | Git & GitHub |
| Tailwind CSS | Spring Data JPA |  | Postman |
| Axios | REST API |  | Maven |

</div>

---

# Endpoints API

```http
GET    /students
POST   /students

GET    /teachers
POST   /teachers

GET    /modules
POST   /modules

GET    /absences
POST   /absences
PUT    /absences/{id}
DELETE /absences/{id}
````

---

# Installation

## Backend

```bash id="6uxv8o"
cd backend
mvn spring-boot:run
```

Backend disponible sur :

```bash id="vhqg2q"
http://localhost:8082
```

---

## Frontend

```bash id="yj4q0j"
cd frontend
npm install
npm run dev
```

Frontend disponible sur :

```bash id="vjbycg"
http://localhost:5173
```

---

# Structure du Projet

```bash id="kicg7r"
Gestion-Absences/
│
├── backend/
│   ├── src/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# Réalisé par

<div align="center">

### Assia MEZAROU

### Nouhaila MOUFID

</div>

---

<div align="center">

### Projet Universitaire 2026

</div>
```
