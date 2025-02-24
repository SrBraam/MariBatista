/*
  # Add Registrations and Newsletter Tables

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `course_ids` (uuid array)
      - `message` (text)
      - `status` (text)
      - `created_at` (timestamp)
      
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public insert and authenticated read access
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;
    DROP POLICY IF EXISTS "Allow authenticated users to read registrations" ON registrations;
    DROP POLICY IF EXISTS "Allow public to subscribe to newsletter" ON newsletter_subscribers;
    DROP POLICY IF EXISTS "Allow authenticated users to read newsletter subscribers" ON newsletter_subscribers;
EXCEPTION
    WHEN undefined_table THEN
        NULL;
END $$;

-- Create registrations table if it doesn't exist
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course_ids uuid[] NOT NULL,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table if it doesn't exist
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for registrations
CREATE POLICY "Allow public to create registrations"
  ON registrations FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read registrations"
  ON registrations FOR SELECT TO authenticated
  USING (auth.role() = 'authenticated');

-- Create policies for newsletter_subscribers
CREATE POLICY "Allow public to subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read newsletter subscribers"
  ON newsletter_subscribers FOR SELECT TO authenticated
  USING (auth.role() = 'authenticated');

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS registrations_email_idx ON registrations(email);
CREATE INDEX IF NOT EXISTS registrations_created_at_idx ON registrations(created_at);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_email_idx ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_created_at_idx ON newsletter_subscribers(created_at);