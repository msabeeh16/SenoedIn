'use client'

import { useState, useEffect } from 'react'
import { ReviewForm } from '../../components/games/ReviewForm'
import { ReviewCard } from '../../components/games/ReviewCard'
import { seedGames } from '../../data/seed-games'
import { getStore } from '../../lib/storage'
import type { GameReview } from '../../lib/types'
import { Gamepad2 } from 'lucide-react'

export default function GamesPage() {
  const [userReviews, setUserReviews] = useState<GameReview[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getStore().getGameReviews().then(r => {
      setUserReviews(r)
      setLoaded(true)
    })
  }, [])

  const handleSubmit = async (review: GameReview) => {
    await getStore().addGameReview(review)
    setUserReviews(prev => [review, ...prev])
  }

  const allReviews = [...userReviews, ...seedGames]

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(56,189,248,0.1) 0%, transparent 55%), radial-gradient(ellipse 40% 25% at 90% 80%, rgba(99,102,241,0.08) 0%, transparent 50%), #0a0a0a' }}>
    <div className="max-w-xl mx-auto px-3 py-4 space-y-4">
      {/* Header */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #d4a017, #e8b420 50%, transparent)' }} />
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)' }}>
              <Gamepad2 size={20} style={{ color: '#d4a017' }} />
            </div>
            <div>
              <h1 className="text-base font-black text-seno-text">Watcher&apos;s Log</h1>
              <p className="text-xs" style={{ color: '#d4a017' }}>Backseat Gaming Analytics Division</p>
            </div>
          </div>
          <p className="text-xs text-seno-muted leading-relaxed">
            Evaluate creators with the confidence of someone who is not holding the controller. Submit a YouTube URL, rate across six professional metrics, receive a formal classification for your records.
          </p>
        </div>
      </div>

      <ReviewForm onSubmit={handleSubmit} />

      {/* Archive */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-0.5 h-3 rounded-full" style={{ background: 'linear-gradient(180deg, #d4a017, transparent)' }} />
          <h2 className="text-sm font-bold text-seno-text">Performance Audit Archive</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)', color: '#d4a017' }}>
            {allReviews.length} audits on file
          </span>
        </div>

        {!loaded ? (
          <div className="text-center py-12 text-seno-muted text-sm animate-pulse">
            Aligning stakeholders...
          </div>
        ) : allReviews.length === 0 ? (
          <div className="bg-seno-card border border-seno-border rounded-2xl p-6">
            <p className="text-center text-seno-muted text-sm">No active disputes. This is statistically unusual.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
