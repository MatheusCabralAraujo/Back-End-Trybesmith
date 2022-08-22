import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/productService';

class ProductsController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(StatusCodes.OK).json(products);
  };

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const product = await this.productService.getById(id);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'Product not found!' });
    }

    res.status(StatusCodes.OK).json(product);
  };

  public create = async (req: Request, res: Response) => {
    const product = req.body;

    const productCreated = await this.productService.create(product);
    res.status(StatusCodes.CREATED).json(productCreated);
  };

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.productService.remove(id);

    res.status(StatusCodes.OK).json({ message: 'Product deleted successfully' });
  };
}

export default ProductsController;