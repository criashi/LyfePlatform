/*
  # Life Meters Schema

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
*/

CREATE TABLE IF NOT EXISTS meters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  value integer DEFAULT 0 CHECK (value >= 0 AND value <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE meters ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own meters
CREATE POLICY "Users can read own meters"
  ON meters
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can create meters
CREATE POLICY "Users can create meters"
  ON meters
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own meters
CREATE POLICY "Users can update own meters"
  ON meters
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);