export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  basePrice: number;
  category: string;
  stock: number;
  sku: string;
}
