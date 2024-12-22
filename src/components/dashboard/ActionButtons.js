import React from 'react';

const ActionButton = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

const ActionButtons = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <ActionButton
        label="Add New Goal/Task"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
        onClick={() => console.log('Add New Goal/Task clicked')}
      />
      <ActionButton
        label="Daily Check-In"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
        onClick={() => console.log('Daily Check-In clicked')}
      />
    </div>
  );
};

export default ActionButtons;