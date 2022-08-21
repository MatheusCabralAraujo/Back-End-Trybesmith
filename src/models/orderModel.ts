import { RowDataPacket } from 'mysql2';
import { Order, OrderWithourProductsIds } from '../interfaces/order.interface';
import { ProductIds } from '../interfaces/products.interface';
import connection from './connection';

const getAllOrders = async (): Promise<Order[]> => {
  const q = `
  SELECT orders.id, orders.userId
  FROM Trybesmith.Products as products
  INNER JOIN Trybesmith.Orders as orders
  ON orders.id = products.orderId
  GROUP BY orders.id
  ORDER BY orders.userId
  `;
  const [table] = await connection
    .execute(q) as RowDataPacket[];
  const orders = Promise.all(table.map(async ({ id, userId }: OrderWithourProductsIds) => {
    const [product] = await connection
      .execute(`
    SELECT Trybesmith.Products.id FROM Trybesmith.Products WHERE orderId = ?
    `, [id]) as RowDataPacket[];
    return { id, userId, productsIds: product.map((p: ProductIds) => p.id) };
  })) as Promise<Order[]>;
  return orders;
}; 

export default { getAllOrders };