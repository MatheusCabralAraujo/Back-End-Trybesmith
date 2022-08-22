import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userService';
import Login from '../interfaces/login.interface';

class UserController {
  constructor(private userService = new UserService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(StatusCodes.OK).json(users);
  };

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = await this.userService.getById(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found!' });
    }

    res.status(StatusCodes.OK).json(user);
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const token = await this.userService.create(user);
    res.status(StatusCodes.CREATED).json({ token });
  };

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = req.body;
    await this.userService.update(id, user);

    res.status(StatusCodes.NO_CONTENT).end();
  };

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.userService.remove(id);

    res.status(StatusCodes.OK).json({ message: 'User deleted successfully' });
  };

  public checkUser = async (req: Request, res: Response) => {
    const login = req.body;
    const { username, password } = login;

    if (!username) return res.status(400).json({ message: '"username" is required' });

    if (!password) return res.status(400).json({ message: '"password" is required' });

    const token = await this.userService.checkUser(login as Login);

    if (token === '') return res.status(401).json({ message: 'Username or password invalid' });

    return res.status(200).json({ token });
  };
}

export default UserController;