import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMetersState } from './useMetersState';
import { useMetersOperations } from './useMetersOperations';

export const useLifeMeters = () => {
  const { user } = useAuth();
  const { state, updateState } = useMetersState();
  const operations = useMetersOperations(user, updateState);

  useEffect(() => {
    if (user) {
      operations.fetchMeters();
    } else {
      updateState.reset();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    updateMeter: (id, delta) => operations.updateMeter(id, delta, state.meters),
    addCustomMeter: operations.addCustomMeter,
    refresh: operations.fetchMeters
  };
};