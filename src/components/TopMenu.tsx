import { CiBellOn, CiChat1, CiMenuBurger, CiSearch } from "react-icons/ci";
import { FaTools } from "react-icons/fa";
import { FaSquarePollVertical, FaBell  } from "react-icons/fa6";

export const TopMenu = () => {
  return (
    <div className="sticky z-10 top-0 h-20 border-b bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 shadow-md">
      <div className="px-6 flex items-center justify-between space-x-4 h-full">
        <div className="flex items-center gap-3">
          <FaTools size={36} className="text-white-700" />
          <div>
            <h1 className="text-2xl font-bold text-black-800">Inventario Ferretería</h1>
            <span className="text-xs text-black-700">¡Gestión eficiente de productos y clientes!</span>
          </div>
        </div>
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>
        <div className="flex space-x-2 items-center">
          <div hidden className="md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-blue-700">
              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <CiSearch />
              </span>
              <input
                type="search"
                name="leadingIcon"
                id="leadingIcon"
                placeholder="Buscar productos, clientes..."
                className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-blue-400 transition"
              />
            </div>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-blue-100 focus:bg-blue-200 active:bg-blue-300 md:hidden">
            <CiSearch />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-blue-100 focus:bg-blue-200 active:bg-blue-300">
            <FaSquarePollVertical size={25} />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-blue-100 focus:bg-blue-200 active:bg-blue-300"> 
            <FaBell  size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
