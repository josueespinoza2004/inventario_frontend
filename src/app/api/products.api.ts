import { ProductData, ProductsResponse } from "@/interfaces/product.interface";
import { getSession } from "next-auth/react";

export async function getAllProducts(offset: number, limit: number) {
  const session = await getSession();
  const res = await fetch(
    `http://localhost:4000/api/v1/products?offset=${offset}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, 
      },
    }
  );

  if (!res.ok) {
    const errorMessage = await res.text();
    console.error("Error al obtener los productos:", errorMessage);
    throw new Error(errorMessage);
  }

  return await res.json();
}

export async function getProductById(id: string) {
  const session = await getSession();
  const res = await fetch(`http://localhost:4000/api/v1/products/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener el producto");
  return res.json();
}

export async function addProduct(formData: FormData) {
  const session = await getSession();
  const res = await fetch("http://localhost:4000/api/v1/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`, 
     
    },
    body: formData, 
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    console.error("Error al agregar el producto:", errorMessage);
    throw new Error(errorMessage);
  }

  return await res.json();
}
export async function updateProduct(id: string, formData: FormData) {
  const session = await getSession();
  const res = await fetch(`http://localhost:4000/api/v1/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`, 
    
    },
    body: formData, 
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    console.error("Error al actualizar el producto:", errorMessage);
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function deleteProduct(id: string) {
  const session = await getSession();
  const res = await fetch(`http://localhost:4000/api/v1/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    console.error("Error al eliminar el producto:", errorMessage);
    throw new Error(errorMessage);
  }

  return res.json();
}