"use client";


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import { FaTools, FaBoxOpen, FaUsers, FaTruck, FaChartLine } from "react-icons/fa";
import ProductBarChart from "@/components/WidgetItem";
import SaleLineChart from "@/components/WidgetItem2";
import { getAllProviders } from "@/app/api/providers.api";
import { getAllProducts } from "@/app/api/products.api";
import { getAllCustomers } from "@/app/api/customers.api";
import { getAllSales } from "@/app/api/sales.api";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [totalProviders, setTotalProviders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);;
  const [newUser, setNewUser] = useState(false);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  useEffect(() => {
    // Verifica si el parámetro "newUser" está presente en la URL
    const searchParams = new URLSearchParams(window.location.search);
    setNewUser(searchParams.get("newUser") === "true");
  }, []);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await getAllProviders(0, 1000);
        setTotalProviders(res.data?.length || 0);
      } catch {
        setTotalProviders(0);
      }
    }
    fetchProviders();
  }, []);
  useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await getAllProducts(0, 1000); 
      setTotalProducts(res.data?.length || 0);   
    } catch {
      setTotalProducts(0);
    }
  }
  fetchProducts();
}, []);
  const [totalCustomers, setTotalCustomers] = useState(0);

useEffect(() => {
  async function fetchClients() {
    try {
      const res = await getAllCustomers(0, 1000); 
      setTotalCustomers(res.data?.length || 0);   
    } catch {
      setTotalCustomers(0);
    }
  }
  fetchClients();
}, []);
  useEffect(() => {
  async function fetchSales() {
    try {
      const res = await getAllSales(0, 1000); 
      const sum = res.data?.reduce((acc, venta) => acc + (venta.total || 0), 0) || 0;
      setTotalSales(sum);
    } catch {
      setTotalSales(0);
    }
  }
  fetchSales();
}, []);

  if (status === "loading") {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 py-10">
       <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3 text-center w-full">
        {newUser
          ? "¡Bienvenido al sistema de Inventario Ferretería! Nos alegra que te unas a nosotros."
          : "¡Nos alegra tenerte de vuelta en el sistema de Inventario Ferretería!"}
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
          <span className="text-2xl font-bold text-blue-900">{totalProducts}</span>
        </li>
        <li className="flex flex-col items-center gap-3 bg-white rounded-lg shadow-sm p-6">
          <span className="bg-green-100 p-3 rounded-full">
            <FaTruck className="text-green-600" size={28} />
          </span>
          <span className="block text-sm text-green-700">Proveedores activos</span>
          <span className="text-2xl font-bold text-green-900">{totalProviders}</span>
        </li>
        <li className="flex flex-col items-center gap-3 bg-white rounded-lg shadow-sm p-6">
          <span className="bg-yellow-100 p-3 rounded-full">
            <FaUsers className="text-yellow-600" size={28} />
          </span>
          <span className="block text-sm text-yellow-700">Clientes Totales</span>
          <span className="text-2xl font-bold text-yellow-900">{totalCustomers}</span>
        </li>
        <li className="flex flex-col items-center gap-3 bg-white rounded-lg shadow-sm p-6">
          <span className="bg-purple-100 p-3 rounded-full">
            <FaTools className="text-purple-600" size={28} />
          </span>
          <span className="block text-sm text-purple-700">Ventas Totales</span>
          <span className="text-2xl font-bold text-purple-900">
            C${totalSales.toLocaleString()}
          </span>
          <span className="text-xs text-green-600 ml-2">+2% vs semana pasada</span>
        </li>
      </ul>
      <div className="flex flex-col gap-10 items-center w-full">
        <div className="w-full max-w-5xl">
          <ProductBarChart />
        </div>
      
        <div className="w-full max-w-5xl">
          <SaleLineChart />
        </div>
      </div>
    </main>
  );
}