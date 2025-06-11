"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/auth/register", {
        email,
        password,
      });
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

 return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-700">
      {/* Fondo animado */}
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="registerGrad1" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#a7c7e7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <ellipse
            cx="70%"
            cy="20%"
            rx="350"
            ry="160"
            fill="url(#registerGrad1)"
            style={{ animation: "move1 8s ease-in-out infinite alternate" }}
          />
          <ellipse
            cx="30%"
            cy="80%"
            rx="250"
            ry="120"
            fill="#38bdf8"
            opacity="0.25"
            style={{ animation: "move2 10s ease-in-out infinite alternate" }}
          />
        </svg>
        <style>
          {`
            @keyframes move1 {
              0% { transform: translateY(0px);}
              100% { transform: translateY(30px);}
            }
            @keyframes move2 {
              0% { transform: translateX(0px);}
              100% { transform: translateX(40px);}
            }
          `}
        </style>
      </div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
          Crear Cuenta
        </h1>
        <p className="text-blue-900 mb-6 text-center">
          Regístrate para acceder al inventario de tu ferretería
        </p>
        <form onSubmit={handleRegister} className="space-y-5 w-full">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}