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
import { Sale } from "../../interfaces/sale.interface";
import { Customer } from "../../interfaces/customer.interface";
import { getAllSales, deleteSale } from "../../app/api/sales.api";
import { getAllCustomers } from "../../app/api/customers.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { downloadReport } from "@/app/api/reports.api";
import { HiDownload } from "react-icons/hi";

interface SalesResponse {
  data: Sale[];
  total: number;
}

export function SaleTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [salesData, setSalesData] = useState<SalesResponse>({
    data: [],
    total: 0,
  });
  const [customers, setCustomers] = useState<Customer[]>([]);

  const router = useRouter();

  // Cargar ventas
  const loadSales = async (newOffset: number) => {
    const result = await getAllSales(newOffset, limit);
    setSalesData(result);
    setOffset(newOffset);
  };

  // Cargar clientes
  const loadCustomers = async () => {
    const result = await getAllCustomers(0, 1000);
    setCustomers(result.data);
  };

  useEffect(() => {
    loadSales(0);
    loadCustomers();
  }, []);

  async function handleDelete(id: string) {
    try {
      const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta Venta?");
      if (!confirmDelete) return;
      await deleteSale(id);
      alert("Venta eliminada correctamente");
      loadSales(offset);
    } catch (error) {
      console.error("Error al eliminar la Venta:", error);
      alert("Hubo un error al intentar eliminar la Venta.");
    }
  }

  // Función para obtener el nombre del cliente por ID
  function getCustomerName(customer_id: number) {
    const customer = customers.find((c) => c.id === customer_id);
    return customer ? customer.name : "Desconocido";
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-4">
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 squared-full p-3"
          onClick={() => downloadReport('sales', 'Ventas.xlsx')}
        >
          <HiDownload className="h-10 w-10" /> 
        </Button>
        <Link
          href="/dashboard/sales/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Venta
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Método de Pago</TableHead>
              <TableHead>Precio de Venta</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.data.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.id}</TableCell>
                <TableCell>{getCustomerName(sale.customer_id)}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.total}</TableCell>
                <TableCell>{sale.payment_method}</TableCell>
                <TableCell>{sale.sale_price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white :hover:bg-blue-700"
                      onClick={() => router.push(`/dashboard/sales/edit/${sale.id}`)}
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handleDelete(sale.id)}
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
          onClick={() => loadSales(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(salesData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= salesData.total}
          onClick={() => loadSales(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default SaleTable;