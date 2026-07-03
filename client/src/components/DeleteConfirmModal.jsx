import Modal from './Modal';
import Button from './Button';
import { FiAlertTriangle } from 'react-icons/fi';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task" size="sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/10">
          <FiAlertTriangle size={26} className="text-rose-500" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            "{taskTitle}"
          </span>
          ? This action cannot be undone.
        </p>
        <div className="mt-6 flex w-full gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm} loading={loading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
