'use client'

import { useState, useEffect } from 'react'
import { ReviewForm } from '../../components/games/ReviewForm'
import { ReviewCard } from '../../components/games/ReviewCard'
import { Card } from '../../components/ui/Card'
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
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <Card>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <Gamepad2 size={22} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-black text-seno-dark">Watcher&apos;s Log</h1>
            <p className="text-sm text-seno-muted">Skills Division · Backseat Gaming Analytics</p>
          </div>
        </div>
        <p className="text-sm text-seno-dark mt-2">
          Evaluate creators with the confidence of someone who is not holding the controller. Submit a YouTube URL, rate the performance across six professional metrics, and receive a formal classification for your records.
        </p>
      </Card>

      <ReviewForm onSubmit={handleSubmit} />

      {/* Saved audits */}
      <div>
        <h2 className="text-base font-bold text-seno-dark mb-4 flex items-center gap-2">
          <span>Performance Audit Archive</span>
          <span className="text-xs font-normal text-seno-muted">({allReviews.length} audits on file)</span>
        </h2>

        {!loaded ? (
          <div className="text-center py-12 text-seno-muted text-sm animate-pulse">
            Aligning stakeholders...
          </div>
        ) : allReviews.length === 0 ? (
          <Card>
            <p className="text-center text-seno-muted text-sm py-6">No active disputes. This is statistically unusual.</p>
          </Card>
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
