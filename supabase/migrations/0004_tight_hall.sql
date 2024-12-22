/*
  # Update meters schema with safe policy creation

  1. Changes
    - Add policy creation with IF NOT EXISTS
    - Update trigger function with better error handling
    - Safe recreation of trigger
*/

-- Function to create default meters with improved error handling
CREATE OR REPLACE FUNCTION create_default_meters()
RETURNS trigger AS $$
BEGIN
  -- Create default meters in a safe way
  INSERT INTO meters (user_id, name)
  VALUES 
    (NEW.id, 'Health'),
    (NEW.id, 'Career'),
    (NEW.id, 'Relationships'),
    (NEW.id, 'Finances'),
    (NEW.id, 'Personal Development')
  ON CONFLICT DO NOTHING;
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error details to PostgreSQL logs
  RAISE WARNING 'Error creating default meters for user %: %', NEW.id, SQLERRM;
  -- Continue with user creation even if meters fail
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Safely recreate trigger
DROP TRIGGER IF EXISTS create_default_meters_trigger ON auth.users;

CREATE TRIGGER create_default_meters_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_default_meters();

-- Add policies only if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'meters' AND policyname = 'Users can read own meters'
  ) THEN
    CREATE POLICY "Users can read own meters"
      ON meters FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'meters' AND policyname = 'Users can insert own meters'
  ) THEN
    CREATE POLICY "Users can insert own meters"
      ON meters FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'meters' AND policyname = 'Users can update own meters'
  ) THEN
    CREATE POLICY "Users can update own meters"
      ON meters FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;