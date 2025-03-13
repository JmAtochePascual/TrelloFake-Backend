import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidation from '../middlewares/projectMiddleware';
import TaskValidation from '../middlewares/taskMiddleware';
import TaskController from '../controllers/TaskController';


const route = Router();

// * Routers for projects

// Route to create a project
route.post('/',
  ProjectValidation.createProject,
  ProjectController.createProject);

// Route to get all projects
route.get('/',
  ProjectController.getProjects);

// Route to get a project by ID
route.get('/:projectId',
  ProjectValidation.getProject,
  ProjectController.getProject);

// Route to update a project
route.put('/:projectId',
  ProjectValidation.updateProject,
  ProjectController.updateProject);

// Route to delete a project
route.delete('/:projectId',
  ProjectValidation.deleteProject,
  ProjectController.deleteProject);


// * Routers for Tasks

route.param('projectId', ProjectValidation.projectExists);
route.param('taskId', TaskValidation.taskExists);

// Create a task
route.post('/:projectId/tasks',
  TaskValidation.createTask,
  TaskController.createTask);


// Get all tasks of a project
route.get('/:projectId/tasks',
  TaskValidation.getAllTask,
  TaskController.getAllTasks);


// Get a task by ID
route.get('/:projectId/tasks/:taskId',
  TaskValidation.getTask,
  TaskController.getTask);

// Update a task
route.put('/:projectId/tasks/:taskId',
  TaskValidation.updateTask,
  TaskController.updateTask);

// Update a status of a task
route.post('/:projectId/tasks/:taskId/status',
  TaskValidation.updateStatus,
  TaskController.updateStatus);

// Delete a task
route.delete('/:projectId/tasks/:taskId',
  TaskValidation.deleteTask,
  TaskController.deleteTask);


export default route;