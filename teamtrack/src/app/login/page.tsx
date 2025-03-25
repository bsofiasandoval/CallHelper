'use client';

// login.tsx (React / Next.js, pero puede ser JS plano también)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://zotrotzbchucyexncqkb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdHJvdHpiY2h1Y3lleG5jcWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODk4NTIsImV4cCI6MjA1Njc2NTg1Mn0.EOirMypdkpljbQCDr_mf-3gIi_wYH6lxY2WAnyhWxm0'
);

const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/' // Cambia si es necesario
      }
    });
  
    if (error) console.error('Error al iniciar sesión:', error.message);
  };
  
  export default function LoginPage() {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/logo.png" alt="TeamTrack Logo" className="w-20 h-20 rounded-full" />
          </div>
  
          {/* Título */}
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido a TeamTrack</h1>
          <p className="text-sm text-gray-500">Inicia sesión con tu cuenta institucional para comenzar a gestionar tu equipo</p>
  
          {/* Botón de Google */}
          <button
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700">Iniciar sesión con Google</span>
          </button>
  
          <p className="text-xs text-gray-400 mt-4">
            Solo usuarios con correo @example.com pueden iniciar sesión
          </p>
        </div>
      </main>
    );
  }