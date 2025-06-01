// import React from "react";
"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { CustomerData } from '../../interfaces/customer.interface';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addCustomer, updateCustomer, getCustomerById } from "../../app/api/customers.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect } from "react";

interface CustomerFormProps {
  customerId?: string; 
}

export function CustomerForm({ customerId }: CustomerFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<CustomerData>();
  const router = useRouter();

  useEffect(() => {
  if (customerId) {
    async function fetchCustomer() {
      const customer = await getCustomerById(customerId);
      setValue("name", customer.name);
      setValue("address", customer.address);
      setValue("phone_number", customer.phone_number);
      setValue("contact", customer.contact);
      setValue("e_mail", customer.e_mail);
      setValue("ruc_number", customer.ruc_number);
      setValue("isAvailable", customer.isAvailable);
    }
    fetchCustomer();
  }
}, [customerId, setValue]);

const onSubmit = handleSubmit(async (data) => {
  // Convierte phone_number a número
  const payload = {
    ...data,
    phone_number: Number(data.phone_number),
  };
  if (customerId) {
    await updateCustomer(Number(customerId), payload);
    alert("Cliente actualizado correctamente");
  } else {
    await addCustomer(payload);
    alert("Cliente agregado correctamente");
  }
  router.push("/dashboard/customers");
});

  return (
    <form onSubmit={onSubmit}>
      <Label>Cliente</Label>
      <Input {...register("name")} />
      <Label>Direccion</Label>
      <Input {...register("address")} />
      <Label>Telefono</Label>
      <Input type="number" {...register("phone_number")} />
      <Label>Contacto</Label>
      <Input {...register("contact")} />
      <Label>Correo electronico</Label>
      <Input type="email" {...register("e_mail")} />
      <Label>RUC</Label>
      <Input {...register("ruc_number")} />
      <Label>Estado</Label>
      <Select onValueChange={value => setValue("isAvailable", value === "true")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona el estado" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="true">Activo</SelectItem>
          <SelectItem value="false">Inactivo</SelectItem>
        </SelectContent>
      </Select>
      
      <br />
      <Button className={buttonVariants({ variant: "agregar" })}>
        {customerId ? "Actualizar Cliente" : "Agregar Cliente"}
      </Button>
    </form>
  );
}

export default CustomerForm;