import { Router } from 'express';
import UserController from '../controller/userController';
import UserMiddleware from '../middlewares/userValidations';

const router = Router();

const usersController = new UserController();
const userMiddleware = new UserMiddleware();
const userSlashId = '/users/:id';

router.get('/users', usersController.getAll);
router.get(userSlashId, usersController.getById);
router.post(
  '/users/', 
  userMiddleware.verifyClasse,
  userMiddleware.verifyLevel,
  userMiddleware.verifyPassword, 
  userMiddleware.verifyUsername, 
  usersController.create,
);
router.delete(userSlashId, usersController.remove);

export default router;