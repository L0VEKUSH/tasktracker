import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ title = 'No Tasks Found', message = 'Try adjusting your filters or create a new task to get started.', action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 dark:border-white/10 py-20 text-center animate-fadeIn">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-500/10 dark:to-brand-400/5">
        <FiInbox size={34} className="text-brand-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-400">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
