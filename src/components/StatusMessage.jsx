/** @fileoverview Loading and error UI states for task loading. */

/**
 * Loading indicator shown while task data is being fetched.
 * @returns {JSX.Element} A spinner and loading message.
 */
export function Loader() {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-ink/70">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      Loading tasks…
    </div>
  )
}

/**
 * Error state that invites the user to retry loading tasks.
 * @param {{ onRetry: () => void }} props
 * @returns {JSX.Element} The retry panel displayed after a fetch failure.
 */
export function ErrorMessage({ onRetry }) {
  return (
    <div role="alert" className="rounded-lg border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950 p-6 text-center">
      <p className="font-semibold text-red-800 dark:text-red-200">Couldn’t load your tasks.</p>
      <p className="mt-1 text-sm text-red-700 dark:text-red-300">Check your connection and try again.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
      >
        Retry
      </button>
    </div>
  )
}
