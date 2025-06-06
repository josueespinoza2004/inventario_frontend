import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SaleForm from "@/components/sales/sale-form";

export default function EditSalePage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Venta</CardTitle>
        </CardHeader>
        <CardContent>
          <SaleForm saleId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}