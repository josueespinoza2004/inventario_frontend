export interface Product {
  id: number;
  name: string;
  description: string;
  brand?: string;
  model?: string;
  buy_price?: number;
  sale_price?: number;
  stock?: number;
  isAvailable?: boolean;
  categorieId: number; 
  providerId: number; 
  image?: string; 
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ProductData {
  name: string;
  description: string;
  brand?: string;
  model?: string;
  buy_price?: number;
  sale_price?: number;
  stock?: number;
  isAvailable?: boolean;
  categorieId: number; 
  providerId: number; 
  image?: string; 
}

export interface ProductsResponse {
  data: Product[];
  total: number;
}