import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaleTable } from "../../../components/sales/sale-table";

function SalesTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <SaleTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default SalesTablePage;