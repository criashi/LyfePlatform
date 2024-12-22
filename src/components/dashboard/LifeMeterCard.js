import React from 'react';
import { useNavigate } from 'react-router-dom';
import LifeMeter from '../LifeMeter';
import MeterControls from './MeterControls';
import { METER_INCREMENT } from '../../utils/meterCalculations';

const LifeMeterCard = ({ meter, onUpdateMeter }) => {
  const navigate = useNavigate();
  const handleIncrement = () => onUpdateMeter(meter.id, METER_INCREMENT);
  const handleDecrement = () => onUpdateMeter(meter.id, -METER_INCREMENT);

  const getRoutePath = (meterName) => {
    return '/' + meterName.toLowerCase().replace(/ /g, '-');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{meter.name}</h3>
        <button
          onClick={() => navigate(getRoutePath(meter.name))}
          className="text-primary hover:text-opacity-80 text-sm font-medium transition-colors duration-200"
        >
          View Details
        </button>
      </div>
      <div className="mb-4">
        <LifeMeter value={meter.value} />
      </div>
      <div className="flex justify-end">
        <MeterControls
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>
    </div>
  );
};

export default LifeMeterCard;