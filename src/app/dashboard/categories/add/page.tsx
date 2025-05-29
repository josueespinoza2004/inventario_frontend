import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategorieForm from "../../../../components/categories/categorie-form";

function CategoriesAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nueva Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <CategorieForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesAddPage;
