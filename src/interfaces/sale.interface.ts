import { Customer } from "./customer.interface";

export interface Sale {
  id: number;
  customer: Customer;
  date: string;
  total: number;
  payment_method: string; // <-- Nuevo campo
  sale_price: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface SaleData {
  customerId: number;
  date: string;
  total: number;
  payment_method: string; // <-- Nuevo campo
  sale_price: number;
  isAvailable: boolean;
}
export interface SalesResponse {
  data: Sale[];
  total: number;
}