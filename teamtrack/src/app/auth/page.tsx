"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleAuth } from '@/hooks/useGoogleAuth'; // Adjust the path as needed

export function AuthCallback() {
  const router = useRouter();
  const { checkAuthAndSetCookies } = useGoogleAuth();

  useEffect(() => {
    const handleCallback = async (): Promise<void> => {
      // Process the authentication and set cookies
      const userData = await checkAuthAndSetCookies();
      
      if (userData) {
        // Redirect to main page after successful authentication
        router.push('/main');
      } else {
        // Redirect to login page if authentication failed
        router.push('/login');
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Completando inicio de sesión...</p>
    </div>
  );
};

export default AuthCallback;