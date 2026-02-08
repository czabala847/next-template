export interface ProductApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CreateProductApiRequest {
  name: string;
  description: string;
  basePrice: number;
  category: string;
  stock: number;
  sku: string;
}