/*
  # Add default meters functionality
  
  1. New Functions
    - `create_default_meters()`: Creates default meters for new users
  
  2. Triggers
    - Add trigger to automatically create default meters for new users
*/

-- Create function to insert default meters
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

-- Create trigger for new users
CREATE OR REPLACE TRIGGER create_default_meters_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_default_meters();