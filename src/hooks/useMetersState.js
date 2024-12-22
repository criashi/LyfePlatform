import { useState } from 'react';

export const useMetersState = () => {
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateState = {
    setMeters,
    setLoading,
    setError,
    reset: () => {
      setMeters([]);
      setLoading(false);
      setError(null);
    }
  };

  return {
    state: { meters, loading, error },
    updateState
  };
};