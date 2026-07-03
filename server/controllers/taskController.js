const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// @desc    Get all tasks (search, filter, sort, paginate) + dashboard stats
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const {
    search = '',
    status,
    priority,
    sort = 'newest',
    page = 1,
    limit = 10,
  } = req.query;

  const query = { user: req.user.id };

  if (search.trim()) {
    query.title = { $regex: search.trim(), $options: 'i' };
  }
  if (status) query.status = status;
  if (priority) query.priority = priority;

  const sortMap = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    dueDate: { dueDate: 1 },
    priority: { priority: 1 }, // High/Low/Medium alpha; refined client-side if needed
  };
  const sortOption = sortMap[sort] || sortMap.newest;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sortOption).skip(skip).limit(limitNum),
    Task.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count: tasks.length,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    data: tasks,
  });
});

// @desc    Get dashboard statistics
// @route   GET /api/tasks/stats
// @access  Private
const getStats = asyncHandler(async (req, res) => {
  const [total, completed, pending, inProgress, highPriority] = await Promise.all([
    Task.countDocuments({ user: req.user.id }),
    Task.countDocuments({ user: req.user.id, status: 'Completed' }),
    Task.countDocuments({ user: req.user.id, status: 'Pending' }),
    Task.countDocuments({ user: req.user.id, status: 'In Progress' }),
    Task.countDocuments({ user: req.user.id, priority: 'High' }),
  ]);

  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  res.status(200).json({
    success: true,
    data: { total, completed, pending, inProgress, highPriority, progress },
  });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) throw new ApiError(404, 'Task not found');
  res.status(200).json({ success: true, data: task });
});

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    user: req.user.id,
  });
  res.status(201).json({ success: true, message: 'Task created successfully', data: task });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) throw new ApiError(404, 'Task not found');
  res.status(200).json({ success: true, message: 'Task updated successfully', data: task });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) throw new ApiError(404, 'Task not found');
  res.status(200).json({ success: true, message: 'Task deleted successfully', data: task });
});

module.exports = { getTasks, getStats, getTaskById, createTask, updateTask, deleteTask };
