## Domain-Based Networking Frontend

This is a minimal, domain-focused networking frontend built with React, Vite, React Router, and Chakra UI. It is designed to be clean, modern, and easy to connect to a future Spring Boot backend.

### Tech stack

- **React 18** (functional components + hooks)
- **Vite** (fast dev/build tool)
- **React Router v6** (routing)
- **Chakra UI** (minimal, responsive UI components)

### Running the app

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the printed URL in your browser (default: `http://localhost:5173`).

### Core concepts

- **Domain-based onboarding**: Users must join or create a professional domain community during sign up.
- **Dynamic domain creation**: If a domain does not exist, users can create a new domain, which is immediately added to the domain list.
- **Mock data only**: All data (domains, posts, membership) lives in React state and local mock files; there is no backend integration yet.
- **Spring Boot ready**: A thin `services/api.js` module is included to route future HTTP calls, so UI components stay largely unchanged when a backend is introduced.

### Key files

- `src/App.jsx` – High-level routing and protected community route.
- `src/context/AuthContext.jsx` – Holds user and domain state, domain creation/join logic, and navigation after auth.
- `src/pages/HomePage.jsx` – Landing page with hero section and domain preview cards.
- `src/pages/AuthPage.jsx` – Combined sign up / sign in flow with domain selection or creation.
- `src/pages/CommunityPage.jsx` – Domain community page with tabs for Posts, Discussions, and Members using mock data.
- `src/components/DomainSelector.jsx` – UX for selecting an existing domain or creating a new one.

