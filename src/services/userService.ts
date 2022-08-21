import connection from '../models/connection';
import { User } from '../interfaces/user.interface';
import UserModel from '../models/userModel';
import generateToken from '../helpers/jwtGenerator';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAll(): Promise<User[]> {
    const user = await this.model.getAll();
    return user;
  }

  public async getById(id: number): Promise<User> {
    const user = await this.model.getById(id);
    return user;
  }

  public async create(user: User): Promise<string> {
    await this.model.create(user);
    const token = generateToken(user);
    return token;
  }

  public async update(id: number, user: User): Promise<void> {
    return this.model.update(id, user);
  }

  public async remove(id: number): Promise<void> {
    this.model.remove(id);
  }
}

export default UserService;