'use client'

import { useState } from 'react'
import { Slider } from '../ui/Slider'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { YouTubeEmbed } from './YouTubeEmbed'
import { parseYouTubeVideoId, classifyReviewScore, calculateAverageRating } from '../../lib/utils/youtube'
import type { GameReview, RatingFields } from '../../lib/types'

interface ReviewFormProps {
  onSubmit: (review: GameReview) => void
}

const defaultRatings: RatingFields = {
  actionsPerMinute: 5,
  blindness: 5,
  rageLevel: 5,
  lootAwareness: 5,
  strategicIntegrity: 5,
  commentary: 5,
}

const ratingConfig: { key: string & keyof RatingFields; label: string; minLabel: string; maxLabel: string }[] = [
  { key: 'actionsPerMinute', label: 'Actions Per Minute', minLabel: 'Meditative', maxLabel: 'Unhinged' },
  { key: 'blindness', label: 'Loot Blindness', minLabel: 'Eagle-Eyed', maxLabel: 'Legally Unaware' },
  { key: 'rageLevel', label: 'Rage Level', minLabel: 'Zen Master', maxLabel: 'Controller Launched' },
  { key: 'lootAwareness', label: 'Loot Awareness', minLabel: 'Looted Everything', maxLabel: 'Left Diamonds' },
  { key: 'strategicIntegrity', label: 'Strategic Integrity', minLabel: 'Grandmaster', maxLabel: 'Digs Straight Down' },
  { key: 'commentary', label: 'Commentary Quality', minLabel: 'Silent Strategist', maxLabel: 'Screaming Philosopher' },
]

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [ratings, setRatings] = useState<RatingFields>(defaultRatings)
  const [, setSubmitted] = useState(false)

  const handleUrlBlur = () => {
    if (!url.trim()) return
    const id = parseYouTubeVideoId(url)
    if (!id) {
      setUrlError('Invalid YouTube URL. Supported: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/')
      setVideoId(null)
    } else {
      setUrlError('')
      setVideoId(id)
    }
  }

  const handleRating = (key: keyof RatingFields, val: number) => {
    setRatings(prev => ({ ...prev, [key]: val }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoId) return
    const avg = calculateAverageRating(ratings)
    const review: GameReview = {
      id: `review-${Date.now()}`,
      youtubeUrl: url,
      videoId,
      title: title.trim() || 'Untitled Performance Review',
      ratings,
      classification: classifyReviewScore(avg),
      timestamp: 'Just now',
    }
    onSubmit(review)
    setUrl('')
    setVideoId(null)
    setTitle('')
    setRatings(defaultRatings)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 100)
  }

  return (
    <Card>
      <h2 className="font-bold text-seno-dark mb-4">Submit Performance Audit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL input */}
        <div className="space-y-1.5">
          <label htmlFor="yt-url" className="text-sm font-medium text-seno-dark">YouTube URL</label>
          <input
            id="yt-url"
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onBlur={handleUrlBlur}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full bg-seno-surface border border-seno-border rounded-xl px-3 py-2 text-sm text-seno-dark placeholder:text-seno-muted outline-none focus:border-seno-blue transition-colors"
            aria-describedby={urlError ? 'url-error' : undefined}
          />
          {urlError && <p id="url-error" className="text-xs text-red-600">{urlError}</p>}
        </div>

        {videoId && (
          <>
            <YouTubeEmbed videoId={videoId} title={title || 'Performance audit subject'} />

            <div className="space-y-1.5">
              <label htmlFor="review-title" className="text-sm font-medium text-seno-dark">Performance Review Title</label>
              <input
                id="review-title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Minecraft Survival — Diamond Blindness Incident #7"
                className="w-full bg-seno-surface border border-seno-border rounded-xl px-3 py-2 text-sm text-seno-dark placeholder:text-seno-muted outline-none focus:border-seno-blue transition-colors"
              />
            </div>

            <div className="space-y-4 bg-seno-surface rounded-xl p-4">
              <p className="text-xs font-bold text-seno-dark uppercase tracking-wide">Performance Metrics</p>
              {ratingConfig.map(({ key, label, minLabel, maxLabel }) => (
                <Slider
                  key={key}
                  label={label}
                  name={key}
                  value={ratings[key]}
                  onChange={val => handleRating(key, val)}
                  minLabel={minLabel}
                  maxLabel={maxLabel}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-seno-muted">Classification: </span>
                <span className="font-semibold text-seno-dark">
                  {classifyReviewScore(calculateAverageRating(ratings))}
                </span>
              </div>
              <Button type="submit" disabled={!videoId}>
                Submit Audit
              </Button>
            </div>
          </>
        )}
      </form>
    </Card>
  )
}
