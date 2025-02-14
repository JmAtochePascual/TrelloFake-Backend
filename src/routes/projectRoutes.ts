import express from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidation from '../middlewares/projectMiddlewares';
import TaskController from '../controllers/TaskController';
import validateIfProjectExistsById from '../middlewares/project';
import TaskValidation from '../middlewares/taskMiddleware';
import validateIfTaskExistsById from '../middlewares/task';

const route = express.Router();

// Route to create a project
route.post('/',
  ProjectValidation.validateCreateProject,
  ProjectController.createProject);

// Route to get all projects
route.get('/',
  ProjectController.getAllProjects);

// Route to get a project by ID
route.get('/:projectId',
  ProjectValidation.validateGetProjectById,
  validateIfProjectExistsById,
  ProjectController.getProjectById);

// Route to update a project by ID
route.put('/:projectId',
  ProjectValidation.validateUpdateProjectById,
  validateIfProjectExistsById,
  ProjectController.updateProjectById);

// Route to delete a project by ID
route.delete('/:projectId',
  ProjectValidation.validateDeleteProjectById,
  validateIfProjectExistsById,
  ProjectController.deleteProjectById);


//* Routes for tasks **//

// Middleware to validate that a project and task exists
const validateProjectAndTask = [validateIfProjectExistsById, validateIfTaskExistsById];

// Route to create a task
route.post('/:projectId/tasks',
  TaskValidation.validateCreateTask,
  validateIfProjectExistsById,
  TaskController.createTask);

// Route to get all tasks from a project
route.get('/:projectId/tasks',
  TaskValidation.validateGetAllTask,
  validateIfProjectExistsById,
  TaskController.getAllTasks);

// Route to get a task by ID
route.get('/:projectId/tasks/:taskId',
  TaskValidation.validateGetTask,
  ...validateProjectAndTask,
  TaskController.getTask);

// Route to update a task by ID
route.put('/:projectId/tasks/:taskId',
  TaskValidation.validateUpdateTask,
  ...validateProjectAndTask,
  TaskController.updateTask);

// Route to update the status of a task by ID
route.post('/:projectId/tasks/:taskId/status',
  TaskValidation.validateUpdateTaskStatus,
  ...validateProjectAndTask,
  TaskController.updateTaskStatus);

// Delete a ptask by ID 
route.delete('/:projectId/tasks/:taskId',
  TaskValidation.validateDeleteTask,
  ...validateProjectAndTask,
  TaskController.deleteTask);

export default route;