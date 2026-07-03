import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiList, FiCheckCircle, FiClock, FiAlertTriangle, FiPlus, FiArrowRight } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EmptyState from '../components/EmptyState';
import { SkeletonStatCard, SkeletonTaskCard } from '../components/Skeleton';
import Button from '../components/Button';
import { taskService } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, tasksRes] = await Promise.all([
        taskService.getStats(),
        taskService.getAll({ sort: 'newest', limit: 6, page: 1 }),
      ]);
      setStats(statsRes.data);
      setRecentTasks(tasksRes.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (data) => {
    setSubmitting(true);
    try {
      await taskService.create(data);
      toast.success('Task created successfully');
      setFormOpen(false);
      loadData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data) => {
    setSubmitting(true);
    try {
      await taskService.update(editingTask._id, data);
      toast.success('Task updated successfully');
      setFormOpen(false);
      setEditingTask(null);
      loadData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await taskService.remove(deleteTarget._id);
      toast.success('Task deleted successfully');
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-400">Here's an overview of your tasks.</p>
        </div>
        <Button icon={FiPlus} onClick={() => { setEditingTask(null); setFormOpen(true); }}>
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading || !stats ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)
        ) : (
          <>
            <StatCard label="Total Tasks" value={stats.total} icon={FiList} gradient="bg-gradient-to-br from-brand-500 to-brand-400" />
            <StatCard label="Completed" value={stats.completed} icon={FiCheckCircle} gradient="bg-gradient-to-br from-emerald-500 to-emerald-400" />
            <StatCard label="Pending" value={stats.pending} icon={FiClock} gradient="bg-gradient-to-br from-amber-500 to-amber-400" />
            <StatCard label="High Priority" value={stats.highPriority} icon={FiAlertTriangle} gradient="bg-gradient-to-br from-rose-500 to-rose-400" />
          </>
        )}
      </div>

      <div className="card p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300">Overall Progress</h3>
          <span className="text-sm font-bold text-brand-500">{stats?.progress ?? 0}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-700"
            style={{ width: `${stats?.progress ?? 0}%` }}
          />
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Tasks</h3>
          <Link to="/tasks" className="flex items-center gap-1 text-sm font-semibold text-brand-500 hover:text-brand-600">
            View all <FiArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonTaskCard key={i} />)}
          </div>
        ) : recentTasks.length === 0 ? (
          <EmptyState
            action={<Button icon={FiPlus} onClick={() => setFormOpen(true)}>Create Your First Task</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => { setEditingTask(t); setFormOpen(true); }}
                onDelete={(t) => setDeleteTarget(t)}
              />
            ))}
          </div>
        )}
      </div>

      <TaskFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingTask(null); }}
        onSubmit={editingTask ? handleUpdate : handleCreate}
        initialData={editingTask}
        loading={submitting}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        taskTitle={deleteTarget?.title}
        loading={deleting}
      />
    </div>
  );
}
