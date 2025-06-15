// filepath: 
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WidgetItem } from "../../components";
import LogoutButton from "@/components/LogoutButton";
import { useEffect } from "react";
import { FaTools, FaBoxOpen, FaUsers, FaTruck, FaChartLine } from "react-icons/fa";
import ProductBarChart from "@/components/WidgetItem";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  console.log("Session Data:", session); // Agrega este log para depurar

 return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3 text-center w-full">
        ¡Nos alegra tenerte de vuelta en el sistema de Inventario Ferretería!
      </h1>
      <p className="text-blue-900 text-center mb-2 text-lg w-full">
        Hoy es un buen día para mejorar tu negocio.
      </p>
      <blockquote className="italic text-blue-700 text-center mb-6 w-full">
        💡 “La organización no garantiza el éxito, pero lo hace mucho más probable.”<br />
        <span className="not-italic font-semibold">¡Sigue así! 🛠️</span>
      </blockquote>
      <h3 className="text-blue-700 font-semibold mb-5 flex items-center gap-2 justify-center text-xl w-full">
        <FaChartLine className="inline text-blue-500" /> Resumen de Actividad
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4">
        <li className="flex flex-col items-center gap-3 bg-white rounded-lg shadow-sm p-6">
          <span className="bg-blue-100 p-3 rounded-full">
            <FaBoxOpen className="text-blue-600" size={28} />
          </span>
          <span className="block text-sm text-blue-700">Productos registrados</span>
          <span className="text-2xl font-bold text-blue-900">153</span>
        </li>
        <li className="flex flex-col items-center gap-3 bg-white rounded-lg shadow-sm p-6">
          <span className="bg-green-100 p-3 rounded-full">
            <FaTruck className="text-green-600" size={28} />
          </span>
          <span className="block text-sm text-green-700">Proveedores activos</span>
          <span className="text-2xl font-bold text-green-900">17</span>
        </li>
        <li className="flex flex-col items-center gap-3 bg-white rounded-lg shadow-sm p-6">
          <span className="bg-yellow-100 p-3 rounded-full">
            <FaUsers className="text-yellow-600" size={28} />
          </span>
          <span className="block text-sm text-yellow-700">Clientes frecuentes</span>
          <span className="text-2xl font-bold text-yellow-900">42</span>
        </li>
        <li className="flex flex-col items-center gap-3 bg-white rounded-lg shadow-sm p-6">
          <span className="bg-purple-100 p-3 rounded-full">
            <FaTools className="text-purple-600" size={28} />
          </span>
          <span className="block text-sm text-purple-700">Ventas Totales</span>
          <span className="text-2xl font-bold text-purple-900">$23,988</span>
          <span className="text-xs text-green-600 ml-2">+2% vs semana pasada</span>
        </li>
      </ul>
      <div className="w-full flex justify-center">
        <ProductBarChart />
      </div>
    </main>
  );
}