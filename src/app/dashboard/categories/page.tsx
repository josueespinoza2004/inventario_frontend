import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategorieTable from "../../../components/categories/categorie-table";

function CategoriesTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <CategorieTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesTablePage;
