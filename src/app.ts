import express from 'express';
import UserRoutes from './routes/user.routes';
import ProductRoutes from './routes/products.routes';
import OrderRoutes from './routes/order.routes';

const app = express();

app.use(express.json());

app.use(ProductRoutes);
app.use(UserRoutes);
app.use(OrderRoutes);

export default app;
