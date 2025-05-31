import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProviderForm from "../../../../components/providers/provider-form";

function ProvidersAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Un Nuevo Proveedor</CardTitle>
        </CardHeader>
        <CardContent>
          <ProviderForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProvidersAddPage;