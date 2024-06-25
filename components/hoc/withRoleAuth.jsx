// components/hoc/withRoleAuth.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withRoleAuth = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const [isAuthorized, setIsAuthorized] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                router.replace('/login');
                return;
            }

            const fetchUserData = async () => {
                try {
                    const userId = localStorage.getItem('userId');
                    const response = await fetch(`http://127.0.0.1:8080/api/user/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }

                    const data = await response.json();
                    console.log('User data:', data);

                    const userRole = data.data.status; // Correctly extract the user role
                    console.log('User role:', userRole);

                    if (allowedRoles.includes(userRole)) {
                        setIsAuthorized(true);
                    } else {
                        router.replace('/unauthorized');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    router.replace('/login');
                }
            };

            fetchUserData();
        }, []);

        if (!isAuthorized) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withRoleAuth;
