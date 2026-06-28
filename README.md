# Tasks

A one-page task manager. Single React component, no backend — your list is saved in the browser via `localStorage`.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally to double-check it
```

The output goes to `dist/` — deployable to any static host (GitHub Pages, Vercel, Netlify, S3, etc.).

## What it does

- Add, complete, edit (double-click a task), and delete tasks
- Filter by All / To do / Done
- Clear all completed tasks in one go
- Everything persists locally per-browser — no account, no server, no sync across devices

## Notes

- All app logic lives in `src/App.jsx`; styling in `src/App.css` and `src/index.css`.
- Data is stored under the `tasks.v1` key in `localStorage`. Clearing browser storage clears your list.
- No backend yet by design — if you later want sync across devices, the `loadTasks`/`saveTasks` functions in `App.jsx` are the seam to swap for an API call.
