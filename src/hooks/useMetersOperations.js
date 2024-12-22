import { supabase } from '../lib/supabase';
import { calculateMeterValue } from '../utils/meterCalculations';
import { DEFAULT_METERS } from '../utils/constants';

export const useMetersOperations = (user, updateState) => {
  const fetchMeters = async () => {
    const { setMeters, setLoading, setError } = updateState;

    if (!user?.id) {
      setMeters([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch existing meters
      const { data: existingMeters, error: fetchError } = await supabase
        .from('meters')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      if (!existingMeters || existingMeters.length === 0) {
        // Call the database function to create default meters
        const { error: createError } = await supabase.rpc(
          'create_user_default_meters',
          { user_uuid: user.id }
        );

        if (createError) throw createError;

        // Fetch the newly created meters
        const { data: newMeters, error: refetchError } = await supabase
          .from('meters')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (refetchError) throw refetchError;
        setMeters(newMeters || []);
      } else {
        setMeters(existingMeters);
      }
    } catch (err) {
      console.error('Error handling meters:', err);
      setError('Failed to load meters. Please try refreshing the page.');
      setMeters([]);
    } finally {
      setLoading(false);
    }
  };

  const updateMeter = async (id, delta, currentMeters) => {
    const { setMeters, setError } = updateState;

    try {
      const meter = currentMeters.find(m => m.id === id);
      if (!meter) throw new Error('Meter not found');
      
      const newValue = calculateMeterValue(meter.value, delta);

      const { error: updateError } = await supabase
        .from('meters')
        .update({ value: newValue })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (updateError) throw updateError;

      setMeters(prevMeters =>
        prevMeters.map(m =>
          m.id === id ? { ...m, value: newValue } : m
        )
      );
      setError(null);
    } catch (err) {
      console.error('Error updating meter:', err);
      setError('Failed to update meter. Please try again.');
    }
  };

  const addCustomMeter = async (name) => {
    const { setMeters, setError } = updateState;

    try {
      // Check if meter with same name already exists
      const { data: existing } = await supabase
        .from('meters')
        .select('id')
        .eq('user_id', user?.id)
        .eq('name', name)
        .single();

      if (existing) {
        throw new Error('A meter with this name already exists');
      }

      const { data, error: insertError } = await supabase
        .from('meters')
        .insert([{ 
          name,
          value: 0,
          user_id: user?.id
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      setMeters(prevMeters => [...prevMeters, data]);
      setError(null);
    } catch (err) {
      console.error('Error adding meter:', err);
      setError(err.message || 'Failed to add custom meter. Please try again.');
    }
  };

  return {
    fetchMeters,
    updateMeter,
    addCustomMeter
  };
};