import { Product } from '@/modules/products/domain/entities/product.entity'
import { ProductApi } from '@/modules/products/infrastructure/dtos/product.api.interface'

export const productMapper = (product: ProductApi): Product => {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
  };
};
