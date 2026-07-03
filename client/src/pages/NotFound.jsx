import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center animate-fadeIn">
      <p className="bg-gradient-to-r from-brand-500 to-brand-400 bg-clip-text text-7xl font-extrabold text-transparent">
        404
      </p>
      <h1 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
      <p className="mt-1 max-w-sm text-sm text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-6">
        <FiHome size={16} /> Back to Dashboard
      </Link>
    </div>
  );
}
