import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  username: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

export type Credits = {
  id: string
  user_id: string
  amount: number
  total_used: number
  reset_date: string | null
  created_at: string
  updated_at: string
}

export type Song = {
  id: string
  user_id: string
  title: string
  lyrics: string | null
  description: string | null
  style: string | null
  genre: string | null
  mood: string | null
  language: string
  duration: number | null
  audio_url: string | null
  cover_url: string | null
  model_version: string
  status: string
  credits_used: number
  created_at: string
  updated_at: string
}
