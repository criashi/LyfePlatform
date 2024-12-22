-- Improve the create_user_default_meters function with better error handling
CREATE OR REPLACE FUNCTION create_user_default_meters(user_uuid uuid)
RETURNS void AS $$
DECLARE
  meter_name text;
  inserted_count int := 0;
BEGIN
  -- Log start of function
  RAISE NOTICE 'Creating default meters for user: %', user_uuid;

  -- Create meters one by one with error handling
  FOR meter_name IN 
    SELECT unnest(ARRAY['Health', 'Career', 'Relationships', 'Finances', 'Personal Development'])
  LOOP
    BEGIN
      INSERT INTO meters (user_id, name, value)
      VALUES (user_uuid, meter_name, 0)
      ON CONFLICT (user_id, name) DO NOTHING;
      
      GET DIAGNOSTICS inserted_count = ROW_COUNT;
      
      IF inserted_count > 0 THEN
        RAISE NOTICE 'Created meter: % for user: %', meter_name, user_uuid;
      ELSE
        RAISE NOTICE 'Meter already exists: % for user: %', meter_name, user_uuid;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      -- Log error but continue with other meters
      RAISE WARNING 'Error creating meter % for user %: %', meter_name, user_uuid, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;