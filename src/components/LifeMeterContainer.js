import React, { useState } from 'react';
import LifeMeter from './LifeMeter';
import Button from './Button';

const LifeMeterContainer = () => {
  const [meters, setMeters] = useState([
    { id: 1, name: 'Health', value: 0 },
    { id: 2, name: 'Career', value: 0 },
    { id: 3, name: 'Relationships', value: 0 },
    { id: 4, name: 'Finances', value: 0 },
    { id: 5, name: 'Personal Development', value: 0 },
  ]);

  const updateMeter = (id, delta) => {
    setMeters((prevMeters) =>
      prevMeters.map((meter) =>
        meter.id === id
          ? {
              ...meter,
              value: Math.max(0, Math.min(100, meter.value + delta)),
            }
          : meter
      )
    );
  };

  return (
    <div className="life-meter-container">
      {meters.map((meter) => (
        <div key={meter.id} className="life-meter-row">
          <div className="button-group">
            <Button label="+" onClick={() => updateMeter(meter.id, 14.2857)} />
            <Button label="-" onClick={() => updateMeter(meter.id, -14.2857)} />
          </div>
          <div className="life-meter-details">
            <div className="life-meter-title">{meter.name}</div>
            <LifeMeter value={meter.value} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LifeMeterContainer;
