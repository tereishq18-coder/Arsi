import React, { useState } from 'react'
import type { ViewType } from '../components/Layout'

interface FeaturePageProps {
  feature: ViewType
}

const featureDetails: Record<
  ViewType,
  {
    title: string
    description: string
    icon: string
    color: string
  }
> = {
  'vocal-remover': {
    title: 'Vocal Remover',
    description: 'Remove vocals from any song and create instrumentals',
    icon: 'fa-microphone-lines',
    color: 'from-pink-500 to-purple-500',
  },
  'voice-changer': {
    title: 'Voice Changer',
    description: 'Transform your voice with AI-powered voice effects',
    icon: 'fa-robot',
    color: 'from-blue-500 to-cyan-500',
  },
  'music-video': {
    title: 'Music to Video',
    description: 'Generate stunning music videos from your songs',
    icon: 'fa-video',
    color: 'from-red-500 to-orange-500',
  },
  'music-to-midi': {
    title: 'Music to MIDI',
    description: 'Convert audio to MIDI format for music production',
    icon: 'fa-music',
    color: 'from-green-500 to-emerald-500',
  },
  'text-to-speech': {
    title: 'Text to Speech',
    description: 'Convert text to natural-sounding audio in multiple languages',
    icon: 'fa-microphone',
    color: 'from-indigo-500 to-purple-500',
  },
  'speech-to-text': {
    title: 'Speech to Text',
    description: 'Transcribe audio to text with high accuracy',
    icon: 'fa-quote-left',
    color: 'from-cyan-500 to-blue-500',
  },
  'sound-effects': {
    title: 'Sound Effects Library',
    description: 'Browse and download royalty-free sound effects',
    icon: 'fa-volume-high',
    color: 'from-yellow-500 to-orange-500',
  },
  create: { title: '', description: '', icon: '', color: '' },
  list: { title: '', description: '', icon: '', color: '' },
  admin: { title: '', description: '', icon: '', color: '' },
  features: { title: '', description: '', icon: '', color: '' },
}

export default function Features({ feature }: FeaturePageProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [output, setOutput] = useState('')

  const details = featureDetails[feature]

  if (!details.title) {
    return (
      <div className="p-4 text-center py-10">
        <p className="text-gray-400">Feature not found</p>
      </div>
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleProcess = async () => {
    if (!file) return

    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setOutput(`${details.title} processing completed for ${file.name}`)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className={`bg-gradient-to-r ${details.color} rounded-2xl p-6 shadow-lg relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <i className={`fa-solid ${details.icon} text-4xl text-white mb-3 block`}></i>
          <h1 className="text-3xl font-bold text-white mb-2">{details.title}</h1>
          <p className="text-white/80 text-sm">{details.description}</p>
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 space-y-4">
        <h3 className="font-semibold text-white mb-4">Upload File</h3>

        <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center hover:border-brand-purple transition">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-input"
            accept={
              feature === 'text-to-speech'
                ? '.txt,.pdf'
                : feature === 'speech-to-text'
                ? '.mp3,.wav,.ogg'
                : '.mp3,.wav,.ogg,.m4a'
            }
          />
          <label htmlFor="file-input" className="cursor-pointer">
            <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-500 mb-2 block"></i>
            <p className="text-white font-medium">
              {file ? file.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {feature === 'text-to-speech'
                ? 'TXT, PDF up to 10MB'
                : 'MP3, WAV, OGG up to 100MB'}
            </p>
          </label>
        </div>

        {feature === 'voice-changer' && (
          <div>
            <label className="text-sm font-semibold text-gray-200 block mb-2">
              Select Voice
            </label>
            <select className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-brand-purple">
              <option>Deep Voice</option>
              <option>High Pitch</option>
              <option>Robotic</option>
              <option>Whisper</option>
              <option>Echo</option>
            </select>
          </div>
        )}

        {feature === 'text-to-speech' && (
          <div>
            <label className="text-sm font-semibold text-gray-200 block mb-2">
              Select Language
            </label>
            <select className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-brand-purple">
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
        )}

        <button
          onClick={handleProcess}
          disabled={!file || isProcessing}
          className="w-full gradient-bg text-black font-bold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <i className="fa-solid fa-spinner animate-spin"></i>
              Processing...
            </>
          ) : (
            <>
              <i className="fa-solid fa-play"></i>
              Process
            </>
          )}
        </button>
      </div>

      {output && (
        <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-check-circle text-green-400 text-xl mt-1"></i>
            <div>
              <h4 className="font-semibold text-green-400">Complete!</h4>
              <p className="text-sm text-green-300 mt-1">{output}</p>
              <button className="text-xs text-green-400 hover:text-green-300 mt-2 flex items-center gap-1">
                <i className="fa-solid fa-download"></i> Download
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 pt-4 border-t border-dark-700">
        <h3 className="font-semibold text-white">Features Included</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          {feature === 'vocal-remover' && (
            <>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                High-quality vocal extraction
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                Adjustable separation quality
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                Supports all audio formats
              </li>
            </>
          )}
          {feature === 'music-video' && (
            <>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                AI-generated visuals
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                Multiple style options
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                4K resolution output
              </li>
            </>
          )}
          {feature === 'text-to-speech' && (
            <>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                Natural-sounding voices
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                8+ languages supported
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-green-400"></i>
                Adjustable speed and pitch
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
