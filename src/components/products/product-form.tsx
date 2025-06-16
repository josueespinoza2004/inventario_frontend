"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductData } from "@/interfaces/product.interface";
import { Categorie } from "@/interfaces/categorie.interface";
import { Provider } from "@/interfaces/provider.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { addProduct, updateProduct, getProductById } from "../../app/api/products.api";
import { getAllCategories } from "@/app/api/categories.api";
import { getAllProviders } from "@/app/api/providers.api";
import Swal from "sweetalert2";

interface ProductFormProps {
  productId?: string;
}

export function ProductForm({ productId }: ProductFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ProductData>();
  const router = useRouter();
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories(0, 1000);
      setCategories(data.data);
      if (data.data.length > 0 && !productId) {
        setValue("categorieId", data.data[0].id);
      }
    };
    fetchCategories();
  }, [productId, setValue]);

  // Cargar proveedores
  useEffect(() => {
    const fetchProviders = async () => {
      const data = await getAllProviders(0, 1000);
      setProviders(data.data);
      if (data.data.length > 0 && !productId) {
        setValue("providerId", data.data[0].id);
      }
    };
    fetchProviders();
  }, [productId, setValue]);

  // Cargar producto si es edición
useEffect(() => {
  if (productId) {
    async function fetchProduct() {
      try {
        const response = await getProductById(productId);
        const product = response.data; // Accede a los datos del producto
        console.log("Producto cargado:", product); // Depuración

        setValue("name", product.name);
        setValue("description", product.description);
        setValue("brand", product.brand);
        setValue("model", product.model);
        setValue("buy_price", product.buy_price);
        setValue("sale_price", product.sale_price);
        setValue("stock", product.stock);
        setValue("isAvailable", product.isAvailable);
        setValue("categorieId", product.category_id); // Asegúrate de usar el nombre correcto
        setValue("providerId", product.provider_id); // Asegúrate de usar el nombre correcto
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    }
    fetchProduct();
  }
}, [productId, setValue]);

  const onSubmit = handleSubmit(async (data) => {
      console.log("Datos enviados:", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("model", data.model);
    formData.append("buy_price", String(data.buy_price));
    formData.append("sale_price", String(data.sale_price));
    formData.append("stock", String(data.stock));
    formData.append("isAvailable", String(data.isAvailable));
    formData.append("category_id", String(data.categorieId));
    formData.append("provider_id", String(data.providerId));
    if (imageFile) {
      formData.append("file", imageFile); // Agrega la imagen al FormData
    }


  console.log("FormData enviado:");
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

    try {
      if (productId) {
await updateProduct(productId, formData);
      await Swal.fire({
        icon: "success",
        title: "Producto actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await addProduct(formData);
      await Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    router.push("/dashboard/products");
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
      <Label>Nombre del Producto</Label>
      <Input {...register("name")} />

      <Label>Descripción</Label>
      <Input
        {...register("description", {
          required: "La descripción es obligatoria",
          minLength: {
            value: 3,
            message: "La descripción debe tener al menos 3 caracteres",
          },
        })}
      />
      
      <Label>Marca</Label>
      <Input {...register("brand")} />

      <Label>Modelo</Label>
      <Input {...register("model")} />

      <Label>Precio de Compra</Label>
      <Input type="number" step="0.01" {...register("buy_price")} />

      <Label>Precio de Venta</Label>
      <Input type="number" step="0.01" {...register("sale_price")} />

      <Label>Stock</Label>
      <Input type="number" {...register("stock")} />

      <Label>Disponible</Label>
      <Select
        value={String(watch("isAvailable") || "")}
        onValueChange={(value) => setValue("isAvailable", value === "true")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona disponibilidad" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="true">Disponible</SelectItem>
          <SelectItem value="false">No disponible</SelectItem>
        </SelectContent>
      </Select>

      <Label>Categoría</Label>
      <Select
        value={String(watch("categorieId") || "")}
        onValueChange={(value) => setValue("categorieId", Number(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona una categoría" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {categories.map((categorie) => (
            <SelectItem key={categorie.id} value={String(categorie.id)}>
              {categorie.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>Proveedor</Label>
      <Select
        value={String(watch("providerId") || "")}
        onValueChange={(value) => setValue("providerId", Number(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un proveedor" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {providers.map((provider) => (
            <SelectItem key={provider.id} value={String(provider.id)}>
              {provider.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>Imagen</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <br />
      <Button className={buttonVariants({ variant: "agregar" })}>
        {productId ? "Actualizar Producto" : "Agregar Producto"}
      </Button>
    </form>
  );
}

export default ProductForm;