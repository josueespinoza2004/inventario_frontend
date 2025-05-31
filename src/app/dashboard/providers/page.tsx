import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProviderTable } from "../../../components/providers/provider-table";

function ProvidersTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Proveedores</CardTitle>
        </CardHeader>
        <CardContent>
          <ProviderTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProvidersTablePage;