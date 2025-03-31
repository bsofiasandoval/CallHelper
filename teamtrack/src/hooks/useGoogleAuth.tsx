import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const useGoogleAuth = () => {
  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/main'
        }
      });

      if (error) {
        console.error('Error al iniciar sesión con Google:', error.message);
        return { error };
      }

      console.log('Inicio de sesión con Google exitoso');
      return { success: true };
    } catch (error) {
      console.error('Error inesperado:', error);
      return { error };
    }
  };

  return { loginWithGoogle };
};
