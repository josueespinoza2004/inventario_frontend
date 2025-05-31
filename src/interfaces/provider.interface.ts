export interface Provider {
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

export interface ProviderData {
  name: string;
  address: string;
  phone_number: number;
  contact: string;
  e_mail: string;
  ruc_number: string;
  isAvailable: boolean;
}

export interface ProvidersResponse {
  data: Provider[];
  total: number;
}