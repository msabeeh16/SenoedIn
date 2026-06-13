'use client'

import { useState } from 'react'
import { Slider } from '../ui/Slider'
import { Button } from '../ui/Button'
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
  { key: 'actionsPerMinute',   label: 'Actions Per Minute',    minLabel: 'Meditative',       maxLabel: 'Unhinged' },
  { key: 'blindness',          label: 'Loot Blindness',        minLabel: 'Eagle-Eyed',        maxLabel: 'Legally Unaware' },
  { key: 'rageLevel',          label: 'Rage Level',            minLabel: 'Zen Master',        maxLabel: 'Controller Launched' },
  { key: 'lootAwareness',      label: 'Loot Awareness',        minLabel: 'Looted Everything', maxLabel: 'Left Diamonds' },
  { key: 'strategicIntegrity', label: 'Strategic Integrity',   minLabel: 'Grandmaster',       maxLabel: 'Digs Straight Down' },
  { key: 'commentary',         label: 'Commentary Quality',    minLabel: 'Silent Strategist', maxLabel: 'Screaming Philosopher' },
]

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [ratings, setRatings] = useState<RatingFields>(defaultRatings)

  const handleUrlBlur = () => {
    if (!url.trim()) return
    const id = parseYouTubeVideoId(url)
    if (!id) {
      setUrlError('Invalid YouTube URL. Try: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/')
      setVideoId(null)
    } else {
      setUrlError('')
      setVideoId(id)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoId) return
    const avg = calculateAverageRating(ratings)
    onSubmit({
      id: `review-${Date.now()}`,
      youtubeUrl: url,
      videoId,
      title: title.trim() || 'Untitled Performance Review',
      ratings,
      classification: classifyReviewScore(avg),
      timestamp: 'Just now',
    })
    setUrl('')
    setVideoId(null)
    setTitle('')
    setRatings(defaultRatings)
  }

  return (
    <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/50 to-transparent" />
      <div className="p-4">
        <h2 className="font-bold text-seno-text mb-4">Submit Performance Audit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="yt-url" className="text-xs font-semibold text-seno-muted uppercase tracking-wide">YouTube URL</label>
            <input
              id="yt-url"
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onBlur={handleUrlBlur}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-seno-card-2 border border-seno-border rounded-xl px-3 py-2.5 text-sm text-seno-text placeholder:text-seno-dim outline-none focus:border-seno-border-gold transition-colors"
            />
            {urlError && <p className="text-xs text-red-400">{urlError}</p>}
          </div>

          {videoId && (
            <>
              <YouTubeEmbed videoId={videoId} title={title || 'Performance audit subject'} />

              <div className="space-y-1.5">
                <label htmlFor="review-title" className="text-xs font-semibold text-seno-muted uppercase tracking-wide">Review Title</label>
                <input
                  id="review-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Stampy Sky Den S1 — Loot Blindness Incident"
                  className="w-full bg-seno-card-2 border border-seno-border rounded-xl px-3 py-2.5 text-sm text-seno-text placeholder:text-seno-dim outline-none focus:border-seno-border-gold transition-colors"
                />
              </div>

              <div className="bg-seno-card-2 rounded-2xl p-4 border border-seno-border space-y-4">
                <p className="text-[10px] font-bold text-seno-gold uppercase tracking-widest">Performance Metrics</p>
                {ratingConfig.map(({ key, label, minLabel, maxLabel }) => (
                  <Slider
                    key={key}
                    label={label}
                    name={key}
                    value={ratings[key]}
                    onChange={val => setRatings(prev => ({ ...prev, [key]: val }))}
                    minLabel={minLabel}
                    maxLabel={maxLabel}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-seno-dim">Classification: </span>
                  <span className="font-bold text-seno-text">{classifyReviewScore(calculateAverageRating(ratings))}</span>
                </div>
                <Button type="submit" disabled={!videoId}>Submit Audit</Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
