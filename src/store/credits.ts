import { create } from 'zustand'
import { supabase, type Credits } from '../lib/supabase'

export type CreditsStore = {
  credits: Credits | null
  isLoading: boolean
  fetchCredits: (userId: string) => Promise<void>
  useCredits: (userId: string, amount: number) => Promise<void>
  resetDailyCredits: (userId: string) => Promise<void>
}

export const useCreditsStore = create<CreditsStore>((set, get) => ({
  credits: null,
  isLoading: false,

  fetchCredits: async (userId: string) => {
    set({ isLoading: true })
    const { data, error } = await supabase
      .from('credits')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      console.error('Error fetching credits:', error)
      set({ isLoading: false })
      return
    }

    set({ credits: data, isLoading: false })
  },

  useCredits: async (userId: string, amount: number) => {
    const current = get().credits
    if (!current) return

    const { error } = await supabase
      .from('credits')
      .update({
        amount: Math.max(0, current.amount - amount),
        total_used: current.total_used + amount,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)

    if (error) throw error

    await get().fetchCredits(userId)
  },

  resetDailyCredits: async (userId: string) => {
    const { error } = await supabase
      .from('credits')
      .update({
        amount: 6,
        reset_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)

    if (error) throw error
  },
}))
