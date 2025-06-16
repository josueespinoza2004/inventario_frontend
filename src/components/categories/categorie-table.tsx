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
import { Categorie } from "../../interfaces/categorie.interface";
import { getAllCategories } from "../../app/api/categories.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { deleteCategorie } from "../../app/api/categories.api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { downloadReport } from "@/app/api/reports.api";
import { HiDownload } from "react-icons/hi";

interface CategoriesResponse {
  data: Categorie[];
  total: number;
}

export function CategorieTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [categoriesData, setCategoriesData] = useState<CategoriesResponse>({
    data: [],
    total: 0,
  });

  const router = useRouter();

  const loadCategories = async (newOffset: number) => {
    const result = await getAllCategories(newOffset, limit);
    setCategoriesData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadCategories(0);
  }, []);

  if (!categoriesData.data.length) {
    return (
    <div >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
  }
  
  async function handleDelete(id: string) {
  try {
    // Usa SweetAlert2 para mostrar la confirmación
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la categoría de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    // Verifica si el usuario confirmó la acción
    if (!confirmDelete.isConfirmed) {
      return; // Si no confirmó, no se realiza la eliminación
    }

    // Llama a la API para eliminar la categoría
    await deleteCategorie(id);

    // Muestra un mensaje de éxito
    await Swal.fire({
      icon: "success",
      title: "Categoría eliminada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    // Recarga los datos de la tabla
    loadCategories(offset);
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);

    // Muestra un mensaje de error
    await Swal.fire({
      icon: "error",
      title: "Hubo un error al intentar eliminar la categoría.",
      text: error.message,
    });
  }
}

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-4">
        <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 squared-full p-3"
                  onClick={() => downloadReport('categories', 'Categorias.xlsx')}
                >
                  <HiDownload className="h-10 w-10" /> 
                </Button>
        <Link
          href="/dashboard/categories/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Categoria
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesData.data.map((categorie) => (
              <TableRow key={categorie.id}>
                <TableCell className="font-medium">{categorie.id}</TableCell>
                <TableCell>{categorie.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      //   variant="outline"
                      size="sm"
                      className="bg-blue-600 text-white :hover:bg-blue-700"
                      onClick={() => router .push(`/dashboard/categories/edit/${categorie.id}`)}
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button
                      //   variant="destructive"
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handleDelete(categorie.id)}
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
          onClick={() => loadCategories(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(categoriesData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= categoriesData.total}
          onClick={() => loadCategories(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default CategorieTable;
