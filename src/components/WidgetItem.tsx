import { FaTools } from "react-icons/fa";

export const WidgetItem = () => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-4 rounded-xl border border-blue-200 bg-blue-50 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <FaTools size={36} className="text-blue-700" />
          </div>
          <h5 className="text-lg text-blue-800 text-center font-semibold">
            Ventas Totales
          </h5>
          <h3 className="text-3xl font-bold text-blue-900 mt-2">$23,988</h3>
          <div className="flex items-center gap-2 mt-1">
            <svg
              className="w-3 h-3 text-green-500"
              viewBox="0 0 12 15"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 0L12 8H0L6 0Z" />
            </svg>
            <span className="text-green-600 font-medium">+2%</span>
            <span className="text-xs text-gray-500">(vs semana pasada)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
