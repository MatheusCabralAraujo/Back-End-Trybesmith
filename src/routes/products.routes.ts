import { Router } from 'express';
import ProductsController from '../controller/productController';
import validationProduct from '../middlewares/productMiddleware';

const router = Router();

const productsController = new ProductsController();
const productSlashId = '/products/:id';

router.get('/products', productsController.getAll);
router.get(productSlashId, productsController.getById);
router.post('/products/', validationProduct, productsController.create);
router.put(productSlashId, validationProduct, productsController.update);
router.delete(productSlashId, productsController.remove);

export default router;