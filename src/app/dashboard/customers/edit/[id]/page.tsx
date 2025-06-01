import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomerForm from "@/components/customers/customer-form";

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerForm customerId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}