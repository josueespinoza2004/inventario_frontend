"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "../../interfaces/product.interface";
import { Categorie } from "../../interfaces/categorie.interface";
import { Provider } from "../../interfaces/provider.interface";
import { getAllProducts, deleteProduct } from "../../app/api/products.api";
import { getAllCategories } from "../../app/api/categories.api";
import { getAllProviders } from "../../app/api/providers.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface ProductsResponse {
  data: Product[];
  total: number;
}

export function ProductTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [productsData, setProductsData] = useState<ProductsResponse>({
    data: [],
    total: 0,
  });
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categoryMap, setCategoryMap] = useState<Map<number, string>>(new Map());

  const router = useRouter();

  const loadProducts = async (newOffset: number) => {
    try {
      const result = await getAllProducts(newOffset, limit);
      setProductsData(result);
      setOffset(newOffset);
      console.log("Productos cargados:", result.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      alert("Hubo un error al cargar los productos.");
    }
  };

const loadCategories = async () => {
  try {
    const result = await getAllCategories(0, 1000);
    console.log("Categorías cargadas:", result.data);

    // Filtrar categorías eliminadas
    const activeCategories = result.data.filter((c: Categorie) => !c.deletedAt);
    setCategories(activeCategories);

    const map = new Map(activeCategories.map((c: Categorie) => [Number(c.id), c.name]));
    setCategoryMap(map);
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
  }
};

  const loadProviders = async () => {
    try {
      const result = await getAllProviders(0, 1000);
      setProviders(result.data);
      console.log("Proveedores cargados:", result.data);
    } catch (error) {
      console.error("Error al cargar los proveedores:", error);
    }
  };

  useEffect(() => {
    loadProducts(0);
    loadCategories();
    loadProviders();
  }, []);

  useEffect(() => {
    console.log("Mapa de categorías:", categoryMap);
    console.log("Productos cargados:", productsData.data);
  }, [categoryMap, productsData]);

  if (!categories.length || !productsData.data.length) {
    return <div>Cargando datos...</div>;
  }

  async function handleDelete(id: string) {
    try {
      const confirmDelete = confirm(
        "¿Estás seguro de que deseas eliminar este Producto?"
      );
      if (!confirmDelete) return;
      await deleteProduct(id);
      alert("Producto eliminado correctamente");
      loadProducts(offset);
    } catch (error) {
      console.error("Error al eliminar el Producto:", error);
      alert("Hubo un error al intentar eliminar el Producto.");
    }
  }

function getCategoryName(categoryId: number) {
  if (!categoryMap.has(Number(categoryId))) {
    console.warn(`Categoría con ID ${categoryId} no encontrada.`);
    return "Categoría inválida";
  }
  return categoryMap.get(Number(categoryId)) || "Sin categoría";
}

  function getProviderName(providerId: number) {
    const provider = providers.find((p) => p.id === providerId);
    return provider ? provider.name : "Sin proveedor";
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/products/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Producto
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Precio de Compra</TableHead>
              <TableHead>Precio de Venta</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Proveedor</TableHead>
               <TableHead>Disponibilidad</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.data?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.brand || "N/A"}</TableCell>
                <TableCell>{product.model || "N/A"}</TableCell>
                <TableCell>{product.buy_price || "N/A"}</TableCell>
                <TableCell>{product.sale_price || "N/A"}</TableCell>
                <TableCell>{product.stock || "N/A"}</TableCell>
                <TableCell>{getCategoryName(product.category_id)}</TableCell>
                <TableCell>{getProviderName(product.provider_id)}</TableCell>
                <TableCell>{product.isAvailable ? (
                    <span className="text-green-500">Disponible</span>
                  ) : (
                    <span className="text-red-500">No disponible</span>
                  )}</TableCell>
                <TableCell>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-18 h-18 object-cover rounded-md"
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() =>
                        router.push(`/dashboard/products/edit/${product.id}`)
                      }
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handleDelete(product.id)}
                    >
                      <BiTrash className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={offset === 0}
          onClick={() => loadProducts(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(productsData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= productsData.total}
          onClick={() => loadProducts(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default ProductTable;