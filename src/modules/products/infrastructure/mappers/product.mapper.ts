import {
  CreateProductDto,
  Product,
} from "@/modules/products/domain/product.entity"
import {
  CreateProductApiRequest,
  ProductApi,
} from "@/modules/products/infrastructure/dtos/product.dto"

export class ProductMapper {
  static toDomain(product: ProductApi): Product {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    };
  }

  static toApiRequest(product: CreateProductDto): CreateProductApiRequest {
    return {
      name: product.name,
      description: product.description,
      basePrice: product.basePrice,
      category: product.category,
      stock: product.stock,
      sku: product.sku,
    };
  }
}
