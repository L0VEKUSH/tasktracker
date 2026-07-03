export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];
export const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];

export const STATUS_STYLES = {
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300',
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
};

export const PRIORITY_STYLES = {
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  Low: 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300',
};
