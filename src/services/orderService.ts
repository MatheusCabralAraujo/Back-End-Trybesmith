import orderModel from '../models/orderModel';
import { Order } from '../interfaces/order.interface';

const getAllOrders = async (): Promise<Order[]> => {
  const orders = await orderModel
    .getAllOrders();
  return orders as Order[];
}; 

export default { getAllOrders };