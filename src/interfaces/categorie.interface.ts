// export interface CategorieData {
//   name: string;
//   description?: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string;
// }

export interface Categorie {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface CategorieData {
  name: string;
}

export interface CategoriesResponse {
  data: Categorie[];
  total: number;
}
