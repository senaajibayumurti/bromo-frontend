import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const TimedOverlay = ({ teks, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000); // Overlay akan menghilang setelah 2 detik

        return () => clearTimeout(timer);
    }, [onClose]);

    let bgColor = '';
    let icon = null;
    let iconColor = '';

    switch (type) {
        case 'success':
            bgColor = 'bg-bromo-success-500';
            icon = faCheck;
            iconColor = 'text-bromo-success-700';
            break;
        case 'info':
            bgColor = 'bg-bromo-info-500';
            icon = faInfoCircle;
            iconColor = 'text-bromo-info-700';
            break;
        case 'error':
            bgColor = 'bg-bromo-error-500';
            icon = faExclamationTriangle;
            iconColor = 'text-bromo-error-700';
            break;
        default:
            bgColor = 'bg-bromo-info-500';
            icon = faInfoCircle;
            iconColor = 'text-bromo-info-700';
    }

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg ${bgColor}`}>
            <div className="flex items-center">
                <FontAwesomeIcon icon={icon} className={`mr-2 ${iconColor}`} />
                <p className="text-white">{teks}</p>
            </div>
        </div>
    );
};

TimedOverlay.propTypes = {
    teks: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'info', 'error']).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TimedOverlay;
