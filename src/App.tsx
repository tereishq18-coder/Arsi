import React, { useEffect, useState } from 'react'
import { useAuthStore } from './store/auth'
import { useCreditsStore } from './store/credits'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import CreateSong from './pages/CreateSong'
import MySongs from './pages/MySongs'
import AdminPanel from './pages/AdminPanel'
import Features from './pages/Features'
import type { ViewType } from './components/Layout'

export default function App() {
  const { user, isLoading, initializeAuth } = useAuthStore()
  const { fetchCredits } = useCreditsStore()
  const [currentView, setCurrentView] = useState<ViewType>('create')

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  useEffect(() => {
    if (user && !user.is_admin) {
      fetchCredits(user.id)
    }
  }, [user, fetchCredits])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-900">
        <div className="text-center">
          <i className="fa-solid fa-spinner animate-spin text-4xl text-brand-purple mb-4 block"></i>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'create' && <CreateSong />}
      {currentView === 'list' && <MySongs />}
      {currentView === 'admin' && <AdminPanel />}
      {[
        'vocal-remover',
        'voice-changer',
        'music-video',
        'music-to-midi',
        'text-to-speech',
        'speech-to-text',
        'sound-effects',
      ].includes(currentView) && <Features feature={currentView} />}
    </Layout>
  )
}
