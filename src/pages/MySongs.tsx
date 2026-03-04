import React, { useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import { useSongsStore } from '../store/songs'

export default function MySongs() {
  const { user } = useAuthStore()
  const { songs, isLoading, fetchSongs, deleteSong } = useSongsStore()

  useEffect(() => {
    if (user) {
      fetchSongs(user.id)
    }
  }, [user, fetchSongs])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'failed':
        return 'text-red-400'
      case 'pending':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'fa-check-circle'
      case 'failed':
        return 'fa-exclamation-circle'
      case 'pending':
        return 'fa-hourglass-end'
      default:
        return 'fa-circle'
    }
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center py-10">
        <i className="fa-solid fa-spinner animate-spin text-4xl text-brand-purple mb-4"></i>
        <p className="text-gray-400">Loading your songs...</p>
      </div>
    )
  }

  if (songs.length === 0) {
    return (
      <div className="p-4 text-center py-10">
        <i className="fa-solid fa-compact-disc text-6xl text-dark-700 mb-4"></i>
        <h3 className="text-xl font-bold text-gray-300">My Songs Library</h3>
        <p className="text-gray-500 text-sm mt-2">
          Your generated tracks will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-4">My Songs ({songs.length})</h2>

      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-dark-800 border border-dark-700 rounded-xl p-4 hover:border-brand-purple transition group"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-dark-700">
              {song.cover_url ? (
                <img
                  src={song.cover_url}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="fa-solid fa-music text-2xl text-gray-600"></i>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{song.title}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {song.language === 'en'
                  ? 'English'
                  : song.language === 'hi'
                  ? 'Hindi'
                  : song.language}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className={`flex items-center gap-1 ${getStatusColor(song.status)}`}>
                  <i className={`fa-solid ${getStatusIcon(song.status)}`}></i>
                  {song.status.charAt(0).toUpperCase() + song.status.slice(1)}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{song.model_version}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <button className="text-gray-400 hover:text-brand-pink transition">
                <i className="fa-solid fa-download text-lg"></i>
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this song?')) {
                    deleteSong(song.id)
                  }
                }}
                className="text-gray-400 hover:text-red-400 transition"
              >
                <i className="fa-solid fa-trash text-lg"></i>
              </button>
            </div>
          </div>

          {song.lyrics && (
            <p className="text-xs text-gray-400 mt-3 line-clamp-2">{song.lyrics}</p>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-700">
            <span className="text-xs text-gray-500">
              {new Date(song.created_at).toLocaleDateString()}
            </span>
            {song.audio_url && (
              <button className="text-xs text-brand-purple hover:text-brand-pink transition flex items-center gap-1">
                <i className="fa-solid fa-play"></i> Play
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
