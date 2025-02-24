/*
  # Initial Schema Setup

  1. New Tables
    - courses
    - testimonials
    - registrations
    - lectures
    - publications

  2. Security
    - Enable RLS on all tables
    - Add appropriate access policies
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop policies for courses
  DROP POLICY IF EXISTS "Allow public read access to courses" ON courses;
  DROP POLICY IF EXISTS "Allow authenticated users to manage courses" ON courses;
  
  -- Drop policies for testimonials
  DROP POLICY IF EXISTS "Allow public read access to testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Allow authenticated users to manage testimonials" ON testimonials;
  
  -- Drop policies for registrations
  DROP POLICY IF EXISTS "Allow public to create registrations" ON registrations;
  DROP POLICY IF EXISTS "Allow authenticated users to manage registrations" ON registrations;
  
  -- Drop policies for lectures
  DROP POLICY IF EXISTS "Allow public read access to lectures" ON lectures;
  DROP POLICY IF EXISTS "Allow authenticated users to manage lectures" ON lectures;
  
  -- Drop policies for publications
  DROP POLICY IF EXISTS "Allow public read access to publications" ON publications;
  DROP POLICY IF EXISTS "Allow authenticated users to manage publications" ON publications;
END $$;

-- Create all tables first
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  format text NOT NULL,
  price decimal NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  text text NOT NULL,
  image_url text NOT NULL,
  featured boolean DEFAULT false,
  size text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course_id uuid REFERENCES courses(id),
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lectures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  spots integer NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  link text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS for all tables in a single transaction
DO $$ 
BEGIN
  ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
  ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
  ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
  ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
  ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
END $$;

-- Create policies for courses
CREATE POLICY "Allow public read access to courses"
  ON courses FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage courses"
  ON courses FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- Create policies for testimonials
CREATE POLICY "Allow public read access to testimonials"
  ON testimonials FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage testimonials"
  ON testimonials FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- Create policies for registrations
CREATE POLICY "Allow public to create registrations"
  ON registrations FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage registrations"
  ON registrations FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- Create policies for lectures
CREATE POLICY "Allow public read access to lectures"
  ON lectures FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage lectures"
  ON lectures FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- Create policies for publications
CREATE POLICY "Allow public read access to publications"
  ON publications FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage publications"
  ON publications FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');