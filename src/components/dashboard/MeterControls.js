import React from 'react';

const MeterButton = ({ label, onClick, className }) => (
  <button
    onClick={onClick}
    className={`
      w-8 h-8 rounded-full 
      flex items-center justify-center 
      text-lg leading-none 
      border-2 
      hover:bg-gray-100 dark:hover:bg-gray-700 
      transition-colors duration-200 
      ${className}
    `}
  >
    <span className="inline-flex items-center justify-center h-full">{label}</span>
  </button>
);

const MeterControls = ({ onIncrement, onDecrement }) => {
  return (
    <div className="flex gap-2">
      <MeterButton
        label="+"
        onClick={onIncrement}
        className="border-green-500 text-green-500 dark:border-green-400 dark:text-green-400"
      />
      <MeterButton
        label="−"
        onClick={onDecrement}
        className="border-red-500 text-red-500 dark:border-red-400 dark:text-red-400"
      />
    </div>
  );
};

export default MeterControls;