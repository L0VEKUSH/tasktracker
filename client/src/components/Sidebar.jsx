import { NavLink } from 'react-router-dom';
import { FiGrid, FiList, FiX } from 'react-icons/fi';

const links = [
  { to: '/', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/tasks', label: 'All Tasks', icon: FiList, end: false },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-100 dark:border-white/5 bg-white dark:bg-surface-dark p-4 transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <span className="text-sm font-semibold text-gray-400">Menu</span>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10">
            <FiX size={18} />
          </button>
        </div>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
