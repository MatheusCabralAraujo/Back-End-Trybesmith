import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Order } from '../interfaces/order.interface';
import { User } from '../interfaces/user.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS productsIds FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p ON p.orderId = o.id
      GROUP BY o.id
      ORDER BY o.userId`,
    );
    console.log('ESTE É O RESULTADO NA MODEL:', result);
    const [rows] = result;
    return rows as Order[];
  }

  public async getIdByUsername(username: string): Promise<User[]> {
    const result = await this.connection.execute<ResultSetHeader>(
      'SELECT * FROM Trybesmith.Users WHERE username=?',
      [username],
    );
    const [rows] = result;
    return rows as unknown as User[];
  }

  public async create(userId: number): Promise<number> {  
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return insertId as number;
  }
} 
