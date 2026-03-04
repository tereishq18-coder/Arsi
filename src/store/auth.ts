import { create } from 'zustand'
import { supabase, type Profile } from '../lib/supabase'

export type AuthStore = {
  user: Profile | null
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, username: string) => Promise<void>
  logout: () => Promise<void>
  initializeAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAdmin: false,

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle()

    if (profileError) throw profileError

    set({ user: profileData, isAdmin: profileData?.is_admin || false })
  },

  signup: async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user?.id,
        username,
        is_admin: false,
      })
      .select()
      .single()

    if (profileError) throw profileError

    await supabase
      .from('credits')
      .insert({
        user_id: data.user?.id,
        amount: 6,
        reset_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      })

    set({ user: profileData, isAdmin: false })
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    set({ user: null, isAdmin: false })
  },

  initializeAuth: async () => {
    set({ isLoading: true })

    const { data, error } = await supabase.auth.getSession()

    if (error || !data.session) {
      set({ isLoading: false })
      return
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.session.user.id)
      .maybeSingle()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
      set({ isLoading: false })
      return
    }

    set({
      user: profileData,
      isAdmin: profileData?.is_admin || false,
      isLoading: false
    })
  },
}))
