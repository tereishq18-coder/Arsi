import React, { useState } from 'react'
import { useAuthStore } from '../store/auth'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login, signup } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await signup(email, password, username)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-dark-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-dark-800/80 backdrop-blur border border-dark-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <i className="fa-solid fa-music text-lg text-white"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center gradient-text mb-2">
            AI Song Generator
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            Create amazing music with AI
          </p>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition"
                  placeholder="Choose a username"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-bg text-black font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                }}
                className="text-brand-purple hover:text-brand-pink transition font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-dark-700">
            <p className="text-xs text-gray-500 text-center">
              For demo purposes: Use admin@example.com / password123 to access admin features
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
