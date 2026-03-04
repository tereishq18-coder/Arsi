import { create } from 'zustand'
import { supabase, type Song } from '../lib/supabase'

export type SongCreateInput = {
  title: string
  lyrics: string
  description: string
  style: string
  genre: string
  mood: string
  language: string
  model_version: string
}

export type SongsStore = {
  songs: Song[]
  isLoading: boolean
  fetchSongs: (userId: string) => Promise<void>
  createSong: (userId: string, input: SongCreateInput) => Promise<Song>
  updateSong: (songId: string, updates: Partial<Song>) => Promise<void>
  deleteSong: (songId: string) => Promise<void>
}

export const useSongsStore = create<SongsStore>((set, get) => ({
  songs: [],
  isLoading: false,

  fetchSongs: async (userId: string) => {
    set({ isLoading: true })
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching songs:', error)
      set({ isLoading: false })
      return
    }

    set({ songs: data || [], isLoading: false })
  },

  createSong: async (userId: string, input: SongCreateInput) => {
    const { data, error } = await supabase
      .from('songs')
      .insert({
        user_id: userId,
        ...input,
        status: 'pending',
        credits_used: 4,
      })
      .select()
      .single()

    if (error) throw error

    set({ songs: [data, ...get().songs] })
    return data
  },

  updateSong: async (songId: string, updates: Partial<Song>) => {
    const { error } = await supabase
      .from('songs')
      .update(updates)
      .eq('id', songId)

    if (error) throw error

    set({
      songs: get().songs.map((song) =>
        song.id === songId ? { ...song, ...updates } : song
      ),
    })
  },

  deleteSong: async (songId: string) => {
    const { error } = await supabase
      .from('songs')
      .delete()
      .eq('id', songId)

    if (error) throw error

    set({ songs: get().songs.filter((song) => song.id !== songId) })
  },
}))
