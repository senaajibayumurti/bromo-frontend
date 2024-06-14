import React from 'react';
import PropTypes from 'prop-types';

const RoundedContainer = ({ label, children, width }) => {
  return (
    <div className={`rounded-lg border border-stroke bg-neutral-50 px-5 py-3 shadow-default sm:px-7.5 xl:pb-3 shadow-md sha ${width}`}>
      {label && (
        <div className="border-b px-6.5 pb-1 mb-4">
          <h3 className="font-bold text-lg text-bromo-gray-900">
            {label}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
};

RoundedContainer.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  width: PropTypes.string, // Added PropTypes for the width
};

RoundedContainer.defaultProps = {
  width: 'w-full', // Default width is full width
};

export default RoundedContainer;
