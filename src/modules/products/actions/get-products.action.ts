'use server';

import { Product } from '../domain/entities/product.entity'
import { ProductApi } from '../infrastructure/dtos/product.api.interface'
import { productMapper } from '../infrastructure/mappers/product.mapper'

export const getProductsAction = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data: ProductApi[] = await response.json();

    const products: Product[] = data.map(productMapper);

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    // You might want to return an empty array or throw a custom error depending on error handling strategy
     throw new Error('Failed to load products');
  }
};
