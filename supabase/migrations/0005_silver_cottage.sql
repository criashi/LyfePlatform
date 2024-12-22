/*
  # Fix Default Meters Creation

  1. Changes
    - Drop and recreate create_default_meters function with better error handling
    - Ensure trigger is properly set up
    - Add logging for debugging
    - Add safety checks

  2. Security
    - Maintains existing RLS policies
    - No destructive operations
*/

-- Drop and recreate function with better error handling and logging
CREATE OR REPLACE FUNCTION create_default_meters()
RETURNS trigger AS $$
DECLARE
  default_meters text[] := ARRAY['Health', 'Career', 'Relationships', 'Finances', 'Personal Development'];
  meter_name text;
BEGIN
  -- Log start of function for debugging
  RAISE NOTICE 'Creating default meters for user: %', NEW.id;
  
  -- Create default meters
  FOREACH meter_name IN ARRAY default_meters
  LOOP
    BEGIN
      INSERT INTO public.meters (user_id, name, value)
      VALUES (NEW.id, meter_name, 0)
      ON CONFLICT (user_id, name) DO NOTHING;
      
      RAISE NOTICE 'Created meter: % for user: %', meter_name, NEW.id;
    EXCEPTION WHEN OTHERS THEN
      -- Log error but continue with other meters
      RAISE WARNING 'Error creating meter % for user %: %', meter_name, NEW.id, SQLERRM;
    END;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ensure trigger is dropped before recreating
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_meters();

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'meters_user_id_name_key'
  ) THEN
    ALTER TABLE public.meters 
    ADD CONSTRAINT meters_user_id_name_key 
    UNIQUE (user_id, name);
  END IF;
END $$;