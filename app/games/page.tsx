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
    <div className="max-w-xl mx-auto px-3 py-4 space-y-4">
      {/* Header */}
      <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/40 to-transparent" />
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-seno-gold-tint border border-seno-border-gold flex items-center justify-center">
              <Gamepad2 size={20} className="text-seno-gold" />
            </div>
            <div>
              <h1 className="text-base font-black text-seno-text">Watcher&apos;s Log</h1>
              <p className="text-xs text-seno-dim">Backseat Gaming Analytics Division</p>
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
          <h2 className="text-sm font-bold text-seno-text">Performance Audit Archive</h2>
          <span className="text-[10px] text-seno-dim bg-seno-card border border-seno-border px-2 py-0.5 rounded-full">
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
  )
}
