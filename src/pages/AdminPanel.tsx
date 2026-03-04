import React, { useState } from 'react'
import { useAuthStore } from '../store/auth'

export default function AdminPanel() {
  const { user } = useAuthStore()
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [gpuLoad, setGpuLoad] = useState(42)

  if (!user?.is_admin) {
    return (
      <div className="p-4 text-center py-10">
        <i className="fa-solid fa-lock text-6xl text-red-500 mb-4"></i>
        <h3 className="text-xl font-bold text-red-400">Access Denied</h3>
        <p className="text-gray-500 text-sm mt-2">
          You don't have admin privileges.
        </p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-2xl p-6 admin-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <h2 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h2>
        <p className="text-blue-200 text-sm mb-4">Full control over the platform</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-800/80 p-4 rounded-xl border border-dark-700">
            <p className="text-xs text-gray-400 uppercase">Credits</p>
            <p className="text-2xl font-bold text-green-400 flex items-center gap-2">
              <i className="fa-solid fa-infinity"></i> Unlimited
            </p>
          </div>
          <div className="bg-dark-800/80 p-4 rounded-xl border border-dark-700">
            <p className="text-xs text-gray-400 uppercase">Server Status</p>
            <p className="text-2xl font-bold text-green-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-400 uppercase">System Controls</h3>

        <div className="bg-dark-800 rounded-xl p-4 border border-dark-700 flex justify-between items-center">
          <div>
            <p className="text-white font-medium">Maintenance Mode</p>
            <p className="text-xs text-gray-500">Disable song generation for users</p>
          </div>
          <button
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`w-12 h-6 rounded-full relative transition ${
              maintenanceMode ? 'bg-red-600' : 'bg-dark-600'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full absolute top-0.5 transition ${
                maintenanceMode ? 'right-0.5 bg-white' : 'left-0.5 bg-gray-400'
              }`}
            ></div>
          </button>
        </div>

        <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-white font-medium">GPU Cluster Load</p>
              <p className="text-xs text-gray-500">Current utilization</p>
            </div>
            <span className="text-lg font-bold text-blue-400">{gpuLoad}%</span>
          </div>
          <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
              style={{ width: `${gpuLoad}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
          <p className="text-white font-medium mb-3">Generation Queue</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Pending Songs</span>
              <span className="font-semibold text-white">24</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Processing</span>
              <span className="font-semibold text-white">12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Completed Today</span>
              <span className="font-semibold text-green-400">1,342</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-400 uppercase">Feature Controls</h3>

        <div className="space-y-2">
          {[
            { name: 'Song Generation', enabled: true },
            { name: 'Music to Video', enabled: true },
            { name: 'Song to Video', enabled: true },
            { name: 'Vocal Remover', enabled: true },
            { name: 'Voice Changer', enabled: false },
            { name: 'Text to Speech', enabled: true },
            { name: 'Speech to Text', enabled: true },
            { name: 'Sound Effects', enabled: true },
          ].map((feature) => (
            <div
              key={feature.name}
              className="bg-dark-800 rounded-xl p-3 border border-dark-700 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">{feature.name}</span>
                {feature.enabled ? (
                  <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">
                    Enabled
                  </span>
                ) : (
                  <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">
                    Disabled
                  </span>
                )}
              </div>
              <button className="text-gray-400 hover:text-white transition">
                <i className="fa-solid fa-sliders"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-400 uppercase">User Management</h3>

        <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">1,234</p>
              <p className="text-xs text-gray-400 mt-1">Total Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-purple">24</p>
              <p className="text-xs text-gray-400 mt-1">Active Now</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
          <p className="text-white font-medium mb-3">Recent Activity</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Songs Generated</span>
              <span className="text-white font-semibold">4,521</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Credits Used</span>
              <span className="text-white font-semibold">18,084</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Avg. Gen. Time</span>
              <span className="text-white font-semibold">2m 34s</span>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl text-sm font-medium hover:bg-red-500/20 transition">
        Exit Admin Mode
      </button>
    </div>
  )
}
