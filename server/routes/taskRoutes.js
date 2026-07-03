const express = require('express');
const router = express.Router();
const {
  getTasks,
  getStats,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const {
  validate,
  taskIdRules,
  createTaskRules,
  updateTaskRules,
} = require('../validators/taskValidator');

const { protect } = require('../middlewares/authMiddleware');

// Stats must be registered before /:id so "stats" isn't parsed as an id
router.get('/stats', protect, getStats);

router.route('/').get(protect, getTasks).post(protect, createTaskRules, validate, createTask);

router
  .route('/:id')
  .get(protect, taskIdRules, validate, getTaskById)
  .put(protect, updateTaskRules, validate, updateTask)
  .delete(protect, taskIdRules, validate, deleteTask);

module.exports = router;
