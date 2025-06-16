"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SaleData } from "@/interfaces/sale.interface";
import { Customer } from "@/interfaces/customer.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addSale, updateSale, getSaleById } from "../../app/api/sales.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getAllCustomers } from "@/app/api/customers.api";
import Swal from "sweetalert2";

interface SaleFormProps {
  saleId?: string;
}

export function SaleForm({ saleId }: SaleFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<SaleData>();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Cargar clientes
  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getAllCustomers(0, 1000);
      setCustomers(data.data);
      if (data.data.length > 0 && !saleId) {
        setValue("customerId", data.data[0].id);
      }
    };
    fetchCustomers();
  }, [saleId, setValue]);

  // Cargar venta si es edición
  useEffect(() => {
    if (saleId) {
      async function fetchSale() {
        const sale = await getSaleById(saleId);
        setValue("customerId", sale.customer_id);
        setValue("date", sale.date);
        setValue("total", sale.total);
        setValue("payment_method", sale.payment_method);
        setValue("sale_price", sale.sale_price);
        setValue("isAvailable", sale.isAvailable);
      }
      fetchSale();
    }
  }, [saleId, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      customer_id: data.customerId,
      sale_price: data.sale_price !== undefined && data.sale_price !== null ? Number(data.sale_price) : undefined,
      total: data.total !== undefined && data.total !== null ? Number(data.total) : undefined,
    };
    delete payload.customerId;

    console.log("Payload:", payload);

  try {
    if (saleId) {
      await updateSale(Number(saleId), payload);
      await Swal.fire({
        icon: "success",
        title: "Venta actualizada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await addSale(payload);
      await Swal.fire({
        icon: "success",
        title: "Venta agregada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    router.push("/dashboard/sales");
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    await Swal.fire({
      icon: "error",
      title: "Hubo un error al enviar el formulario.",
      text: error.message,
    });
  }
});

  return (
    <form onSubmit={onSubmit}>
      <Label>Cliente</Label>
      <Select
        value={String(watch("customerId") || "")}
        onValueChange={value => setValue("customerId", Number(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un cliente" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {customers.map((customer) => (
            <SelectItem key={customer.id} value={String(customer.id)}>
              {customer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>Fecha</Label>
      <Input type="date" {...register("date")} />

      <Label>Total</Label>
      <Input type="number" step="0.01" {...register("total")} />

      <Label>Método de Pago</Label>
      <Select
        value={watch("payment_method") || ""}
        onValueChange={value => setValue("payment_method", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona el método de pago" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Efectivo">Efectivo</SelectItem>
          <SelectItem value="Tarjeta de crédito">Tarjeta de crédito</SelectItem>
          <SelectItem value="Tarjeta de débito">Tarjeta de débito</SelectItem>
          <SelectItem value="Transferencia bancaria">Transferencia bancaria</SelectItem>
        </SelectContent>
      </Select>

      <Label>Precio de Venta</Label>
      <Input type="number" step="0.01" {...register("sale_price")} />

      <br />
      <Button className={buttonVariants({ variant: "agregar" })}>
        {saleId ? "Actualizar Venta" : "Agregar Venta"}
      </Button>
    </form>
  );
}

export default SaleForm;