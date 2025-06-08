// import React from "react";
"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { CategorieData } from '../../interfaces/categorie.interface';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addCategorie, updateCategorie, getCategorieById } from "../../app/api/categories.api";
import { useEffect } from "react";

interface CategorieFormProps {
  categorieId?: string; // El ID de la categoria si se está editando, opcional
}

export function CategorieForm({ categorieId }: CategorieFormProps) {
  const { register, handleSubmit, setValue } = useForm<CategorieData>();
  const router = useRouter();

  useEffect(() => {
    if (categorieId) {
      // Si hay un ID, carga los datos de la categoria para edición
      async function fetchCategorie() {
        const categorie = await getCategorieById(categorieId);
        setValue("name", categorie.name);
      }
      fetchCategorie();
    }
  }, [categorieId, setValue]);

const onSubmit = handleSubmit(async (data) => {
    if (categorieId) {
      await updateCategorie(Number(categorieId), data);
      Swal.fire({
        icon: "success",
        title: "Categoria actualizada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await addCategorie(data);
      Swal.fire({
        icon: "success",
        title: "Categoria agregada correctamente.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    router.push("/dashboard/categories");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Categoria</Label>
      <Input {...register("name")} />

      <br />
      <Button className={buttonVariants({ variant: "agregar" })}>
        {categorieId ? "Actualizar Categoria" : "Agregar Categoria"}
      </Button>
    </form>
  );
}

export default CategorieForm;
