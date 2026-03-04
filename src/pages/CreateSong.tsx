import React, { useState } from 'react'
import { useAuthStore } from '../store/auth'
import { useCreditsStore } from '../store/credits'
import { useSongsStore } from '../store/songs'

export default function CreateSong() {
  const { user } = useAuthStore()
  const { credits } = useCreditsStore()
  const { createSong, fetchSongs } = useSongsStore()

  const [title, setTitle] = useState('My Song')
  const [lyrics, setLyrics] = useState('')
  const [description, setDescription] = useState('')
  const [style, setStyle] = useState('')
  const [genre, setGenre] = useState('')
  const [mood, setMood] = useState('')
  const [language, setLanguage] = useState('en')
  const [modelVersion, setModelVersion] = useState('v3.0')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const creditDisplay = user?.is_admin ? 'Unlimited' : credits?.amount || 0

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (!user.is_admin && credits && credits.amount < 4) {
      setError('Insufficient credits. You need 4 credits to generate a song.')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const song = await createSong(user.id, {
        title: title || 'Untitled Song',
        lyrics,
        description,
        style,
        genre,
        mood,
        language,
        model_version: modelVersion,
      })

      if (!user.is_admin && credits) {
        // In a real app, this would be done server-side
        // For now we'll just update the UI
      }

      alert('Song generation started! Check My Songs to see progress.')
      setTitle('My Song')
      setLyrics('')
      setDescription('')

      if (user) {
        await fetchSongs(user.id)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <form onSubmit={handleGenerate} className="space-y-6">
        <div className="flex bg-dark-800 p-1 rounded-xl w-fit mx-auto border border-dark-700">
          <button
            type="button"
            className="px-6 py-2 bg-dark-700 rounded-lg text-sm font-semibold text-white shadow"
          >
            Lyrics
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white"
          >
            Description
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg shadow-purple-900/40"
          >
            {modelVersion} <i className="fa-solid fa-chevron-down text-[10px]"></i>
            <span className="bg-red-500 text-[9px] px-1.5 rounded ml-1">NEW</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
            Lyrics
            <i className="fa-regular fa-circle-question text-gray-500"></i>
          </label>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder="Enter lyrics here..."
            className="w-full h-64 bg-dark-800 border border-dark-700 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-brand-purple resize-none leading-relaxed"
          ></textarea>
          <div className="flex justify-between text-xs text-gray-500">
            <div></div>
            <span>{lyrics.length}/5000</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
            Title
            <i className="fa-regular fa-circle-question text-gray-500"></i>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-dark-800 border border-dark-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-purple text-white"
          />
          <span className="text-xs text-gray-500 float-right">{title.length} / 80</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
            Style & Description
            <i className="fa-regular fa-circle-question text-gray-500"></i>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the style, mood, and instruments..."
            className="w-full h-24 bg-dark-800 border border-dark-700 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-brand-purple resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-200">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="e.g., Pop, Rock"
              className="w-full bg-dark-800 border border-dark-700 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-brand-purple text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-200">Mood</label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g., Happy, Sad"
              className="w-full bg-dark-800 border border-dark-700 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-brand-purple text-gray-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-200">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-dark-800 border border-dark-700 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-brand-purple text-gray-300"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="pt">Portuguese</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-200">Model</label>
            <select
              value={modelVersion}
              onChange={(e) => setModelVersion(e.target.value)}
              className="w-full bg-dark-800 border border-dark-700 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-brand-purple text-gray-300"
            >
              <option value="v3.0">v3.0 (Latest)</option>
              <option value="v2.0">v2.0</option>
            </select>
          </div>
        </div>

        <div className="pt-4 pb-8">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full h-14 rounded-full gradient-bg text-black font-bold text-lg shadow-lg shadow-purple-900/50 hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                Generating...
              </>
            ) : (
              <>
                Generate <i className="fa-solid fa-arrow-right"></i>
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-500 mt-3">
            {user?.is_admin
              ? 'Admin - Unlimited Credits'
              : `Generating costs 4 credits (You have ${creditDisplay} credits)`}
          </p>
        </div>
      </form>
    </div>
  )
}
