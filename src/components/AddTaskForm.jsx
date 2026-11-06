/** @fileoverview Add-task form component. */

import { useState } from 'react'
import { PRIORITIES } from '../utils/taskUtils'

/**
 * Form for creating a new task with priority and optional due date.
 * @param {{ onAdd: (title: string, priority: string, dueDate: string) => void }} props
 * @returns {JSX.Element} The add-task form UI.
 */
export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault() // Enter inside the form triggers this submit.
    const trimmed = title.trim()
    if (!trimmed) {
      setError('Enter a task title.')
      return
    }
    onAdd(trimmed, priority, dueDate)
    setTitle('')
    setPriority('Medium')
    setDueDate('')
    setError('')
  }

  const field =
    'w-full rounded-md border border-ink/20 bg-surface px-3 py-2 text-sm focus:border-accent'

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-lg bg-surface p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="new-title" className="mb-1 block text-sm font-medium">
            Task title
          </label>
          <input
            id="new-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (error) setError('')
            }}
            placeholder="What needs doing?"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'new-title-error' : undefined}
            className={field}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <div>
            <label htmlFor="new-priority" className="mb-1 block text-sm font-medium">
              Priority
            </label>
            <select
              id="new-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={field}
            >
              {PRIORITIES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="new-due" className="mb-1 block text-sm font-medium">
              Due date
            </label>
            <input
              id="new-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={field}
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-md bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Add task
        </button>
      </div>
      {error && (
        <p id="new-title-error" role="alert" className="mt-2 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  )
}
