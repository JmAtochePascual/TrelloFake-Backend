import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import ProjectValidation from '../middlewares/projectMiddleware';
import TaskValidation from '../middlewares/taskMiddleware';
import TaskController from '../controllers/TaskController';
import UserValidation from '../middlewares/userMiddleware';
import TeamController from '../controllers/TeamController';
import TeamValidation from '../middlewares/teamMiddleware';
import NoteValidation from '../middlewares/noteMiddleware';
import NoteController from '../controllers/NoteController';


const route = Router();

// * Routers for projects
// Middleware to authenticate the user
route.use(UserValidation.authenticatedUser);

// Route to create a project
route.post('/',
  ProjectValidation.createProject,
  ProjectController.createProject);

// Route to get all projects
route.get('/',
  ProjectController.getProjects);

// Route to get a project by ID
route.get('/:projectId',
  UserValidation.authenticatedUser,
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

// Middleware to validate the project and the task
route.param('projectId', ProjectValidation.projectExists);
route.param('taskId', TaskValidation.taskExists);

// Create a task
route.post('/:projectId/tasks',
  TaskValidation.hasAuhtorization,
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
  TaskValidation.hasAuhtorization,
  TaskValidation.updateTask,
  TaskController.updateTask);

// Update a status of a task
route.post('/:projectId/tasks/:taskId/status',
  TaskValidation.updateStatus,
  TaskController.updateStatus);

// Delete a task
route.delete('/:projectId/tasks/:taskId',
  TaskValidation.hasAuhtorization,
  TaskValidation.deleteTask,
  TaskController.deleteTask);

// * Routers for Team

// Find a user by email
route.post('/:projectId/team/find',
  TeamValidation.findMenberByEmail,
  TeamController.findMenberByEmail
);

// Add a member to the team
route.post('/:projectId/team',
  TeamValidation.addMemberToTeam,
  TeamController.addMemberToTeam
);

// Get all members of the team
route.get('/:projectId/team',
  TeamController.getTeam
);

// Delete a member from the team
route.delete('/:projectId/team/:memberId',
  TeamValidation.removeMemberFromTeam,
  TeamController.removeMemberFromTeam
);

// * Routes for Notes

route.post('/:projectId/tasks/:taskId/notes',
  NoteValidation.createNote,
  NoteController.createNote
);

export default route;