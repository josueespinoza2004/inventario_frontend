import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getAllSales } from "@/app/api/sales.api";

export default function SaleLineChart() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getAllSales(0, 1000)
      .then((result) => {
        const chartData = result.data.map((item: any) => ({
          customerId: item.customerId, 
          total: Number(item["C$"] || item.total || item.monto_total || 0),
        }));
        setSales(chartData);
      })
      .catch((err) => {
        console.error("Error fetching sales:", err);
        setSales([]);
      });
  }, []);

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow p-4 mt-8">
      <h4 className="text-lg font-semibold text-blue-800 mb-4">
        Ventas por cliente
      </h4>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={sales}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="customerId" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={{ r: 5, stroke: "#1d4ed8", strokeWidth: 2, fill: "#60a5fa" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
