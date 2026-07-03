import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Button from './Button';
import { Input, Textarea, Select } from './Input';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants';

const toInputDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export default function TaskFormModal({ isOpen, onClose, onSubmit, initialData, loading }) {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: 'Pending',
      priority: 'Medium',
      dueDate: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        initialData
          ? { ...initialData, dueDate: toInputDate(initialData.dueDate) }
          : { title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' }
      );
    }
  }, [isOpen, initialData, reset]);

  const submitHandler = (data) => onSubmit(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Task' : 'Create New Task'}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4" noValidate>
        <Input
          label="Title"
          placeholder="e.g. Design landing page hero section"
          error={errors.title?.message}
          {...register('title', {
            required: 'Title is required',
            maxLength: { value: 120, message: 'Title cannot exceed 120 characters' },
          })}
        />

        <Textarea
          label="Description"
          placeholder="Add more details about this task…"
          error={errors.description?.message}
          {...register('description', {
            required: 'Description is required',
            maxLength: { value: 2000, message: 'Description cannot exceed 2000 characters' },
          })}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            error={errors.status?.message}
            {...register('status', { required: true })}
          />
          <Select
            label="Priority"
            options={PRIORITY_OPTIONS}
            error={errors.priority?.message}
            {...register('priority', { required: true })}
          />
        </div>

        <Input
          type="date"
          label="Due Date"
          error={errors.dueDate?.message}
          {...register('dueDate', { required: 'Due date is required' })}
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1" loading={loading}>
            {isEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
