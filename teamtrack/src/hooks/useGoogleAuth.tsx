import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Cookies from 'js-cookie';

// Define your types
interface EmployeeData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  emp_role: string;
  organization_id: string;
  auth_user_id: string;
}

interface AuthResult {
  success?: boolean;
  error?: any;
  user?: any;
  employeeData?: EmployeeData;
}

// Initialize Supabase client
const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const useGoogleAuth = () => {
  // Function to check authentication status and set cookies
  const checkAuthAndSetCookies = async (): Promise<AuthResult | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { user } = session;
        
        // Store basic user info in cookies
        Cookies.set('userAuthenticated', 'true', { expires: 7 });
        Cookies.set('userId', user.id, { expires: 7 });
        Cookies.set('userEmail', user.email || '', { expires: 7 });
        
        // Now fetch additional user data from your database
        const { data: employeeData, error: employeeError } = await supabase
          .from('employee')
          .select('*')
          .eq('email', user.email)
          .single();
          
        if (employeeData) {
          // Store role and organization info
          Cookies.set('userRole', employeeData.emp_role, { expires: 7 });
          Cookies.set('organizationId', employeeData.organization_id, { expires: 7 });
        } else if (employeeError) {
          console.error('Error fetching employee data:', employeeError);
        }
        
        return { user, employeeData };
      }
      
      return null;
    } catch (error) {
      console.error('Error checking auth:', error);
      return null;
    }
  };

  const loginWithGoogle = async (): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/auth'
        }
      });

      if (error) {
        console.error('Error al iniciar sesión con Google:', error.message);
        return { error };
      }

      console.log('Redirigiendo a Google para autenticación');
      return { success: true };
    } catch (error) {
      console.error('Error inesperado:', error);
      return { error };
    }
  };

  const logout = async (): Promise<AuthResult> => {
    try {
      await supabase.auth.signOut();
      
      // Clear all cookies
      Cookies.remove('userAuthenticated');
      Cookies.remove('userId');
      Cookies.remove('userEmail');
      Cookies.remove('userRole');
      Cookies.remove('organizationId');
      
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return { error };
    }
  };

  return { loginWithGoogle, checkAuthAndSetCookies, logout };
};