"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 via-cyan-300 to-blue-700">
      {/* Fondo animado */}
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%">
          <defs>
            <radialGradient id="homeGrad1" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#a7c7e7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <ellipse
            cx="70%"
            cy="20%"
            rx="350"
            ry="160"
            fill="url(#homeGrad1)"
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

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
          ¡Bienvenido al Inventario de Ferretería!
        </h1>
        <p className="text-blue-900 mb-6 text-center text-lg">
          Gestiona productos, clientes y ventas de forma eficiente y moderna.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/auth/login"
            className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/register"
            className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}

