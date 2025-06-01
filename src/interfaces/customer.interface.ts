export interface Customer {
  id: number;
  name: string;
  address: string;
  phone_number: number;
  contact: string;
  e_mail: string;
  ruc_number: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface CustomerData {
  name: string;
  address: string;
  phone_number: number;
  contact: string;
  e_mail: string;
  ruc_number: string;
  isAvailable: boolean;
}

export interface CustomersResponse {
  data: Customer[];
  total: number;
}