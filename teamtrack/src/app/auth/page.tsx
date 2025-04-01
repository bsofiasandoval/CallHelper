'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import Cookies from 'js-cookie';

export function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { handleAuthCallback } = useGoogleAuth();


  useEffect(() => {
    const completeAuth = async (): Promise<void> => {
      try {
        const result = await handleAuthCallback();
        
        if (result.error) {
          setError(result.error);
          setTimeout(() => router.push('/login'), 3000);
        }
        if (result.success) {
          const userRole = Cookies.get('userRole');
          if (userRole === 'admin') {
            router.push('/admin');
          }
          if (userRole === 'user') {
            router.push('/user');
          }
        }
        
      } catch (err) {
        setError('Authentication failed');
        setTimeout(() => router.push('/login'), 3000);
      }
    };

    completeAuth();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">{error}</p>
        <p>Redirecting to login page...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Completando inicio de sesión...</p>
    </div>
  );
};

export default AuthCallback;