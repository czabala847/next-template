import { CreateProductDto, Product } from './product.entity'

export interface IProductRepository {
    getAll(): Promise<Product[]>;
    create(product: CreateProductDto): Promise<Product>;
}