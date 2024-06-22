import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';


const RoundedContainer = ({ label, children, width, buttonLabel, onButtonClick, buttonType }) => {
  return (
    <div className={`relative rounded-lg border border-stroke bg-neutral-50 px-5 py-3 shadow-default sm:px-7.5 xl:pb-3 shadow-md ${width}`}>
      {label && (
        <div className="flex justify-between items-center border-b px-6.5 pb-1 mb-4">
          <h3 className="font-bold text-lg text-bromo-gray-900">
            {label}
          </h3>
          {buttonLabel && (
            <Button label={buttonLabel} onClick={onButtonClick} type={buttonType} />
          )}
        </div>
      )}
      {children}
    </div>
  );
};

RoundedContainer.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonType: PropTypes.string
};

RoundedContainer.defaultProps = {
  width: 'w-full', // Default width is full width
  buttonType: 'info' // Default button type
};

export default RoundedContainer;
