// filepath: 
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WidgetItem } from "../../components";
import LogoutButton from "@/components/LogoutButton";
import { useEffect } from "react";

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
    <div>
      <div>
        {/* <h1>Dashboard</h1>
        <p>Bienvenido, {session?.user?.name}</p>
        <p>Rol: {session?.user?.role}</p> */}
        {/* <LogoutButton /> */}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WidgetItem />
      </div>
    </div>
  );
}