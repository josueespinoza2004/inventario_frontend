import { getSession } from "next-auth/react";

export async function downloadReport(endpoint: string, filename: string) {
  try {
    const session = await getSession(); 
    if (!session) {
      throw new Error("No se encontró la sesión. Por favor, inicia sesión.");
    }

    const res = await fetch(`http://localhost:4000/api/v1/reports/excel/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error("Error al descargar el reporte:", errorMessage);
      throw new Error(errorMessage);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Error al descargar el reporte:", error);
    alert("Hubo un error al descargar el reporte.");
  }
}