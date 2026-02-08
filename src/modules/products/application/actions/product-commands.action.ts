"use server";

import { CreateProductDto } from "@/modules/products/domain/product.entity"
import { CreateProductUseCase } from "@/modules/products/domain/use-cases/create-product.use-case"
import { productRepository } from "@/modules/products/infrastructure/repositories/product.repository"

export async function createProductAction(product: FormData) {
  const createProductDto: CreateProductDto = {
    name: product.get("name") as string,
    description: product.get("description") as string,
    basePrice: Number(product.get("basePrice")),
    category: product.get("category") as string,
    stock: Number(product.get("stock")),
    sku: product.get("sku") as string,
  };

  try {
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const response = await createProductUseCase.execute(createProductDto);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("[ProductCommandsAction] Error creating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
