/*
  # Initialize AI Song Generator Database Schema

  1. New Tables
    - `profiles` - User profile data
    - `credits` - User credit system
    - `songs` - Generated songs metadata
    - `features_used` - Track feature usage
    - `admin_settings` - Admin configuration

  2. Security
    - Enable RLS on all tables
    - Implement proper access policies
    - Admin users have special privileges

  3. Key Features
    - Unlimited credits for admin users
    - Credit tracking for regular users
    - Song generation history
    - Feature usage tracking
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create credits table
CREATE TABLE IF NOT EXISTS credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount integer DEFAULT 0,
  total_used integer DEFAULT 0,
  reset_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own credits"
  ON credits FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (auth.uid() = user_id OR is_admin = true)
    )
  );

CREATE POLICY "System can update credits"
  ON credits FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create songs table
CREATE TABLE IF NOT EXISTS songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  lyrics text,
  description text,
  style text,
  genre text,
  mood text,
  language text DEFAULT 'en',
  duration integer,
  audio_url text,
  cover_url text,
  model_version text DEFAULT 'v3.0',
  status text DEFAULT 'pending',
  credits_used integer DEFAULT 4,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own songs"
  ON songs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert songs"
  ON songs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own songs"
  ON songs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create features_used table
CREATE TABLE IF NOT EXISTS features_used (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feature_name text NOT NULL,
  count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE features_used ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own features"
  ON features_used FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  maintenance_mode boolean DEFAULT false,
  gpu_load integer DEFAULT 0,
  max_generation_time integer DEFAULT 120,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can read settings"
  ON admin_settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND is_admin = true
    )
  );

CREATE POLICY "Only admins can update settings"
  ON admin_settings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND is_admin = true
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS songs_user_id_idx ON songs(user_id);
CREATE INDEX IF NOT EXISTS songs_created_at_idx ON songs(created_at DESC);
CREATE INDEX IF NOT EXISTS credits_user_id_idx ON credits(user_id);
CREATE INDEX IF NOT EXISTS features_used_user_id_idx ON features_used(user_id);
