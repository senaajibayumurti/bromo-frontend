import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // tambahkan impor ini
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWarehouse, faListAlt, faEgg, faUsers, faDatabase, faFile, faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Logotype from '../TopBar/Topbar_landingpage';

// Menu items
const menuItems = [
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
        menu: 'Rekap Data',
        link: '/dashboard/rekap-data',
        icon: faListAlt,
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

    const updateActiveMenu = () => {
        const currentPath = router.asPath;

        // Modifikasi logika penentuan activeMenu
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
            setActiveMenu(''); // Tidak ada item yang set active jika URL diluar kriteria
        }
    };

    // Run once on component mount
    useEffect(() => {
        updateActiveMenu();
    }, []);

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

    return (
        <>
            <main>
                <div className='flex flex-col h-full ps-3 pe-3 shadow-lg items-center bg-bromo-green-500'>
                    <div className='w-full mt-3 p-3 rounded-lg bg-gradient-to-r from-bromo-neutral-50 to-bromo-green-50'>
                        <Logotype/>
                    </div>
                    <div>
                        {displayMenu()}
                    </div>
                </div>
            </main>
        </>
    );
}
