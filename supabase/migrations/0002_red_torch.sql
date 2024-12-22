/*
  # Create meters table with initial data

  1. New Tables
    - `meters`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `value` (integer, 0-100)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `meters` table
    - Add policies for authenticated users to:
      - Read their own meters
      - Create new meters
      - Update their own meters
  
  3. Initial Data
    - Insert default life meters
*/

-- Create meters table
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

CREATE POLICY "Users can create meters"
  ON meters FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meters"
  ON meters FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert default meters function
CREATE OR REPLACE FUNCTION create_default_meters()
RETURNS trigger AS $$
BEGIN
  INSERT INTO meters (user_id, name)
  VALUES 
    (NEW.id, 'Health'),
    (NEW.id, 'Career'),
    (NEW.id, 'Relationships'),
    (NEW.id, 'Finances'),
    (NEW.id, 'Personal Development');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create default meters for new users
CREATE OR REPLACE TRIGGER create_default_meters_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_default_meters();