import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWarehouse, faEgg, faUsers, faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Logotype from '../TopBar/Topbar_landingpage';

const ownerMenuItems = [
    {
        menu: 'Beranda',
        link: '/dashboard/',
        icon: faHome,
    },
    {
        menu: 'Kandang',
        link: '/dashboard/kandang',
        icon: faWarehouse,
    },
    {
        menu: 'Panen',
        link: '/dashboard/panen',
        icon: faEgg,
    },
    {
        menu: 'Pekerja',
        link: '/dashboard/pekerja',
        icon: faUsers,
    },
];

const anakKandangMenuItems = [
    {
        menu: 'Beranda',
        link: '/dashboard/',
        icon: faHome,
    },
    {
        menu: 'Input Data',
        link: '/dashboard/input-data',
        icon: faEdit,
    },
    {
        menu: 'Input Panen',
        link: '/dashboard/input-panen',
        icon: faEdit,
    },
];

export default function Sidebar() {
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const userId = localStorage.getItem('userId');
                if (!token || !userId) {
                    throw new Error('User is not authenticated');
                }

                const response = await fetch(`http://127.0.0.1:8080/api/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                const userRole = userData.data.status;

                if (userRole === 'owner') {
                    setMenuItems(ownerMenuItems);
                    setRole('owner');
                } else if (userRole === 'anak kandang') {
                    setMenuItems(anakKandangMenuItems);
                    setRole('anak kandang');
                }

                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error('Error fetching user role:', error);
                setLoading(false); // Ensure loading is set to false in case of error
            }
        };

        fetchUserRole();
    }, []);

    useEffect(() => {
        const updateActiveMenu = () => {
            const currentPath = router.asPath;

            if (currentPath === '/dashboard/') {
                setActiveMenu('/dashboard/');
            } else if (currentPath === '/dashboard/kandang') {
                setActiveMenu('/dashboard/kandang');
            } else if (currentPath === '/dashboard/rekap-data') {
                setActiveMenu('/dashboard/rekap-data');
            } else if (currentPath === '/dashboard/panen') {
                setActiveMenu('/dashboard/panen');
            } else if (currentPath === '/dashboard/pekerja') {
                setActiveMenu('/dashboard/pekerja');
            } else if (currentPath === '/dashboard/input-data') {
                setActiveMenu('/dashboard/input-data');
            } else if (currentPath === '/dashboard/input-panen') {
                setActiveMenu('/dashboard/input-panen');
            } else {
                setActiveMenu('');
            }
        };

        updateActiveMenu();
    }, [router.asPath]);

    const displayMenu = () => {
        return menuItems.map((item) => (
            <Link
                key={item.menu}
                href={item.link}
                className={`block w-64 py-3 ps-6 pe-6 mt-2 text-start rounded focus:outline-none transition-colors duration-300 ease-in-out ${
                    activeMenu === item.link ? 'bg-bromo-green-100 text-bromo-neutral-900' : 'bg-bromo-green-500 text-bromo-neutral-50'
                } hover:bg-bromo-green-100 hover:text-bromo-neutral-900 focus:bg-bromo-green-500 focus:text-bromo-neutral-50 active:bg-bromo-green-500 active:text-bromo-neutral-50 flex items-center`}
            >
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.menu}
            </Link>
        ));
    };

    const loadingItemsCount = role === 'owner' ? 4 : 3;

    if (loading) {
        return (
            <>
                <main>
                    <div className='flex flex-col h-full ps-3 pe-3 shadow-lg items-center bg-bromo-green-500'>
                        <div className='w-64 mt-3 p-3 rounded-lg bg-gradient-to-r from-bromo-neutral-50 to-bromo-green-50'>
                            <Logotype />
                        </div>
                        <div>
                            {[...Array(loadingItemsCount)].map((_, index) => (
                                <div
                                    key={index}
                                    className='block w-64 py-3 ps-6 pe-6 mt-2 text-start rounded focus:outline-none transition-colors duration-300 ease-in-out bg-bromo-green-400'>
                                    <div className='bg-bromo-green-400 text-bromo-green-400'>
                                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                                        Loading...
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <main>
                <div className='flex flex-col h-full ps-3 pe-3 shadow-lg items-center bg-bromo-green-500'>
                    <div className='w-64 mt-3 p-3 rounded-lg bg-gradient-to-r from-bromo-neutral-50 to-bromo-green-50'>
                        <Logotype />
                    </div>
                    <div>
                        {displayMenu()}
                    </div>
                </div>
            </main>
        </>
    );
}
