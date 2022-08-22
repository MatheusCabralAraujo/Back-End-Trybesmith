import { Request, Response, NextFunction } from 'express';
import OrderService from '../services/orderService';
import validateToken from '../helpers/jwtValidation';

export default class OrderMiddleware {
  constructor(private orderService = new OrderService()) { }

  public checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const isValid = validateToken(token);

    if (isValid === false) return res.status(401).json({ message: 'Invalid token' });

    next();
  };

  public checkProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productsIds } = req.body;

    if (!productsIds) return res.status(400).json({ message: '"productsIds" is required' });

    if (!Array.isArray(productsIds)) {
      return res.status(422).json({ message: '"productsIds" must be an array' });
    }

    const hasError = productsIds.some((element: any) => typeof element !== 'number');

    if (hasError || productsIds.length === 0) {
      return res.status(422).json({ message: '"productsIds" must include only numbers' });
    }

    next();
  };
} 