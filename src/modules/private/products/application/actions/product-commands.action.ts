"use server";

import { CreateProductUseCase } from "@/modules/private/products/application/use-cases/create-product.use-case"
import { CreateProductDto } from "@/modules/private/products/domain/product.entity"
import { productRepository } from "@/modules/private/products/infrastructure/repositories/product.repository"

export async function createProductAction(
  product: FormData,
  repository = productRepository,
) {
  const createProductDto: CreateProductDto = {
    name: product.get("name") as string,
    description: product.get("description") as string,
    basePrice: Number(product.get("basePrice")),
    category: product.get("category") as string,
    stock: Number(product.get("stock")),
    sku: product.get("sku") as string,
  };

  try {
    const createProductUseCase = new CreateProductUseCase(repository);
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
