import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex items-center justify-center gap-1.5 pt-2">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="btn-ghost h-9 w-9 !px-0"
        aria-label="Previous page"
      >
        <FiChevronLeft size={16} />
      </button>

      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const showEllipsis = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-gray-400">…</span>}
            <button
              onClick={() => onPageChange(p)}
              className={`h-9 w-9 rounded-xl text-sm font-semibold transition-colors ${
                p === page
                  ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10'
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="btn-ghost h-9 w-9 !px-0"
        aria-label="Next page"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  );
}
