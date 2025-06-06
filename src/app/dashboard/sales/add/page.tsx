import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SaleForm from "../../../../components/sales/sale-form";

function SalesAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle> Agregar una nueva venta </CardTitle>
        </CardHeader>
        <CardContent>
          <SaleForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SalesAddPage;