import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Product } from '../interfaces/products.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as Product[];
  }

  public async getById(id: number): Promise<Product> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products WHERE id=?', [id]);
    const [rows] = result;
    const [product] = rows as Product[];
    return product;
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  public update = async (orderId: number, productId: number) => {
    const query = `UPDATE Trybesmith.Products SET orderId = ${orderId} WHERE id = ${productId};`;
    await this.connection.execute(query);
  };

  public async remove(id: number) {
    await this.connection.execute(
      'DELETE Trybesmith.Products books WHERE id=?',
      [id],
    );
  }
}