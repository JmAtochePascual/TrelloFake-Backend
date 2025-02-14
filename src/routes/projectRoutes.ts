import express from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidation from '../middlewares/projectMiddlewares';
import TaskController from '../controllers/TaskController';
import { validateProjectExists } from '../middlewares/project';
import TaskValidation from '../middlewares/taskMiddleware';

const route = express.Router();

// Route to create a project
route.post('/', ProjectValidation.validateCreateProject, ProjectController.createProject);

// Route to get all projects
route.get('/', ProjectController.getAllProjects);

// Route to get a project by ID
route.get('/:id', ProjectValidation.validateGetProjectById, ProjectController.getProjectById);

// Route to update a project by ID
route.put('/:id', ProjectValidation.validateUpdateProject, ProjectController.updateProject);

// Route to delete a project by ID
route.delete('/:id', ProjectValidation.validateDeleteProject, ProjectController.deleteProject);


//* Routes for tasks **//

// Middleware to validate if the project exists
route.param('projectId', validateProjectExists);

// Route to create a task
route.post('/:projectId/tasks', TaskValidation.validateCreateTask, TaskController.createTask);

// Route to get all tasks from a project
route.get('/:projectId/tasks', TaskController.getAllTasks);

// Route to get a task by ID
route.get('/:projectId/tasks/:taskId', TaskValidation.validateGetTaskById, TaskController.getTaskById);

// Route to update a task by ID
route.put('/:projectId/tasks/:taskId', TaskValidation.validateUpdateTask, TaskController.updateTask);

export default route;