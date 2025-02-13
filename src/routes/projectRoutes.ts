import express from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidation from '../middlewares/projectMiddlewares';

const route = express.Router();

// Route to create a project
route.post('/', ProjectValidation.validateCreateProject, ProjectController.createProject);

// Route to get all projects
route.get('/', ProjectController.getAllProjects);

// Route to get a project by id
route.get('/:id', ProjectValidation.validateGetProjectById, ProjectController.getProjectById);

// Route to update a project by ID
route.put('/:id', ProjectValidation.validateUpdateProject, ProjectController.updateProject);

export default route;