/** @fileoverview Unit tests for task utility helpers. */

import { describe, expect, it } from 'vitest'
import { countActive, filterTasks, isOverdue, sortTasks } from './taskUtils'

const starter = [
  { id: 1, title: 'Set up project repo', priority: 'High', dueDate: '2026-01-10', completed: true },
  { id: 2, title: 'Design login screen', priority: 'Medium', dueDate: '2027-03-12', completed: false },
  { id: 3, title: 'Write API docs', priority: 'Low', dueDate: '2027-04-20', completed: false },
  { id: 4, title: 'Fix checkout bug', priority: 'High', dueDate: '2026-01-15', completed: false },
  { id: 5, title: 'Plan team outing', priority: 'Low', dueDate: null, completed: true },
]
const titles = (tasks) => tasks.map((t) => t.title)

describe('filterTasks', () => {
  it('returns everything for All with an empty search', () => {
    expect(filterTasks(starter, 'All', '')).toHaveLength(5)
  })
  it('returns only incomplete tasks for Active', () => {
    expect(titles(filterTasks(starter, 'Active', ''))).toEqual([
      'Design login screen',
      'Write API docs',
      'Fix checkout bug',
    ])
  })
  it('returns only completed tasks for Completed', () => {
    expect(filterTasks(starter, 'Completed', '').map((t) => t.id)).toEqual([1, 5])
  })
  it('searches case-insensitively', () => {
    expect(titles(filterTasks(starter, 'All', 'API'))).toEqual(['Write API docs'])
    expect(titles(filterTasks(starter, 'All', 'api'))).toEqual(['Write API docs'])
  })
  it('combines the tab and the search', () => {
    expect(filterTasks(starter, 'Completed', 'api')).toEqual([])
    expect(titles(filterTasks(starter, 'Active', 'fix'))).toEqual(['Fix checkout bug'])
  })
})

describe('sortTasks', () => {
  it('sorts by due date, soonest first, no date last', () => {
    expect(titles(sortTasks(starter, 'dueDate'))).toEqual([
      'Set up project repo',
      'Fix checkout bug',
      'Design login screen',
      'Write API docs',
      'Plan team outing',
    ])
  })
  it('sorts by priority, High first, keeping ties in order', () => {
    expect(titles(sortTasks(starter, 'priority'))).toEqual([
      'Set up project repo',
      'Fix checkout bug',
      'Design login screen',
      'Write API docs',
      'Plan team outing',
    ])
  })
  it('does not mutate the original array', () => {
    const copy = [...starter]
    sortTasks(starter, 'dueDate')
    expect(starter).toEqual(copy)
  })
  it('keeps the original order when no sort is chosen', () => {
    expect(sortTasks(starter, 'none')).toEqual(starter)
  })
})

describe('isOverdue and countActive', () => {
  it('flags only incomplete tasks past their due date', () => {
    const overdue = starter.filter((t) => isOverdue(t, '2026-11-06'))
    expect(titles(overdue)).toEqual(['Fix checkout bug'])
  })
  it('does not flag a task due today', () => {
    expect(isOverdue(starter[3], '2026-01-15')).toBe(false)
  })
  it('counts active tasks', () => {
    expect(countActive(starter)).toBe(3)
  })
})
