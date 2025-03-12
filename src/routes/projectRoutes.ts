import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidation from '../middlewares/projectMiddlewares';


const route = Router();

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



export default route;