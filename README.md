DevSphere — Domain-Based Networking Community Platform
DevSphere is a domain-focused networking community platform where users connect only within their professional/technology domain (e.g., Full Stack, Data Science, DevOps). The project is split into a React frontend and a Spring Boot backend (backend integration planned/ongoing).

Core Idea
Unlike general networking platforms, DevSphere groups users strictly by domain communities. Each domain is its own community space with:

Domain feed (posts)
Saved posts (per user)
Community members (“Friends”)
Profiles (LinkedIn-style: about + posts)
Messaging (planned)
Architecture
Frontend: React + Vite + Chakra UI
Backend: Spring Boot (REST API; planned)
The frontend is built in a scalable way so mock/local state can be replaced by real API calls with minimal UI changes.

Features
Frontend (Implemented)
Landing page with hero and domain preview cards
Sign up / Sign in UI with domain onboarding
Select an existing domain OR create a new domain
Community area (domain-scoped)
Fixed collapsible left sidebar
Feed: domain posts (mock + user-created)
Create post
Saved posts (persisted locally)
Friends: community members list; click to view member profile
Profile: LinkedIn-style profile + about + settings + my posts
Messages: placeholder UI
Local persistence (demo):
Saved posts
User-created posts
Profile “About”
Backend (Planned with Spring Boot)
Authentication & authorization
Domain management (list/create/join)
Posts (CRUD)
Saved posts (per user)
Member profiles
Messaging (later)
Tech Stack
Frontend
React 18
Vite
React Router
Chakra UI
Backend (Spring Boot)
Spring Boot (REST APIs)
Spring Web
Spring Security (recommended)
Spring Data JPA (recommended)
Database: PostgreSQL (recommended) / MySQL / H2 (dev)
Build: Maven or Gradle
