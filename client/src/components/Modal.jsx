import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      <div
        className={`card relative w-full ${sizes[size]} animate-scaleIn bg-white dark:bg-[#12121e] p-6 shadow-2xl`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
