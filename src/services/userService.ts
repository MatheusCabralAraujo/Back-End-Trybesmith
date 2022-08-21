import connection from '../models/connection';
import User from '../interfaces/user.interface';
import UserModel from '../models/userModel';

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

  public create(user: User): Promise<User> {
    return this.model.create(user);
  }

  public async update(id: number, user: User): Promise<void> {
    return this.model.update(id, user);
  }

  public async remove(id: number): Promise<void> {
    this.model.remove(id);
  }
}

export default UserService;