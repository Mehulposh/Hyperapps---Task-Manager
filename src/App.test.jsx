/** @fileoverview App integration tests for task loading and undo behavior. */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const starter = [
  { id: 1, title: 'Set up project repo', priority: 'High', dueDate: '2026-01-10', completed: true },
  { id: 2, title: 'Design login screen', priority: 'Medium', dueDate: '2027-03-12', completed: false },
]

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(starter) })))
  vi.spyOn(window, 'confirm').mockReturnValue(true)
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('loads the starter tasks and shows the counter', async () => {
    render(<App />)
    expect(await screen.findByText('Design login screen')).toBeInTheDocument()
    expect(screen.getByText('1 task left')).toBeInTheDocument()
  })

  it('shows an error with Retry when the fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('offline'))
    render(<App />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Couldn’t load your tasks.')
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(await screen.findByText('Design login screen')).toBeInTheDocument()
  })

  it('restores a deleted task when Undo is clicked', async () => {
    render(<App />)
    await screen.findByText('Design login screen')
    await userEvent.click(screen.getByRole('button', { name: /Delete “Design login screen”/ }))
    expect(screen.queryByRole('button', { name: 'Design login screen' })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Undo' }))
    expect(screen.getByText('Design login screen')).toBeInTheDocument()
  })
})
