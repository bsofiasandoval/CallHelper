'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginButton() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
    }
  };

  // Esta parte se ejecuta después del redireccionamiento
  useEffect(() => {
    const validateLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (user) {
        const res = await fetch("https://tubackend.com/auth/login-google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: user.email,
            user_id: user.id
          })
        });

        const result = await res.json();

        if (res.ok) {
          alert(`Login exitoso. Rol: ${result.rol}`);
          // Puedes guardar el resultado en contexto o navegar
        } else {
          alert(`Error: ${result.error}`);
        }
      }
    };

    validateLogin();
  }, []);

  return (
    <button onClick={loginWithGoogle} className="p-2 bg-blue-600 text-white rounded">
      Iniciar sesión con Google
    </button>
  );
}
