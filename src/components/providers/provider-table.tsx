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
import { Provider } from "../../interfaces/provider.interface";
import { getAllProviders } from "../../app/api/providers.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { deleteProvider } from "../../app/api/providers.api";
import { useRouter } from "next/navigation";

interface ProvidersResponse {
  data: Provider[];
  total: number;
}

export function ProviderTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [providersData, setProvidersData] = useState<ProvidersResponse>({
    data: [],
    total: 0,
  });

  const router = useRouter();

  const loadProviders = async (newOffset: number) => {
    const result = await getAllProviders(newOffset, limit);
    setProvidersData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadProviders(0);
  }, []);
  
  async function handleDelete(id: string) {
  try {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este Proveedor?");
    if (!confirmDelete) return;

    // Llama a la API para eliminar la categoria
    await deleteProvider(id);

    // Muestra un mensaje de éxito
    alert("Proveedor eliminado correctamente");

    // Recarga los datos de la tabla
    loadProviders(offset);
  } catch (error) {
    console.error("Error al eliminar el Proveedor:", error);
    alert("Hubo un error al intentar eliminar el Proveedor.");
  }
}

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/providers/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Proveedor
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Direccion</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Correo Electronico</TableHead>
              <TableHead>Numero RUC</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providersData.data.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="font-medium">{provider.id}</TableCell>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.address}</TableCell>
                <TableCell>{provider.phone_number}</TableCell>
                <TableCell>{provider.contact}</TableCell>
                <TableCell>{provider.e_mail}</TableCell>
                <TableCell>{provider.ruc_number}</TableCell>
                <TableCell>
                  {provider.isAvailable ? (
                    <span className="text-green-500">Activo</span>
                  ) : (
                    <span className="text-red-500">Inactivo</span>
                  )}
                </TableCell>
               <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      //   variant="outline"
                      size="sm"
                      className="bg-blue-600 text-white :hover:bg-blue-700"
                      onClick={() => router .push(`/dashboard/providers/edit/${provider.id}`)}
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button
                      //   variant="destructive"
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handleDelete(provider.id)}
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
          onClick={() => loadProviders(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(providersData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= providersData.total}
          onClick={() => loadProviders(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default ProviderTable;
