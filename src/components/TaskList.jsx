/** @fileoverview Task list wrapper and empty-state rendering. */

import TaskItem from './TaskItem'

/**
 * Lists tasks or shows a helpful empty-state message.
 * @param {{ tasks: Array<Object>, hasAnyTasks: boolean, onToggle: (id: number, completed: boolean) => void, onRename: (id: number, title: string) => void, onDelete: (id: number) => void }} props
 * @returns {JSX.Element} The task list or empty state UI.
 */
export default function TaskList({ tasks, hasAnyTasks, onToggle, onRename, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-ink/20 py-10 text-center text-ink/70">
        {hasAnyTasks ? 'No tasks match your filter or search.' : 'No tasks yet. Add your first one above.'}
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onRename={onRename} onDelete={onDelete} />
      ))}
    </ul>
  )
}
