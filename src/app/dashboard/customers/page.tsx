import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerTable } from "../../../components/customers/customer-table";

function CustomersTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomersTablePage;