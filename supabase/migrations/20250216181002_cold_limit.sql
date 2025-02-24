/*
  # Create publications table and policies

  1. New Tables
    - `publications`
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (text)
      - `description` (text)
      - `content` (text)
      - `link` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `publications` table
    - Add policy for public read access
    - Add policy for authenticated users to manage publications
*/

-- Create publications table if it doesn't exist
CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  content text,
  link text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and create new ones
DO $$ 
BEGIN
  -- Drop and recreate public read access policy
  DROP POLICY IF EXISTS "Allow public read access to publications" ON publications;
  CREATE POLICY "Allow public read access to publications"
    ON publications
    FOR SELECT
    TO public
    USING (true);

  -- Drop and recreate authenticated users management policy
  DROP POLICY IF EXISTS "Allow authenticated users to manage publications" ON publications;
  CREATE POLICY "Allow authenticated users to manage publications"
    ON publications
    USING (auth.role() = 'authenticated');
END $$;
