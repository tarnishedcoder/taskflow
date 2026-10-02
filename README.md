# TaskFlow

A Kanban-style task management board built to practice modern front-end development — featuring a typed data model, centralized state management, and full REST API integration.

## Features

- Create, move, and delete tasks across three columns (To Do / In Progress / Done)
- Persisted via a REST API (json-server) — changes survive page reloads
- Fully typed with TypeScript, including a normalized board state (tasks and columns stored by ID)
- Centralized state management using React's `useReducer`
- Unit tested with Jest and React Testing Library
- End-to-end tested with Cypress

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **State Management:** React `useReducer`
- **API:** REST (via `json-server`)
- **Styling:** CSS (Flexbox/Grid)
- **Testing:** Jest, React Testing Library, Cypress

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/tarnishedcoder/taskflow.git
cd taskflow
npm install
```

Run the app and the fake API server in two separate terminals:

```bash
npm run dev      # starts the React app
npm run server   # starts the REST API (json-server)
```

Open the local URL printed by `npm run dev` (typically `http://localhost:5173`).

## Running Tests

**Unit tests (Jest):**
```bash
npm test
```

**End-to-end tests (Cypress):**
```bash
npx cypress open
```
(Requires `npm run dev` and `npm run server` running in separate terminals first.)

## Project Structure
src/
├── components/ # Board, Column, TaskCard
├── data/ # seed data
├── types.ts # Task, Column, BoardData interfaces
├── reducer.ts # board state logic (pure, action-based)
├── api.ts # REST API calls
└── App.tsx
cypress/
└── e2e/ # end-to-end test specs


## License

MIT
