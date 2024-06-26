import React from 'react';
import PropTypes from 'prop-types';

const Button = ({id, label, onClick, type, disabled }) => {
    let buttonStyle = '';
    switch (type) {
        case 'success':
            buttonStyle = 'bg-bromo-success-500 hover:bg-bromo-success-600 active:bg-bromo-success-700';
            break;
        case 'info':
            buttonStyle = 'bg-bromo-info-500 hover:bg-bromo-info-600 active:bg-bromo-info-700';
            break;
        case 'error':
            buttonStyle = 'bg-bromo-error-500 hover:bg-bromo-error-600 active:bg-bromo-error-700';
            break;
        default:
            buttonStyle = 'bg-bromo-green-500 hover:bg-bromo-green-600 active:bg-bromo-green-500';
    }

    return (
        <button
            id={`${id}`}
            type="button"
            className={`px-5 py-1.5 rounded-lg text-sm text-bromo-neutral-50 font-bold ${buttonStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['success', 'info', 'error']), // Menambahkan prop type baru
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    type: 'success', // Menetapkan default type menjadi 'success'
    disabled: false,
};

export default Button;
