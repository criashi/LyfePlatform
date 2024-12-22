import React from 'react';

const AddCustomMeterButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full mt-6 py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-md 
        transition-all duration-200 flex items-center justify-center space-x-2
        dark:bg-primary/90 dark:hover:bg-primary"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      <span>Add Custom Meter</span>
    </button>
  );
};

export default AddCustomMeterButton;