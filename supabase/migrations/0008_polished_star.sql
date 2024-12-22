/*
  # Update meters table to use decimal values
  
  1. Changes
    - Change value column from integer to decimal for precise meter values
    - Add check constraint to ensure values stay between 0 and 100
    
  2. Data Migration
    - Safely converts existing integer values to decimal
*/

-- Change value column to decimal with proper constraints
ALTER TABLE meters 
  ALTER COLUMN value TYPE decimal(5,2) USING value::decimal(5,2),
  ALTER COLUMN value SET DEFAULT 0,
  ADD CONSTRAINT meters_value_range 
    CHECK (value >= 0 AND value <= 100);

-- Update function to use decimal values
CREATE OR REPLACE FUNCTION create_user_default_meters(user_uuid uuid)
RETURNS void AS $$
DECLARE
  meter_name text;
  inserted_count int := 0;
BEGIN
  FOR meter_name IN 
    SELECT unnest(ARRAY['Health', 'Career', 'Relationships', 'Finances', 'Personal Development'])
  LOOP
    BEGIN
      INSERT INTO meters (user_id, name, value)
      VALUES (user_uuid, meter_name, 0::decimal(5,2))
      ON CONFLICT (user_id, name) DO NOTHING;
      
      GET DIAGNOSTICS inserted_count = ROW_COUNT;
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Error creating meter % for user %: %', meter_name, user_uuid, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;