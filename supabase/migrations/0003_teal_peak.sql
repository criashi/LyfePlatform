/*
  # Add default meters for existing users
  
  1. Changes
    - Adds default meters for all existing users
*/

DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN SELECT id FROM auth.users
  LOOP
    INSERT INTO meters (user_id, name)
    VALUES 
      (user_record.id, 'Health'),
      (user_record.id, 'Career'),
      (user_record.id, 'Relationships'),
      (user_record.id, 'Finances'),
      (user_record.id, 'Personal Development')
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;