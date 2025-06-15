import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Ejemplo de datos, reemplaza por tus datos reales
const data = [
  { name: "Martillo", stock: 50 },
  { name: "Llave Inglesa", stock: 30 },
  { name: "Taladro", stock: 20 },
];

export default function ProductBarChart({ products = data }) {
  return (
    <div className="w-full h-80 bg-white rounded-xl shadow p-4 mt-8">
      <h4 className="text-lg font-semibold text-blue-800 mb-4">Stock de productos</h4>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={products}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="url(#barGradient)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
