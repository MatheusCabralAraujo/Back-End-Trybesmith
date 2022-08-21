import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }
  
  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users');
    const [rows] = result;
    return rows as User[];
  }

  public async getById(id: number): Promise<User> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users WHERE id=?', [id]);
    const [rows] = result;
    const [user] = rows as User[];
    return user;
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }

  public async update(id: number, user: User) {
    const { username, classe, level, password } = user;
    await this.connection.execute(
      'UPDATE Trybesmith.Users SET username=?, classe=?, level=?, password=? WHERE id=?',
      [username, classe, level, password, id],
    );
  }

  public async remove(id: number) {
    await this.connection.execute(
      'DELETE Trybesmith.Users books WHERE id=?',
      [id],
    );
  }
}