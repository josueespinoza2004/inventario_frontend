import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProviderForm from "@/components/providers/provider-form";

export default function EditProviderPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Proveedor</CardTitle>
        </CardHeader>
        <CardContent>
          <ProviderForm providerId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}