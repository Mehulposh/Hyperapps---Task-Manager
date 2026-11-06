/** @fileoverview Main application shell for the task manager. */

import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { useTheme } from './hooks/useTheme'
import { countActive, filterTasks, sortTasks } from './utils/taskUtils'
import AddTaskForm from './components/AddTaskForm'
import Controls from './components/Controls'
import TaskList from './components/TaskList'
import ThemeToggle from './components/ThemeToggle'
import UndoToast from './components/UndoToast'
import { ErrorMessage, Loader } from './components/StatusMessage'

/**
 * Main application shell for the task manager.
 * @returns {JSX.Element} The full task manager workspace.
 */
export default function App() {
  const { tasks, status, retry, addTask, updateTask, deleteTask, lastDeleted, undoDelete } = useTasks()
  const { theme, toggleTheme } = useTheme()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('none')

  // Derived on every render, never stored.
  const visibleTasks = sortTasks(filterTasks(tasks, filter, query), sortBy)
  const tasksLeft = countActive(tasks)

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:pt-12">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">Task Manager</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      {status === 'loading' && <Loader />}
      {status === 'error' && <ErrorMessage onRetry={retry} />}
      {status === 'ready' && (
        <div className="space-y-5">
          <AddTaskForm onAdd={addTask} />
          <Controls
            filter={filter}
            onFilterChange={setFilter}
            query={query}
            onQueryChange={setQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <p className="text-sm font-medium text-accent" aria-live="polite">
            {tasksLeft} {tasksLeft === 1 ? 'task' : 'tasks'} left
          </p>
          <TaskList
            tasks={visibleTasks}
            hasAnyTasks={tasks.length > 0}
            onToggle={(id, completed) => updateTask(id, { completed })}
            onRename={(id, title) => updateTask(id, { title })}
            onDelete={deleteTask}
          />
        </div>
      )}

      <UndoToast task={lastDeleted?.task} onUndo={undoDelete} />
    </main>
  )
}
