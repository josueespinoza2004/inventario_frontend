// import React from "react";
"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { ProviderData } from '../../interfaces/provider.interface';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addProvider, updateProvider, getProviderById } from "../../app/api/providers.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect } from "react";

interface ProviderFormProps {
  providerId?: string; 
}

export function ProviderForm({ providerId }: ProviderFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ProviderData>();
  const router = useRouter();

  useEffect(() => {
  if (providerId) {
    async function fetchProvider() {
      const provider = await getProviderById(providerId);
      setValue("name", provider.name);
      setValue("address", provider.address);
      setValue("phone_number", provider.phone_number);
      setValue("contact", provider.contact);
      setValue("e_mail", provider.e_mail);
      setValue("ruc_number", provider.ruc_number);
      setValue("isAvailable", provider.isAvailable);
    }
    fetchProvider();
  }
}, [providerId, setValue]);

const onSubmit = handleSubmit(async (data) => {
  // Convierte phone_number a número
  const payload = {
    ...data,
    phone_number: Number(data.phone_number),
  };
  if (providerId) {
    await updateProvider(Number(providerId), payload);
    alert("Proveedor actualizado correctamente");
  } else {
    await addProvider(payload);
    alert("Proveedor agregado correctamente");
  }
  router.push("/dashboard/providers");
});

  return (
    <form onSubmit={onSubmit}>
      <Label>Proveedor</Label>
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
        {providerId ? "Actualizar Proveedor" : "Agregar Proveedor"}
      </Button>
    </form>
  );
}

export default ProviderForm;