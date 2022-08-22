import { Router } from 'express';
import ProductsController from '../controller/productController';
import ProductMiddleware from '../middlewares/productValidations';
 
const router = Router();

const productsController = new ProductsController();
const productMiddleware = new ProductMiddleware();
const productSlashId = '/products/:id';

router.get('/products', productsController.getAll);
router.get(productSlashId, productsController.getById);
router.post(
  '/products/', 
  productMiddleware.verifyName,

  productMiddleware.verifyAmount,

  productsController.create,
);
router.put(productSlashId, productsController.update);
router.delete(productSlashId, productsController.remove);

export default router;