import React from 'react'
import { useAuthStore } from '../store/auth'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuthStore()

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-dark-800/80 backdrop-blur border-b border-dark-700 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-gray-300 hover:text-white transition"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <i className="fa-solid fa-music text-xs text-white"></i>
        </div>
        <span className="font-bold text-lg tracking-tight hidden sm:block">
          AI Song Generator
        </span>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <div className="text-right text-xs">
            <p className="font-semibold text-white">{user.username}</p>
            <p className="text-gray-500">{user.is_admin ? 'Admin' : 'Pro'}</p>
          </div>
        )}
        <div className="w-8 h-8 rounded-full border border-gray-600 overflow-hidden">
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="Language"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}
