/** @fileoverview Task filter, search, and sort control panel. */

import { FILTERS } from '../utils/taskUtils'

/**
 * Displays task filter, search, and sort controls.
 * @param {{ filter: string, onFilterChange: (value: string) => void, query: string, onQueryChange: (value: string) => void, sortBy: string, onSortChange: (value: string) => void }} props
 * @returns {JSX.Element} The control panel for task management.
 */
export default function Controls({ filter, onFilterChange, query, onQueryChange, sortBy, onSortChange }) {
  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="Filter tasks" className="flex gap-1 rounded-lg bg-ink/5 p-1">
        {FILTERS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={filter === name}
            onClick={() => onFilterChange(name)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === name ? 'bg-surface shadow-sm text-accent' : 'text-ink/70 hover:text-ink'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search tasks
          </label>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by title"
            className="w-full rounded-md border border-ink/20 bg-surface px-3 py-2 text-sm focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort by
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-md border border-ink/20 bg-surface px-3 py-2 text-sm focus:border-accent"
          >
            <option value="none">Added order</option>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  )
}
