'use client';

import { NavigationBar } from "@/components/navigationBar";
import { LoginForm } from "@/components/login-form";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/' // Update this URL if necessary
    }
  });

  if (error) {
    console.error('Error al iniciar sesión con Google:', error.message);
  } else {
    console.log('Inicio de sesión con Google exitoso');
  }
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavigationBar />
      <div className="grid min-h-svh lg:grid-cols-2 bg-white">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              {/* Pass the Google login function to the LoginForm */}
              <LoginForm onGoogleLogin={loginWithGoogle} />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="/Gradient.png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover scale-120 dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}