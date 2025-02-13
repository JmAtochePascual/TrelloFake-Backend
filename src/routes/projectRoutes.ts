import express from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidation from '../middlewares/projectMiddlewares';

const route = express.Router();

// Route to create a project
route.post('/', ProjectValidation.validateCreateProject, ProjectController.createProject);

// Route to get all projects
route.get('/', ProjectController.getAllProjects);

export default route;