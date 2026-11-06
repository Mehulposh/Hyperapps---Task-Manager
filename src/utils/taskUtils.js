/** @fileoverview Shared task utilities for filtering, sorting, and date formatting. */

export const PRIORITIES = ['Low', 'Medium', 'High']
export const FILTERS = ['All', 'Active', 'Completed']

const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 }

// Local date as YYYY-MM-DD, so it compares correctly with <input type="date"> values.
/**
 * Build a date string in the local format expected by date inputs.
 * @returns {string} Today's date formatted as YYYY-MM-DD.
 */
export function todayString() {
  return new Date().toLocaleDateString('en-CA')
}

/**
 * Check whether a task is past due and still incomplete.
 * @param {{ completed: boolean, dueDate: string | null }} task
 * @param {string} [today=todayString()]
 * @returns {boolean} True when the task is overdue.
 */
export function isOverdue(task, today = todayString()) {
  return !task.completed && task.dueDate !== null && task.dueDate < today
}

/**
 * Filter a task list by view tab and user-provided search text.
 * @param {Array<Object>} tasks
 * @param {'All' | 'Active' | 'Completed'} filter
 * @param {string} query
 * @returns {Array<Object>} Matching tasks.
 */
export function filterTasks(tasks, filter, query) {
  const q = query.trim().toLowerCase()
  return tasks.filter((task) => {
    if (filter === 'Active' && task.completed) return false
    if (filter === 'Completed' && !task.completed) return false
    return task.title.toLowerCase().includes(q)
  })
}

// Returns a new array. Array.prototype.sort is stable, so ties keep their order.
/**
 * Create a sorted copy of the task list without mutating the original array.
 * @param {Array<Object>} tasks
 * @param {'none' | 'dueDate' | 'priority'} sortBy
 * @returns {Array<Object>} Sorted tasks.
 */
export function sortTasks(tasks, sortBy) {
  const sorted = [...tasks]
  if (sortBy === 'dueDate') {
    sorted.sort((a, b) => {
      if (a.dueDate === b.dueDate) return 0
      if (a.dueDate === null) return 1
      if (b.dueDate === null) return -1
      return a.dueDate < b.dueDate ? -1 : 1
    })
  } else if (sortBy === 'priority') {
    sorted.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])
  }
  return sorted
}

/**
 * Count uncompleted tasks in the list.
 * @param {Array<Object>} tasks
 * @returns {number} Number of active tasks.
 */
export function countActive(tasks) {
  return tasks.filter((task) => !task.completed).length
}

/**
 * Render a human-readable date label from a YYYY-MM-DD value.
 * @param {string} dateString
 * @returns {string} A formatted date string such as 'Jan 5, 2026'.
 */
export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
