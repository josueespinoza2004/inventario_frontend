"use client";
import React from "react";
import ProductBarChart from "@/components/WidgetItem";


export default function Report() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Espacio para reportes</h1>
      <div className="w-full flex justify-center">
              <ProductBarChart />
            </div>
    </div>
  );
}