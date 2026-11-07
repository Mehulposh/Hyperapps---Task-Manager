# Task Manager

A one-page task manager built with React (Vite), function components and hooks, and Tailwind CSS. No backend, no state library.

## Run it

```bash
npm install
npm run dev
```

## What works

All 9 must-have features:

1. First load fetches `public/tasks.json`, with a loader and an error message plus Retry button.
2. Every change is saved to `localStorage`; later visits load from there instead of the JSON file.
3. Add a task: title (required, blank/spaces rejected), priority (default Medium), optional due date. Enter submits.
4. Task list with title, priority badge, due date and checkbox. Completed tasks are struck through.
5. Edit in place: click a title, Enter saves, Escape cancels, blank titles are rejected.
6. Delete with a confirmation prompt.
7. All / Active / Completed tabs and a "N tasks left" counter.
8. Case-insensitive search (works with the tabs) and sorting by due date (no date last) or priority (High first).
9. Incomplete tasks past their due date show a red "Overdue" label. Layout works at 375px and on desktop.

Starter-data check: counter shows 3 tasks left, only "Fix checkout bug" is Overdue, and sorting All by due date gives
Set up project repo, Fix checkout bug, Design login screen, Write API docs, Plan team outing.

## Structure

- `src/hooks/useTasks.js` – the single source of truth: loading, saving and task actions.
- `src/utils/taskUtils.js` – pure filter, sort, overdue and counter helpers.
- `src/components/` – `AddTaskForm`, `Controls`, `TaskList`, `TaskItem`, `StatusMessage`.
- The visible list, sort order and counter are computed in `App.jsx`, not stored.

## Bonus features

- **Unit tests:** `npm test` runs Vitest and React Testing Library tests for the filter, sort, overdue and counter logic, the add form and the load/error/undo flows.
- **Undo delete:** a toast with an Undo button appears for 5 seconds after a delete and restores the task in its old position.
- **Theme toggle:** light/dark, saved in `localStorage` and applied before first paint. Defaults to the system preference.
- **Accessibility:** real `<button>` elements, labels on all inputs, visible focus ring, `aria-live` counter, `role="alert"` on errors.

## Not done

- Live deployment. To deploy, import the repo on Vercel or Netlify (build command `npm run build`, output directory `dist`), then add the link here.

## Assumptions

- "Overdue" compares the due date with today's local date; a task due today is not overdue.
- Clicking away from an edit field cancels the edit.
- "Added order" is the default sort; it keeps the stored order.
- Time spent: add your own estimate here.
