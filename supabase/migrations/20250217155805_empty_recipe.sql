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

-- Create all tables first
DO $$ 
BEGIN
  -- Create tables if they don't exist
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
END $$;

-- Enable RLS for all tables
DO $$ 
BEGIN
  -- Enable RLS if not already enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'courses' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'testimonials' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'registrations' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'lectures' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'publications' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies with IF NOT EXISTS checks
DO $$ 
BEGIN
  -- Courses policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'courses' 
    AND policyname = 'Allow public read access to courses'
  ) THEN
    CREATE POLICY "Allow public read access to courses"
      ON courses FOR SELECT TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'courses' 
    AND policyname = 'Allow authenticated users to manage courses'
  ) THEN
    CREATE POLICY "Allow authenticated users to manage courses"
      ON courses FOR ALL TO authenticated
      USING (auth.role() = 'authenticated');
  END IF;

  -- Testimonials policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'testimonials' 
    AND policyname = 'Allow public read access to testimonials'
  ) THEN
    CREATE POLICY "Allow public read access to testimonials"
      ON testimonials FOR SELECT TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'testimonials' 
    AND policyname = 'Allow authenticated users to manage testimonials'
  ) THEN
    CREATE POLICY "Allow authenticated users to manage testimonials"
      ON testimonials FOR ALL TO authenticated
      USING (auth.role() = 'authenticated');
  END IF;

  -- Registrations policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'registrations' 
    AND policyname = 'Allow public to create registrations'
  ) THEN
    CREATE POLICY "Allow public to create registrations"
      ON registrations FOR INSERT TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'registrations' 
    AND policyname = 'Allow authenticated users to manage registrations'
  ) THEN
    CREATE POLICY "Allow authenticated users to manage registrations"
      ON registrations FOR ALL TO authenticated
      USING (auth.role() = 'authenticated');
  END IF;

  -- Lectures policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'lectures' 
    AND policyname = 'Allow public read access to lectures'
  ) THEN
    CREATE POLICY "Allow public read access to lectures"
      ON lectures FOR SELECT TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'lectures' 
    AND policyname = 'Allow authenticated users to manage lectures'
  ) THEN
    CREATE POLICY "Allow authenticated users to manage lectures"
      ON lectures FOR ALL TO authenticated
      USING (auth.role() = 'authenticated');
  END IF;

  -- Publications policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'publications' 
    AND policyname = 'Allow public read access to publications'
  ) THEN
    CREATE POLICY "Allow public read access to publications"
      ON publications FOR SELECT TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'publications' 
    AND policyname = 'Allow authenticated users to manage publications'
  ) THEN
    CREATE POLICY "Allow authenticated users to manage publications"
      ON publications FOR ALL TO authenticated
      USING (auth.role() = 'authenticated');
  END IF;
END $$;