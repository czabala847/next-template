import { CreateProductDto, Product } from "@/modules/private/products/domain/product.entity"
import { IProductRepository } from "@/modules/private/products/domain/repositories/product.repository.interface"

export class CreateProductUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(product: CreateProductDto): Promise<Product> {
    // 1. validar datos de entrada
    this.validateInput(product);

    // 2. verificar duplicados

    // 3. calcular precio final

    // 4. validar stock minimo
    this.validateStock(product.stock);

    // 5. crear producto
    const newProduct = await this.repository.create(product);

    // 6. registrar evento de auditoria
    this.logAudit(newProduct);

    // 7. notificar sistema de inventario
    this.notifyInventorySystem(newProduct);

    return newProduct;
  }

  private validateInput(product: CreateProductDto): void {
    if (
      !product.name ||
      !product.description ||
      !product.basePrice ||
      !product.category ||
      !product.stock ||
      !product.sku
    ) {
      throw new Error("Datos de entrada invalidos");
    }
  }

  private validateStock(stock: number): void {
    if (stock < 0) {
      throw new Error("Stock no puede ser negativo");
    }
  }

  private logAudit(product: Product): void {
    console.info(`Producto ${product.title} creado con exito`);
  }

  private notifyInventorySystem(product: Product): void {
    console.info(
      `Notificando sistema de inventario para el producto ${product.title}`,
    );
  }
}
