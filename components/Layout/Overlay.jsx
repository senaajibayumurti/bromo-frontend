import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const Overlay = ({ text, onYes, onNo }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <p className="mb-4 text-lg font-semibold">{text}</p>
                <div className="flex justify-center gap-4">
                    <Button id="btnYes" label="Ya" onClick={onYes} type="success" />
                    <Button id="btnNo" label="Tidak" onClick={onNo} type="error" />
                </div>
            </div>
        </div>
    );
};

Overlay.propTypes = {
    text: PropTypes.string.isRequired,
    onYes: PropTypes.func.isRequired,
    onNo: PropTypes.func.isRequired,
};

export default Overlay;