import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import TaskCard from '../components/TaskCard';
import TaskToolbar from '../components/TaskToolbar';
import TaskFormModal from '../components/TaskFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import { SkeletonGrid } from '../components/Skeleton';
import Button from '../components/Button';
import FloatingActionButton from '../components/FloatingActionButton';
import useDebounce from '../hooks/useDebounce';
import { taskService } from '../services/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sort, setSort] = useState('newest');
  const debouncedSearch = useDebounce(search, 400);

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await taskService.getAll({
        search: debouncedSearch,
        status,
        priority,
        sort,
        page,
        limit: 9,
      });
      setTasks(res.data);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, priority, sort, page]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, priority, sort]);

  const handleCreate = async (data) => {
    setSubmitting(true);
    try {
      await taskService.create(data);
      toast.success('Task created successfully');
      setFormOpen(false);
      loadTasks();
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
      loadTasks();
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
      loadTasks();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="animate-fadeIn space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">All Tasks</h1>
          <p className="text-sm text-gray-400">Manage, filter, and track every task in one place.</p>
        </div>
        <Button icon={FiPlus} onClick={() => { setEditingTask(null); setFormOpen(true); }}>
          New Task
        </Button>
      </div>

      <TaskToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        sort={sort}
        onSortChange={setSort}
      />

      {loading ? (
        <SkeletonGrid count={9} />
      ) : tasks.length === 0 ? (
        <EmptyState
          action={<Button icon={FiPlus} onClick={() => setFormOpen(true)}>Create a Task</Button>}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => { setEditingTask(t); setFormOpen(true); }}
                onDelete={(t) => setDeleteTarget(t)}
              />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

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

      <FloatingActionButton onClick={() => { setEditingTask(null); setFormOpen(true); }} />
    </div>
  );
}
