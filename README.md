# TaskFlow — Modern Task Tracker (MERN Stack)

A production-ready, full-stack task management application built with MongoDB, Express, React, and Node.js. Designed with a premium UI inspired by Linear, Notion, Vercel, and Stripe — featuring glassmorphism, gradient accents, dark mode, and smooth micro-interactions.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📸 Screenshots

> Add screenshots here after deployment: Dashboard, Task List, Task Detail, Create/Edit Modal, Dark Mode.
>
> `docs/screenshot-dashboard.png` · `docs/screenshot-tasks.png` · `docs/screenshot-dark-mode.png`

## ✨ Features

- **Dashboard** — stat cards (Total, Completed, Pending, High Priority), animated progress bar, recent tasks feed
- **Full CRUD** — create, read, update, delete tasks with instant UI feedback
- **Search** — debounced instant search by title
- **Filtering** — by status (Pending / In Progress / Completed) and priority (High / Medium / Low)
- **Sorting** — newest, oldest, due date, priority
- **Pagination** — server-side pagination for large task lists
- **Validation** — mirrored client-side (React Hook Form) and server-side (express-validator) rules with clear error messages
- **Toast notifications** — for create, update, delete, and error events
- **Loading states** — skeleton placeholders, spinners, disabled buttons during submission
- **Empty states** — friendly illustration when no tasks match
- **Delete confirmation modal** — prevents accidental deletion
- **Dark mode** — persisted, system-preference aware
- **Responsive design** — mobile sidebar, floating action button, adaptive grid
- **404 page**, **error boundary**, and a dedicated **API service layer**

## 🛠 Tech Stack

**Frontend:** React 18 (Vite), Tailwind CSS, React Router DOM, Axios, React Hook Form, React Toastify, React Icons

**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, express-validator, dotenv, cors

**Deployment:** Vercel (frontend) · Render (backend) · MongoDB Atlas (database)

## 📁 Folder Structure

```
task-tracker/
├── client/                      # React (Vite) frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/                # Route-level pages
│   │   ├── hooks/                # Custom hooks (useDebounce)
│   │   ├── context/              # ThemeContext (dark mode)
│   │   ├── services/             # Axios API service layer
│   │   ├── utils/                # Constants, date helpers
│   │   └── styles/                # Tailwind global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                      # Express backend
│   ├── config/                   # MongoDB connection
│   ├── controllers/              # Route handler logic
│   ├── models/                   # Mongoose schemas
│   ├── routes/                   # Express routers
│   ├── middlewares/              # Error handling
│   ├── validators/               # express-validator rule chains
│   ├── utils/                    # ApiError, asyncHandler
│   └── server.js
│
└── render.yaml                  # Render deployment blueprint
```

## 🚀 Installation

### Prerequisites
- Node.js 18+
- A MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/task-tracker.git
cd task-tracker
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env   # then fill in your values
npm run dev             # starts on http://localhost:5000
```

### 3. Frontend setup
```bash
cd client
npm install
cp .env.example .env   # then fill in your values
npm run dev             # starts on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

## 🔐 Environment Variables

**server/.env**
| Variable      | Description                                  | Example                                  |
|---------------|-----------------------------------------------|-------------------------------------------|
| `MONGO_URI`   | MongoDB Atlas connection string                | `mongodb+srv://user:pass@cluster.../db`   |
| `PORT`        | Port the Express server listens on             | `5000`                                    |
| `CLIENT_URL`  | Deployed/local frontend URL, used for CORS     | `http://localhost:5173`                   |

**client/.env**
| Variable        | Description                     | Example                              |
|-----------------|----------------------------------|----------------------------------------|
| `VITE_API_URL`  | Base URL of the backend API      | `http://localhost:5000/api`            |

## 📡 API Documentation

Base URL: `/api/tasks`

| Method | Endpoint            | Description                                              |
|--------|----------------------|------------------------------------------------------------|
| GET    | `/api/tasks`         | List tasks — supports `search`, `status`, `priority`, `sort`, `page`, `limit` query params |
| GET    | `/api/tasks/stats`   | Dashboard statistics (total, completed, pending, high priority, progress %) |
| GET    | `/api/tasks/:id`     | Get a single task by id                                    |
| POST   | `/api/tasks`         | Create a new task                                           |
| PUT    | `/api/tasks/:id`     | Update an existing task                                     |
| DELETE | `/api/tasks/:id`     | Delete a task                                                |

**Task object**
```json
{
  "_id": "665f1c2e8b1d2a0012a4e5f1",
  "title": "Design landing page",
  "description": "Create hero section mockups in Figma",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-07-10T00:00:00.000Z",
  "createdAt": "2026-07-01T09:12:00.000Z",
  "updatedAt": "2026-07-02T14:03:00.000Z"
}
```

**Example — create a task**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Write unit tests",
    "description": "Cover the task controller with Jest tests",
    "status": "Pending",
    "priority": "Medium",
    "dueDate": "2026-07-15"
  }'
```

All error responses follow:
```json
{ "success": false, "message": "Human-readable error message" }
```

## ☁️ Deployment Guide

### Backend → Render
1. Push this repo to GitHub.
2. In Render, create a **New Web Service**, connect the repo, and set **Root Directory** to `server`.
3. Build command: `npm install` · Start command: `npm start`.
4. Add environment variables `MONGO_URI`, `PORT`, `CLIENT_URL` in the Render dashboard.
5. Deploy — note the generated URL (e.g. `https://task-tracker-server.onrender.com`).

*(A `render.yaml` blueprint is included at the repo root for one-click Blueprint deploys.)*

### Frontend → Vercel
1. In Vercel, **Import Project**, select this repo, and set **Root Directory** to `client`.
2. Framework preset: **Vite**.
3. Add environment variable `VITE_API_URL` = `https://<your-render-backend>.onrender.com/api`.
4. Deploy — Vercel will build and host the SPA (the included `vercel.json` handles client-side routing rewrites).

### MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Add a database user and allow network access (0.0.0.0/0 for simplicity, or Render's static IPs for tighter security).
3. Copy the connection string into `MONGO_URI`.

## 🧪 Testing Instructions

**Manual smoke test**
1. Start backend (`npm run dev` in `server/`) and confirm `GET /` returns `{ success: true, ... }`.
2. Start frontend (`npm run dev` in `client/`) and confirm the dashboard loads with zero-state stats.
3. Create a task → verify it appears on the Dashboard and Tasks page, and a success toast fires.
4. Edit the task → confirm changes persist after refresh.
5. Filter/search/sort on the Tasks page → confirm results and pagination update correctly.
6. Delete a task → confirm the confirmation modal appears and the task is removed after confirming.
7. Toggle dark mode → confirm it persists across a page refresh.
8. Resize to mobile width → confirm the sidebar collapses behind the menu button and the floating action button appears.

**API testing**
Use the provided `curl` example above, or import the endpoints into Postman/Insomnia using the API Documentation table.

## 📤 GitHub Upload Steps

```bash
git init
git add .
git commit -m "Initial commit: TaskFlow MERN task tracker"
git branch -M main
git remote add origin https://github.com/<your-username>/task-tracker.git
git push -u origin main
```

## 📄 License

This project is licensed under the MIT License — free to use, modify, and distribute.
