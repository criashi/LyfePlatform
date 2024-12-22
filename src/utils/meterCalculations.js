// Constants for meter value calculations
export const METER_INCREMENT = 100 / 7; // Exactly 14.2857142857...
export const MAX_METER_VALUE = 100;
export const MIN_METER_VALUE = 0;

/**
 * Calculates the new meter value ensuring it stays within bounds
 * Rounds to 2 decimal places to match database precision
 */
export const calculateMeterValue = (currentValue, delta) => {
  // Calculate new value
  const newValue = Number(currentValue) + delta;
  
  // Handle edge cases
  if (newValue >= MAX_METER_VALUE) return MAX_METER_VALUE;
  if (newValue <= MIN_METER_VALUE) return MIN_METER_VALUE;
  
  // Round to 2 decimal places for database storage
  return Math.round(newValue * 100) / 100;
};