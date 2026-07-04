# TaskFlow MERN Task Tracker - TODO

## Completed
- [x] Verified backend route mounting in `server/server.js`:
  - `/api/auth/*` handled by `routes/authRoutes.js`
  - `/api/tasks/*` handled by `routes/taskRoutes.js`
- [x] Audited backend controllers + middleware and confirmed expected endpoints.
- [x] Audited frontend Axios service and found wrong route usage (missing `/api` prefix).
- [x] Fixed frontend route calls by updating `client/src/services/api.js` to call `/api/auth/*` and `/api/tasks*`.

## Remaining
- [ ] Search the entire frontend for any remaining hardcoded requests to:
  - `/auth/login`, `/auth/signup`, `/tasks` (without `/api`)
  - `localhost` / `127.0.0.1` / `:5173` / `:5000` in fetch/axios URLs
- [ ] Verify `VITE_API_URL` matches Render backend URL (recommended: `https://tasktracker-a2t2.onrender.com/api`)
- [ ] Verify backend CORS `CLIENT_URL` matches the deployed Vercel frontend origin
- [ ] Run smoke tests:
  - POST `/api/auth/signup`
  - POST `/api/auth/login`
  - GET `/api/tasks`
  - POST/PUT/DELETE task CRUD
- [ ] Confirm no logout/401 redirect loops
- [ ] Final production checklist

