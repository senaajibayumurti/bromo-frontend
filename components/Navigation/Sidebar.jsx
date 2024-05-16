import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWarehouse, faListAlt, faEgg, faTableList, faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Logotype from './Topbar_landingpage';

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
        menu: 'Klasifikasi',
        link: '/dashboard/klasifikasi',
        icon: faTableList,
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
];

export default function Sidebar() {
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState('');

    // Set active menu based on current URL
    const updateActiveMenu = () => {
        const currentPath = router.asPath;
        const active = menuItems.find(item => currentPath === item.link);
        setActiveMenu(active ? active.link : '/dashboard/');
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
                className={`block w-64 py-3 ps-3 pe-6 mt-2 text-start rounded focus:outline-none transition-colors duration-300 ease-in-out ${
                    activeMenu === item.link ? 'bg-bromo-green-1-500 text-bromo-gray-50' : 'bg-bromo-green-1-100 text-bromo-gray-900'
                } hover:bg-bromo-green-1-400 hover:text-bromo-gray-50 focus:bg-bromo-green-1-500 focus:text-bromo-gray-50 active:bg-bromo-green-1-500 active:text-bromo-gray-50 flex items-center`}
            >
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.menu}
            </Link>
        ));
    };

    return (
        <>
            <main>
                <div className='flex flex-col h-full ps-6 pe-3 shadow-lg items-center bg-bromo-green-1-100'>
                    <div className='w-full ps-3 py-8'>
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
