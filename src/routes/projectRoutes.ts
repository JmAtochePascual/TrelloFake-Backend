import express from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidation from '../middlewares/projectMiddlewares';

const route = express.Router();

// Route to create a project
route.post('/', ProjectValidation.validateCreateProject, ProjectController.createProject);

export default route;