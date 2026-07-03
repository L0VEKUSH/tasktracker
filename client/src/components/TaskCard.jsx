import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import { STATUS_STYLES, PRIORITY_STYLES } from '../utils/constants';
import { formatDate, isOverdue } from '../utils/formatDate';

export default function TaskCard({ task, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="card card-hover flex flex-col p-5 animate-fadeIn">
      <div className="mb-2 flex items-start justify-between gap-2">
        <Link
          to={`/tasks/${task._id}`}
          className="line-clamp-1 text-base font-bold text-gray-900 hover:text-brand-500 dark:text-gray-50 dark:hover:text-brand-300"
        >
          {task.title}
        </Link>
        <span className={`badge shrink-0 ${PRIORITY_STYLES[task.priority]}`}>{task.priority}</span>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
        {task.description}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`badge ${STATUS_STYLES[task.status]}`}>{task.status}</span>
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              overdue ? 'text-rose-500' : 'text-gray-400'
            }`}
          >
            {overdue ? <FiAlertCircle size={13} /> : <FiCalendar size={13} />}
            {formatDate(task.dueDate)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-gray-400 hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-white/10"
            aria-label="Edit task"
          >
            <FiEdit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="rounded-lg p-2 text-gray-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-white/10"
            aria-label="Delete task"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
