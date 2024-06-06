import React from 'react';

const RoundedContainer = ({ label, children }) => {
  return (
    <div className="rounded-lg border border-stroke bg-neutral-50 px-5 py-3 shadow-default sm:px-7.5 xl:pb-3">
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

export default RoundedContainer;
