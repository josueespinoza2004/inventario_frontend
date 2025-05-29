import { CategorieData, CategoriesResponse } from '../../interfaces/categorie.interface';

export async function getAllCategories(
  offset: number = 0,
  limit: number = 5
): Promise<CategoriesResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/categories?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  );
  return await response.json();
}

export async function getCategorieById(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/categories/${id}`);
  if (!res.ok) throw new Error("Error al obtener la categoria");
  return res.json();
}

export async function addCategorie(categorieData: CategorieData) {
  const res = await fetch("http://localhost:4000/api/v1/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categorieData),
  });

  return await res.json();
}

export async function updateCategorie(id: string, categorieData: CategorieData) {
  const res = await fetch(`http://localhost:4000/api/v1/categories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categorieData),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar la categoria");
  }

  return res.json();
}

export async function deleteCategorie(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/categories/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar la categoria");
  }

  return res.json();
}
