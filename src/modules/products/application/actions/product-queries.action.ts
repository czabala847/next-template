"use server";

import { IProductRepository, Product } from "../../domain"

export const getProductsAction = async (
  repository: IProductRepository,
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
