import { SaleData, SalesResponse } from '../../interfaces/sale.interface';

export async function getAllSales(
  offset: number = 0,
  limit: number = 3
): Promise<SalesResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/sales?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  );
  return await response.json();
}

export async function getSaleById(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/sales/${id}`);
  if (!res.ok) throw new Error("Error al obtener la venta");
  return res.json();
}

export async function addSale(saleData: SaleData) {
  const res = await fetch("http://localhost:4000/api/v1/sales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saleData),
  });

  return await res.json();
}

export async function updateSale(id: string, saleData: SaleData) {
  const res = await fetch(`http://localhost:4000/api/v1/sales/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(saleData),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar la venta");
  }

  return res.json();
}

export async function deleteSale(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/sales/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar la venta");
  }

  return res.json();
}