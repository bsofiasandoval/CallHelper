'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import NavigationAdmin from '@/components/navigationAdmin';
import NavigationLg from '@/components/navigationLg';

export default function MainPage() {
    const [loading, setLoading] = useState<boolean>(true);

    // Get user info from cookies
    const isAuthenticated = Cookies.get('userAuthenticated') === 'true';
    const userRole = Cookies.get('userRole');
    const userId = Cookies.get('userId');
    const organizationId = Cookies.get('organizationId');
    
    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            redirect('/login');
            return;
        }
        
        // Load user-specific data here
        const loadUserData = async (): Promise<void> => {
            try {
                // Fetch any additional data needed for the page
                setLoading(false);
            } catch (error) {
                console.error('Error loading user data:', error);
                setLoading(false);
            }
        };
        
        loadUserData();
    }, [isAuthenticated]);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    // Render different content based on user role
    if (userRole === 'admin') {
        return (
            <div>
                <NavigationAdmin />
                <h1>Admin Dashboard</h1>
                {/* Admin-specific content */}
            </div>
        );
    } else {
        return (
            <div>
                <NavigationLg />
                <h1>User Dashboard</h1>
                {/* Regular user content */}
            </div>
        );
    }
}
