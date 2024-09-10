const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  addTodo,
  updateTodo,
  exportProjectAsGist
} = require('../controllers/projectController');

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/:projectId/todos', addTodo);
router.put('/:projectId/todos/:todoId', updateTodo);
router.post('/:projectId/export', exportProjectAsGist);

module.exports = router;
