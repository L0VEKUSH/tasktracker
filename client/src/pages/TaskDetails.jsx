import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiEdit2, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Button from '../components/Button';
import TaskFormModal from '../components/TaskFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { STATUS_STYLES, PRIORITY_STYLES } from '../utils/constants';
import { formatDate } from '../utils/formatDate';
import { taskService } from '../services/api';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadTask = async () => {
    setLoading(true);
    try {
      const res = await taskService.getById(id);
      setTask(res.data);
    } catch (err) {
      toast.error(err.message);
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdate = async (data) => {
    setSubmitting(true);
    try {
      const res = await taskService.update(id, data);
      setTask(res.data);
      toast.success('Task updated successfully');
      setFormOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await taskService.remove(id);
      toast.success('Task deleted successfully');
      navigate('/tasks');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader full />;
  if (!task) return null;

  return (
    <div className="animate-fadeIn mx-auto max-w-3xl space-y-5">
      <Link to="/tasks" className="flex w-fit items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-500">
        <FiArrowLeft size={15} /> Back to Tasks
      </Link>

      <Card className="p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`badge ${STATUS_STYLES[task.status]}`}>{task.status}</span>
            <span className={`badge ${PRIORITY_STYLES[task.priority]}`}>{task.priority} Priority</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" icon={FiEdit2} onClick={() => setFormOpen(true)}>
              Edit
            </Button>
            <Button variant="danger" icon={FiTrash2} onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-extrabold text-gray-900 dark:text-white">{task.title}</h1>
        <p className="mb-6 whitespace-pre-wrap text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {task.description}
        </p>

        <div className="grid grid-cols-1 gap-4 border-t border-gray-100 dark:border-white/10 pt-5 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
              <FiCalendar size={17} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Due Date</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{formatDate(task.dueDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
              <FiClock size={17} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Created</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{formatDate(task.createdAt)}</p>
            </div>
          </div>
        </div>
      </Card>

      <TaskFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleUpdate}
        initialData={task}
        loading={submitting}
      />

      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        taskTitle={task.title}
        loading={deleting}
      />
    </div>
  );
}
