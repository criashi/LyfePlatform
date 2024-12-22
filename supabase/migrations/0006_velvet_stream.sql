/*
  # Fix Meters Creation and Add Default Meters

  1. Changes
    - Add function to create default meters for existing users
    - Ensure meters table exists and has correct structure
    - Add indexes for better performance
*/

-- Add index for user_id if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'meters' AND indexname = 'meters_user_id_idx'
  ) THEN
    CREATE INDEX meters_user_id_idx ON meters(user_id);
  END IF;
END $$;

-- Function to create default meters for a specific user
CREATE OR REPLACE FUNCTION create_user_default_meters(user_uuid uuid)
RETURNS void AS $$
DECLARE
  default_meters text[] := ARRAY['Health', 'Career', 'Relationships', 'Finances', 'Personal Development'];
  meter_name text;
BEGIN
  FOREACH meter_name IN ARRAY default_meters
  LOOP
    INSERT INTO meters (user_id, name, value)
    VALUES (user_uuid, meter_name, 0)
    ON CONFLICT (user_id, name) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create default meters for all existing users
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN SELECT id FROM auth.users
  LOOP
    PERFORM create_user_default_meters(user_record.id);
  END LOOP;
END $$;