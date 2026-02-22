import { IProductRepository } from "../../domain"
import { CreateProductDto, Product } from "../../domain/product.entity"
import { ProductApi } from "../dtos/product.dto"
import { ProductMapper } from "../mappers/product.mapper"

class ProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data: ProductApi[] = await response.json();

      const products: Product[] = data.map(ProductMapper.toDomain);

      return products;
    } catch (error) {
      // Log del error técnico
      console.error("[ProductRepository] Error fetching products:", error);

      // Re-lanzar error más específico
      if (error instanceof TypeError) {
        throw new Error("Network error: Unable to connect to API");
      }

      throw error;
    }
  }

  async create(product: CreateProductDto): Promise<Product> {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ProductMapper.toApiRequest(product)),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }

      const data: ProductApi = await response.json();

      const newProduct: Product = ProductMapper.toDomain(data);

      return newProduct;
    } catch (error) {
      // Log del error técnico
      console.error("[ProductRepository] Error creating product:", error);

      // Re-lanzar error más específico
      if (error instanceof TypeError) {
        throw new Error("Network error: Unable to connect to API");
      }

      throw error;
    }
  }
}

export const productRepository = new ProductRepository();
