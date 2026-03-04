import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/auth'
import Sidebar from './Sidebar'
import Header from './Header'
import Player from './Player'

export type ViewType = 'create' | 'list' | 'admin' | 'features' | 'vocal-remover' | 'voice-changer' | 'music-video' | 'music-to-midi' | 'text-to-speech' | 'speech-to-text' | 'sound-effects'

interface LayoutProps {
  children: React.ReactNode
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export default function Layout({ children, currentView, onViewChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isAdmin } = useAuthStore()

  useEffect(() => {
    setSidebarOpen(false)
  }, [currentView])

  return (
    <div className="h-screen flex flex-col overflow-hidden max-w-md mx-auto bg-dark-900 shadow-2xl relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity opacity-100"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onViewChange={onViewChange}
        isAdmin={isAdmin}
      />

      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <main className="flex-1 overflow-y-auto pb-24 relative scroll-smooth bg-dark-900">
        {children}
      </main>

      <Player />
    </div>
  )
}
