## Tech Tribe — Domain-Based Networking Community Platform

Tech Tribe is a domain-focused networking community platform where users connect **only within their professional/technology domain** (e.g., Full Stack, Data Science, DevOps). The project is split into a **React frontend** and a **Spring Boot backend** (backend integration planned/ongoing).

---

### Core Idea

Unlike general networking platforms, DevSphere groups users strictly by **domain communities**. Each domain is its own community space with:

- Domain feed (posts)
- Saved posts (per user)
- Community members (“Friends”)
- Profiles (LinkedIn-style: about + posts)
- Messaging (planned)

---

## Architecture

- **Frontend**: React + Vite + Chakra UI  
- **Backend**: Spring Boot (REST API; planned)

The frontend is built in a scalable way so mock/local state can be replaced by real API calls with minimal UI changes.

---

## Features

### Frontend (Implemented)
- **Landing page** with hero and domain preview cards
- **Sign up / Sign in** UI with **domain onboarding**
  - Select an existing domain OR create a new domain
- **Community area** (domain-scoped)
  - Fixed **collapsible** left sidebar
  - **Feed**: domain posts (mock + user-created)
  - **Create post**
  - **Saved posts** (persisted locally)
  - **Friends**: community members list; click to view member profile
  - **Profile**: LinkedIn-style profile + about + settings + my posts
  - **Messages**: placeholder UI
- Local persistence (demo):
  - Saved posts
  - User-created posts
  - Profile “About”

### Backend (Planned with Spring Boot)
- Authentication & authorization
- Domain management (list/create/join)
- Posts (CRUD)
- Saved posts (per user)
- Member profiles
- Messaging (later)

---

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Chakra UI

### Backend (Spring Boot)
- Spring Boot (REST APIs)
- Spring Web
- Spring Security (recommended)
- Spring Data JPA (recommended)
- Database: PostgreSQL (recommended) / MySQL / H2 (dev)
- Build: Maven or Gradle

---

## Repository Structure (Typical)

- `frontend/` — React application (UI + client state)
- `backend/` — Spring Boot application (REST APIs)

> Note: Your folder names may differ—adjust commands accordingly.

---

## Getting Started

### 1) Frontend Setup

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Vite will print the local URL (commonly `http://localhost:5173`).

---

### 2) Backend Setup (Spring Boot)

Go to the backend directory:

```bash
cd backend
```

Run the backend (choose one):

**Maven**
```bash
./mvnw spring-boot:run
```

**Gradle**
```bash
./gradlew bootRun
```

Backend will typically run on:

- `http://localhost:8080`

---

## Frontend Domain Onboarding Logic (Current)

During **Sign up**:

- **Existing domain selected** → user joins that domain community
- **New domain typed** → domain is created and added immediately, and the user joins it

After authentication, the user is redirected to:

`/community/:domainSlug`

---

## Backend API Design (Suggested)

These endpoints are recommended for Spring Boot to support the current UI.

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `POST /api/auth/change-password`

### Domains
- `GET /api/domains`
- `POST /api/domains` (create domain)
- `POST /api/domains/{domainSlug}/join`
- `GET /api/domains/{domainSlug}`

### Posts
- `GET /api/domains/{domainSlug}/posts`
- `POST /api/domains/{domainSlug}/posts`
- `GET /api/posts/{postId}`
- `DELETE /api/posts/{postId}` (optional)
- `PUT /api/posts/{postId}` (optional)

### Saved Posts
- `GET /api/users/me/saved-posts?domain={domainSlug}`
- `POST /api/posts/{postId}/save`
- `DELETE /api/posts/{postId}/save`

### Members / Profiles
- `GET /api/domains/{domainSlug}/members`
- `GET /api/users/{userId}` (profile)
- `GET /api/users/{userId}/posts`

### Messaging (Later)
- `GET /api/conversations`
- `POST /api/conversations`
- `GET /api/conversations/{id}/messages`
- `POST /api/conversations/{id}/messages`

---

## Environment Configuration (Recommended)

### Frontend
Create a `.env` file (example):

```bash
VITE_API_BASE_URL=http://localhost:8080
```

Then all API requests can be pointed at Spring Boot.

### Backend
Use `application.yml` / `application.properties` for DB credentials, JWT secrets, etc.

---

## Development Notes

- The frontend currently uses **mock data + local state** to simulate backend responses.
- When the Spring Boot backend is ready:
  - Replace mock data sources with API calls
  - Keep UI components intact (swap context/service layer logic)

---

## Roadmap

- Backend implementation with Spring Boot (auth, domains, posts, saved posts)
- Real member profiles and posts from DB
- Messaging system
- Search + recommendations (optional)
- Notifications (optional)

---
