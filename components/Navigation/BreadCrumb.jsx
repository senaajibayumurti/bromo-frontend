// Breadcrumbs.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const Breadcrumbs = () => {
    const router = useRouter();
    const pathParts = router.pathname.split('/').filter(part => part);

    const handleClick = (index) => {
        const path = '/' + pathParts.slice(0, index + 1).join('/');
        router.push(path);
    };

    return (
        <nav className="flex items-center space-x-2 text-gray-600">
            <button onClick={() => router.push('/dashboard')} className="text-bromo-green-500">
                <FontAwesomeIcon icon={faHome} />
            </button>
            {pathParts.map((part, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <span>/</span>}
                    {part.toLowerCase() !== 'dashboard' && (
                        <button onClick={() => handleClick(index)} className="capitalize hover:underline">
                            {part}
                        </button>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
