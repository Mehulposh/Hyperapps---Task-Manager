/** @fileoverview Undo toast shown after deleting a task. */

/**
 * Small confirmation banner that allows the user to restore a deleted task.
 * @param {{ task: { title: string } | null, onUndo: () => void }} props
 * @returns {JSX.Element | null} The undo toast when a task was recently deleted.
 */
export default function UndoToast({ task, onUndo }) {
  if (!task) return null
  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 mx-auto flex max-w-md items-center justify-between gap-4 rounded-lg bg-ink px-4 py-3 text-sm text-paper shadow-lg"
    >
      <span className="min-w-0 truncate">Deleted “{task.title}”</span>
      <button type="button" onClick={onUndo} className="shrink-0 font-semibold underline">
        Undo
      </button>
    </div>
  )
}
