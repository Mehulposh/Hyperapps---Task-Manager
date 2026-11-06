/** @fileoverview Individual task row with editing and delete actions. */

import { useState } from 'react'
import { formatDate, isOverdue } from '../utils/taskUtils'

const BADGE_STYLES = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
  Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  Low: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200',
}

/**
 * Renders a single task row with editing, completion, and delete actions.
 * @param {{ task: Object, onToggle: (id: number, completed: boolean) => void, onRename: (id: number, title: string) => void, onDelete: (id: number) => void }} props
 * @returns {JSX.Element} The task card for one item.
 */
export default function TaskItem({ task, onToggle, onRename, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.title)
  const [error, setError] = useState('')

  function startEditing() {
    setDraft(task.title)
    setError('')
    setIsEditing(true)
  }

  function cancelEditing() {
    setIsEditing(false)
    setError('')
  }

  function saveEditing() {
    const trimmed = draft.trim()
    if (!trimmed) {
      setError('Title can’t be blank.')
      return
    }
    onRename(task.id, trimmed)
    setIsEditing(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') saveEditing()
    if (event.key === 'Escape') cancelEditing()
  }

  function handleDelete() {
    if (window.confirm(`Delete “${task.title}”?`)) onDelete(task.id)
  }

  return (
    <li className="rounded-lg bg-surface p-3 shadow-sm sm:p-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, !task.completed)}
          aria-label={`Mark “${task.title}” as ${task.completed ? 'active' : 'completed'}`}
          className="mt-1 h-5 w-5 shrink-0 accent-accent"
        />

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div>
              <label htmlFor={`edit-${task.id}`} className="sr-only">
                Edit task title
              </label>
              <input
                id={`edit-${task.id}`}
                autoFocus
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value)
                  if (error) setError('')
                }}
                onKeyDown={handleKeyDown}
                onBlur={cancelEditing}
                aria-invalid={Boolean(error)}
                className="w-full rounded-md border border-accent bg-surface px-2 py-1 text-sm"
              />
              {error && (
                <p role="alert" className="mt-1 text-xs text-red-700 dark:text-red-400">
                  {error}
                </p>
              )}
              <p className="mt-1 text-xs text-ink/60">Enter to save · Esc to cancel</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={startEditing}
              title="Click to edit"
              className={`block w-full break-words text-left text-base font-medium ${
                task.completed ? 'text-ink/50 line-through' : ''
              }`}
            >
              {task.title}
            </button>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className={`rounded-full px-2 py-0.5 font-semibold ${BADGE_STYLES[task.priority]}`}>
              {task.priority}
            </span>
            <span className="text-ink/70">
              {task.dueDate ? `Due ${formatDate(task.dueDate)}` : 'No due date'}
            </span>
            {isOverdue(task) && (
              <span className="rounded-full bg-red-600 px-2 py-0.5 font-semibold text-white">Overdue</span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          aria-label={`Delete “${task.title}”`}
          className="shrink-0 rounded-md px-2 py-1 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
        >
          Delete
        </button>
      </div>
    </li>
  )
}
