/*
  # Add Clients Table

  1. New Tables
    - clients
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - phone (text)
      - profession (text)
      - company (text)
      - notes (text)
      - avatar_url (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on clients table
    - Add policies for public and authenticated access
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  profession text NOT NULL,
  company text,
  notes text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to manage clients"
  ON clients FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS clients_email_idx ON clients(email);
CREATE INDEX IF NOT EXISTS clients_name_idx ON clients(name);