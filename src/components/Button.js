import React from 'react';
import './LifeMeter.css'; // We'll use this for consistent styles

const Button = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="life-meter-button"
    >
      {label}
    </button>
  );
};

export default Button;
