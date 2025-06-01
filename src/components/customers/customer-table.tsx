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
import { Customer } from "../../interfaces/customer.interface";
import { getAllCustomers } from "../../app/api/customers.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { deleteCustomer } from "../../app/api/customers.api";
import { useRouter } from "next/navigation";

interface CustomersResponse {
  data: Customer[];
  total: number;
}

export function CustomerTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [customersData, setCustomersData] = useState<CustomersResponse>({
    data: [],
    total: 0,
  });

  const router = useRouter();

  const loadCustomers = async (newOffset: number) => {
    const result = await getAllCustomers(newOffset, limit);
    setCustomersData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadCustomers(0);
  }, []);
  
  async function handleDelete(id: string) {
  try {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este Cliente?");
    if (!confirmDelete) return;

    // Llama a la API para eliminar la categoria
    await deleteCustomer(id);

    // Muestra un mensaje de éxito
    alert("Cliente eliminado correctamente");

    // Recarga los datos de la tabla
    loadCustomers(offset);
  } catch (error) {
    console.error("Error al eliminar el Cliente:", error);
    alert("Hubo un error al intentar eliminar el Cliente.");
  }
}

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/customers/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Cliente
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
            {customersData.data.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phone_number}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.e_mail}</TableCell>
                <TableCell>{customer.ruc_number}</TableCell>
                <TableCell>
                  {customer.isAvailable ? (
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
                      onClick={() => router .push(`/dashboard/customers/edit/${customer.id}`)}
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button
                      //   variant="destructive"
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handleDelete(customer.id)}
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
          onClick={() => loadCustomers(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(customersData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= customersData.total}
          onClick={() => loadCustomers(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default CustomerTable;