import { Request, Response } from 'express';
import OrderService from '../services/orderService';
import validateToken from '../helpers/jwtValidation';
import { OrderToken } from '../interfaces/order.interface';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (req: Request, res: Response) => {
    const orders = await this.orderService.getAll();

    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const token = req.headers.authorization || '';
    const { productsIds } = req.body;

    const tokenCheck = validateToken(token);
    if (!tokenCheck) {
      console.log('falhou');
    }

    const order = await this.orderService.create(tokenCheck as unknown as OrderToken, productsIds);

    res.status(201).json(order);
  };
} 