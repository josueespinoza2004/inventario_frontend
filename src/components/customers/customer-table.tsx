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
import { downloadReport } from "@/app/api/reports.api";
import { HiDownload } from "react-icons/hi";
import Swal from "sweetalert2";

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
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmDelete.isConfirmed) {
      return; 
    }
    await deleteCustomer(id);

    await Swal.fire({
      icon: "success",
      title: "Cliente eliminado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    loadCustomers(offset); 
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);


      await Swal.fire({
        icon: "error",
        title: "Error al eliminar el cliente",
        text:error.message,
      });
    }
}

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-4">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 squared-full p-3"
          onClick={() => downloadReport('customers', 'Clientes.xlsx')}
          >
          <HiDownload className="h-10 w-10" /> 
          </Button>
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