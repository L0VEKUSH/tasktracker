import { FiPlus } from 'react-icons/fi';

export default function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-glow transition-transform hover:scale-110 active:scale-95 lg:hidden"
      aria-label="Create new task"
    >
      <FiPlus size={26} />
    </button>
  );
}
