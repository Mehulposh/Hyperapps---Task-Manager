/** @fileoverview Validation tests for the add-task form. */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import AddTaskForm from './AddTaskForm'

describe('AddTaskForm', () => {
  it('shows an error and does not add when the title is only spaces', async () => {
    const onAdd = vi.fn()
    render(<AddTaskForm onAdd={onAdd} />)
    await userEvent.type(screen.getByLabelText('Task title'), '   {Enter}')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a task title.')
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('submits a trimmed title with Medium priority by default on Enter', async () => {
    const onAdd = vi.fn()
    render(<AddTaskForm onAdd={onAdd} />)
    await userEvent.type(screen.getByLabelText('Task title'), '  Buy milk  {Enter}')
    expect(onAdd).toHaveBeenCalledWith('Buy milk', 'Medium', '')
  })
})
