# ⚽ Football League App

A full-stack football league application built with **NestJS** (backend) and **Nuxt 3** (frontend).  
The application integrates with a public sports API, processes and normalizes the data on the backend, and delivers a dynamic, responsive UI on the frontend.

---

## 📖 Overview

This project demonstrates a clean separation of concerns between backend and frontend systems:

- **NestJS** acts as a middleware layer that fetches and formats football data.
- **Nuxt 3** provides a modern SSR-ready frontend architecture.
- **Pinia** ensures scalable and centralized state management.
- **PrimeVue + PrimeFlex** power a responsive and consistent UI/UX.

Data is sourced from the public sports API:  
https://www.thesportsdb.com/

---

## 🏗️ Architecture

### 🔹 Backend (NestJS)

The backend layer is responsible for:

- Fetching data from TheSportsDB API
- Transforming and normalizing external API responses
- Handling business logic and error management
- Exposing clean and structured REST endpoints
- Decoupling frontend from third-party API structure

### Why this approach?

- Prevents frontend dependency on third-party API changes
- Enables future extensibility (caching, authentication, rate limiting)
- Keeps business logic centralized
- Improves maintainability and scalability

---

### 🔹 Frontend (Nuxt 3)

The frontend application is built using a modular, component-driven architecture:

- Server-Side Rendering (SSR) ready
- Dynamic routing for leagues and teams
- Reusable PrimeVue components
- Responsive layout using PrimeFlex
- Centralized state handling via Pinia

---

## 🔄 Data Flow

The application follows a structured data pipeline:

1. External Sports API  
2. NestJS Backend (Fetch → Transform → Expose)  
3. Nuxt Frontend (Pinia Store → Components → UI Rendering)

This ensures a predictable, scalable, and maintainable architecture.

---

## 🛠️ Tech Stack

### Backend
- NestJS
- Node.js
- Axios / HTTP Module
- REST API Architecture

### Frontend
- Nuxt 3
- Vue 3 (Composition API)
- PrimeVue
- PrimeFlex
- Pinia (State Management)

---

## ✨ Features

- Football league listing
- Team details view
- League information display
- Clean backend-to-frontend data flow
- Centralized state management
- Responsive and modern UI
- Modular and scalable architecture

---

## Project folder structure

football-league-app/
│
├── api/        # NestJS API layer
│   ├── modules/
│   ├── controllers/
│   ├── services/
│   └── main.ts
│
├── ui/       # Nuxt 3 application
│   ├── pages/
│   ├── components/
│   ├── stores/
│   └── app.vue
│
└── README.md

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/goranradmanovic/Football-Leagues-App
cd football-league-app

cd frontend
npm install
npm run dev

cd backend
npm install
npm run start:dev
```
---

## Screenshots

- ![Dashboard image]('./screenshots/1.png')
- ![Team profile image]('./screenshots/2.png')
- ![Team profile image]('./screenshots/3.png')
- ![Team profile image]('./screenshots/4.png')