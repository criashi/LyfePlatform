import React from 'react';
import './LifeMeter.css';

const LifeMeter = ({ value }) => {
  // Gradient colors (representing the 7 increments)
  const gradientColors = [
    '#D62B28', // Red
    '#E34327', // Light Red-Orange
    '#EB8135', // Orange
    '#F4B13C', // Yellow-Orange
    '#F6D740', // Yellow
    '#92C950', // Yellow-Green
    '#35BD23'  // Dark Green
  ];

  // Calculate which color to display based on the value
  const step = Math.min(Math.floor((value / 100) * 7), 6); // Map value to steps 0-6
  const currentColor = gradientColors[step];

  return (
    <div className="life-meter-bar">
      <div
        className="life-meter-fill"
        style={{
          width: `${(value / 100) * 100}%`, // Ensure the correct width
          backgroundColor: currentColor,    // Apply the appropriate step color
          transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out'
        }}
      ></div>
    </div>
  );
};

export default LifeMeter;
