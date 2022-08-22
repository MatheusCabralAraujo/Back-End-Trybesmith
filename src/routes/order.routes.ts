import { Router } from 'express';
import OrderController from '../controller/orderController';
import OrderMiddleware from '../middlewares/orderValidations';

const router = Router();

const orderController = new OrderController();
const orderMiddleware = new OrderMiddleware();

router.get('/orders', orderController.getAll);

router.post(
  '/orders', 
  orderMiddleware.checkToken,

  orderMiddleware.checkProduct,

  orderController.create,
);

export default router;