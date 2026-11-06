/** @fileoverview Task lifecycle state and persistence hooks. */

import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'task-manager.tasks'
const UNDO_MS = 5000

function readStoredTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Manage task state, persistence, and undo operations.
 * @returns {{ tasks: Array<Object>, status: 'loading' | 'error' | 'ready', retry: () => void, addTask: (title: string, priority: string, dueDate?: string) => void, updateTask: (id: number, changes: Partial<Object>) => void, deleteTask: (id: number) => void, lastDeleted: { task: Object, index: number } | null, undoDelete: () => void }} The task list state and callbacks used by the app.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'ready'
  const [attempt, setAttempt] = useState(0)
  const [lastDeleted, setLastDeleted] = useState(null) // { task, index }
  const undoTimer = useRef(null)

  useEffect(() => () => clearTimeout(undoTimer.current), [])

  // Load from localStorage if present, otherwise fetch the starter file.
  useEffect(() => {
    const stored = readStoredTasks()
    if (stored) {
      setTasks(stored)
      setStatus('ready')
      return
    }

    let cancelled = false
    setStatus('loading')
    fetch('/tasks.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setTasks(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  // Save every change once the initial load has finished.
  useEffect(() => {
    if (status !== 'ready') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // Storage may be full or blocked; the app keeps working in memory.
    }
  }, [tasks, status])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  const addTask = useCallback((title, priority, dueDate) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title, priority, dueDate: dueDate || null, completed: false },
    ])
  }, [])

  const updateTask = useCallback((id, changes) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...changes } : task)))
  }, [])

  const deleteTask = useCallback(
    (id) => {
      const index = tasks.findIndex((task) => task.id === id)
      if (index === -1) return
      setLastDeleted({ task: tasks[index], index })
      setTasks((prev) => prev.filter((task) => task.id !== id))
      clearTimeout(undoTimer.current)
      undoTimer.current = setTimeout(() => setLastDeleted(null), UNDO_MS)
    },
    [tasks],
  )

  const undoDelete = useCallback(() => {
    if (!lastDeleted) return
    clearTimeout(undoTimer.current)
    setTasks((prev) => {
      const next = [...prev]
      next.splice(Math.min(lastDeleted.index, next.length), 0, lastDeleted.task)
      return next
    })
    setLastDeleted(null)
  }, [lastDeleted])

  return { tasks, status, retry, addTask, updateTask, deleteTask, lastDeleted, undoDelete }
}
