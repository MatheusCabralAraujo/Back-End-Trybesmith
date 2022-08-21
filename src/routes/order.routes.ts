import express from 'express';
import orderController from '../controller/orderController';

const router = express.Router();
router.get('/', orderController.getAllOrders);

export default router;  