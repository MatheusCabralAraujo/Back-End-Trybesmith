import { Router } from 'express';
import UserController from '../controller/userController';
import validationUser from '../middlewares/userValidations';

const router = Router();

const usersController = new UserController();
const userSlashId = '/users/:id';

router.get('/products', usersController.getAll);
router.get(userSlashId, usersController.getById);
router.post('/products/', validationUser, usersController.create);
router.put(userSlashId, validationUser, usersController.update);
router.delete(userSlashId, usersController.remove);

export default router;