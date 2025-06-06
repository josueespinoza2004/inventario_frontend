import { CustomerData, CustomersResponse } from '../../interfaces/customer.interface';

export async function getAllCustomers(
  offset: number = 0,
  limit: number = 1000
): Promise<CustomersResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/customers?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  );
  return await response.json();
}

export async function getCustomerById(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/customers/${id}`);
  if (!res.ok) throw new Error("Error al obtener el Cliente");
  return res.json();
}

export async function addCustomer(customerData: CustomerData) {
  const res = await fetch("http://localhost:4000/api/v1/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  return await res.json();
}

export async function updateCustomer(id: string, customerData: CustomerData) {
  const res = await fetch(`http://localhost:4000/api/v1/customers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customerData),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar el Cliente");
  }

  return res.json();
}

export async function deleteCustomer(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/customers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el Cliente");
  }

  return res.json();
}