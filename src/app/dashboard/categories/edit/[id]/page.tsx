import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategorieForm from "@/components/categories/categorie-form";

export default function EditCategoriePage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <CategorieForm categorieId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}