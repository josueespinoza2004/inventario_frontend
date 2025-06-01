import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerForm from "../../../../components/customers/customer-form";

function CustomersAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle> Agregar Un Nuevo Cliente </CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomersAddPage;