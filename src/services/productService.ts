import connection from '../models/connection';
import Product from '../interfaces/products.interface';
import ProductModel from '../models/productModel';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const product = await this.model.getAll();
    return product;
  }

  public async getById(id: number): Promise<Product> {
    const product = await this.model.getById(id);
    return product;
  }

  public create(product: Product): Promise<Product> {
    return this.model.create(product);
  }

  public async update(id: number, product: Product): Promise<void> {
    return this.model.update(id, product);
  }

  public async remove(id: number): Promise<void> {
    this.model.remove(id);
  }
}
export default ProductService;
