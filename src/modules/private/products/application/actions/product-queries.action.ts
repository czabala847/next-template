"use server";

import { IProductRepository, Product } from "@/modules/private/products/domain"
import { productRepository } from '@/modules/private/products/infrastructure'

export const getProductsAction = async (
  repository: IProductRepository = productRepository,
): Promise<Product[]> => {
  try {
    const products = await repository.getAll();
    return products;
  } catch (error) {
    console.error("[ProductRepository] Error fetching products:", error);

    // Necesidad del negocio: si falla la petición, devolver un array vacío
    return [];
  }
};
