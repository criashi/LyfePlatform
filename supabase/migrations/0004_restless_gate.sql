/*
  # Create meters schema with improved error handling

  1. Tables
    - `meters`: Stores life meter data
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `value` (integer, 0-100)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on meters table
    - Add policies for authenticated users
    
  3. Triggers
    - Create default meters for new users with error handling
*/

-- Create meters table if it doesn't exist
CREATE TABLE IF NOT EXISTS meters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  value integer DEFAULT 0 CHECK (value >= 0 AND value <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE meters ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own meters"
  ON meters FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meters"
  ON meters FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meters"
  ON meters FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to create default meters with error handling
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
  ON CONFLICT (id) DO NOTHING;  -- Safely handle duplicates
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error details to PostgreSQL logs
  RAISE WARNING 'Error creating default meters for user %: %', NEW.id, SQLERRM;
  -- Continue with user creation even if meters fail
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS create_default_meters_trigger ON auth.users;

-- Create new trigger
CREATE TRIGGER create_default_meters_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_default_meters();