"use client";
import { useState } from "react";
import { Sidebar, TopMenu } from "../../components";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <Sidebar open={sidebarOpen} />
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        <TopMenu onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
