import { ProviderData, ProvidersResponse } from '../../interfaces/provider.interface';

export async function getAllProviders(
  offset: number = 0,
  limit: number = 5
): Promise<ProvidersResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/providers?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  );
  return await response.json();
}

export async function getProviderById(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/providers/${id}`);
  if (!res.ok) throw new Error("Error al obtener el Proveedor");
  return res.json();
}

export async function addProvider(providerData: ProviderData) {
  const res = await fetch("http://localhost:4000/api/v1/providers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(providerData),
  });

  return await res.json();
}

export async function updateProvider(id: string, providerData: ProviderData) {
  const res = await fetch(`http://localhost:4000/api/v1/providers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(providerData),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar el Proveedor");
  }

  return res.json();
}

export async function deleteProvider(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/providers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el Proveedor");
  }

  return res.json();
}
