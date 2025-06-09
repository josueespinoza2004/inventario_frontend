"use client";

import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import { signOut } from "next-auth/react"; // Importa signOut
import {
  IoCalendarOutline,
  IoGridOutline,
  IoStorefrontOutline,
  IoPeopleOutline,
  IoHammerOutline,
  IoCashOutline,
} from "react-icons/io5";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
    {
    icon: <IoHammerOutline />,
    title: "Productos",
    path: "/dashboard/products",
  },
  {
    icon: <IoGridOutline />,
    title: "Categorias",
    path: "/dashboard/categories",
  },
  {
    icon: <IoStorefrontOutline />,
    title: "Proveedores",
    path: "/dashboard/providers",
  },
  {
    icon: <IoPeopleOutline />,
    title: "Clientes",
    path: "/dashboard/customers",
  },
  {
    icon: <IoCashOutline />,
    title: "Ventas",
    path: "/dashboard/sales",
  },
];

export const Sidebar = () => {
  const handleLogout = () => {
    signOut(); // Llama a la función signOut para cerrar sesión
  };

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="#" title="home">
            <Image
              src="https://cdn2.iconfinder.com/data/icons/startup-12/512/18-Setting-512.png"
              className="w-15"
              alt="tailus logo"
              width={50}
              height={50}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src="https://wallpapers.com/images/high/dr-strange-blurry-city-background-hftgodkniu88auel.webp"
            width={150}
            height={150}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Josue Nathalie Mayra
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button
          onClick={handleLogout} // Llama a handleLogout al hacer clic
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gray-100 transition duration-200"
        >
          <CiLogout className="text-xl" />
          <span className="group-hover:text-gray-700">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
