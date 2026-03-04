import React from 'react'
import { useAuthStore } from '../store/auth'
import { useCreditsStore } from '../store/credits'
import type { ViewType } from './Layout'

interface SidebarProps {
  open: boolean
  onClose: () => void
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  isAdmin: boolean
}

export default function Sidebar({
  open,
  onClose,
  currentView,
  onViewChange,
  isAdmin,
}: SidebarProps) {
  const { user, logout } = useAuthStore()
  const { credits } = useCreditsStore()

  const handleNavClick = (view: ViewType) => {
    onViewChange(view)
    onClose()
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const creditDisplay = isAdmin ? 'Unlimited' : credits?.amount || 0

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-72 bg-dark-800 border-r border-dark-700 z-50 transform transition-transform duration-300 flex flex-col ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6 flex items-center justify-between border-b border-dark-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <i className="fa-solid fa-music text-xs text-white"></i>
          </div>
          <span className="font-bold text-lg">AI Song Gen</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          <button
            onClick={() => handleNavClick('create')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
              currentView === 'create'
                ? 'bg-dark-700 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-wand-magic-sparkles text-brand-purple w-5"></i>
            Create Song
          </button>
          <button
            onClick={() => handleNavClick('list')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition ${
              currentView === 'list'
                ? 'bg-dark-700 text-white'
                : 'text-gray-400 hover:bg-dark-700 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-list text-gray-500 w-5"></i>
            My Songs
          </button>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Features{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-1">
                NEW
              </span>
            </p>
            {[
              { id: 'vocal-remover', icon: 'fa-microphone-lines', label: 'Vocal Remover' },
              { id: 'voice-changer', icon: 'fa-robot', label: 'Voice Changer' },
              { id: 'music-video', icon: 'fa-video', label: 'Music to Video' },
              { id: 'music-to-midi', icon: 'fa-music', label: 'Music to MIDI' },
              { id: 'text-to-speech', icon: 'fa-microphone', label: 'Text to Speech' },
              { id: 'speech-to-text', icon: 'fa-quote-left', label: 'Speech to Text' },
              { id: 'sound-effects', icon: 'fa-volume-high', label: 'Sound Effects' },
            ].map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleNavClick(feature.id as ViewType)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition group ${
                  currentView === feature.id
                    ? 'bg-dark-700 text-white'
                    : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i
                    className={`fa-solid ${feature.icon} text-gray-500 group-hover:text-brand-pink transition w-5`}
                  ></i>
                  {feature.label}
                </div>
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-dark-700 mt-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-400 hover:bg-dark-700 hover:text-white transition">
              <i className="fa-solid fa-tag text-gray-500 w-5"></i>
              Pricing
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-400 hover:bg-dark-700 hover:text-white transition">
              <i className="fa-solid fa-envelope text-gray-500 w-5"></i>
              Contact
            </button>
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-dark-700 bg-dark-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-lg font-bold">
            {user?.username?.[0]?.toUpperCase() || 'X'}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white">{user?.username}</h4>
            <p className="text-xs text-gray-500">{isAdmin ? 'Admin' : 'Pro'} Plan</p>
          </div>
          <div className="bg-dark-700 px-2 py-1 rounded text-xs font-mono text-brand-purple border border-dark-600">
            {creditDisplay} Credits
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => handleNavClick('admin')}
            className="w-full py-2 bg-blue-900/30 hover:bg-blue-900/50 text-xs text-blue-400 rounded-lg transition flex items-center justify-center gap-2 border border-blue-500/30 mb-2"
          >
            <i className="fa-solid fa-user-shield"></i> Admin Panel
          </button>
        )}

        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-900/20 hover:bg-red-900/40 text-xs text-red-400 rounded-lg transition flex items-center justify-center gap-2 border border-red-500/30"
        >
          <i className="fa-solid fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </aside>
  )
}
