import React, { useState } from 'react'

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(33)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-800/95 backdrop-blur-md border-t border-dark-700 px-4 py-3 z-30 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 w-1/3">
          <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-dark-700">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
              alt="Song"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <h4 className="text-sm font-bold text-white truncate">Your Song</h4>
            <p className="text-xs text-gray-400">AI Generated</p>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-center w-1/3">
          <button className="text-gray-400 hover:text-white transition">
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition shadow-lg shadow-white/20"
          >
            <i className={`fa-solid fa-${isPlaying ? 'pause' : 'play'} ml-1`}></i>
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <i className="fa-solid fa-forward-step"></i>
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 w-1/3">
          <button className="text-gray-400 hover:text-brand-purple transition">
            <i className="fa-solid fa-expand"></i>
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
        <span>0:00</span>
        <div className="flex-1 h-1.5 bg-dark-600 rounded-full relative overflow-hidden group cursor-pointer">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className="absolute inset-y-0 w-3 h-3 bg-white rounded-full -top-0.5 shadow-md opacity-0 group-hover:opacity-100 transition"
            style={{ left: `calc(${progress}% - 6px)` }}
          ></div>
        </div>
        <span>4:07</span>
      </div>
    </div>
  )
}
