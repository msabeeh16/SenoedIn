'use client'

import type { GameReview, RatingFields } from '../../lib/types'
import { Badge } from '../ui/Badge'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ReviewCardProps {
  review: GameReview
}

const METRIC_COLORS: Record<string, string> = {
  actionsPerMinute:   '#d4a017',
  blindness:          '#9B2335',
  rageLevel:          '#C42A40',
  lootAwareness:      '#22c55e',
  strategicIntegrity: '#a855f7',
  commentary:         '#3b82f6',
}

const ratingConfig: { key: string & keyof RatingFields; label: string; minLabel: string; maxLabel: string }[] = [
  { key: 'actionsPerMinute',   label: 'Actions Per Minute',   minLabel: 'Meditative',       maxLabel: 'Unhinged' },
  { key: 'blindness',          label: 'Loot Blindness',       minLabel: 'Eagle-Eyed',        maxLabel: 'Legally Unaware' },
  { key: 'rageLevel',          label: 'Rage Level',           minLabel: 'Zen Master',        maxLabel: 'Controller Launched' },
  { key: 'lootAwareness',      label: 'Loot Awareness',       minLabel: 'Looted Everything', maxLabel: 'Left Diamonds' },
  { key: 'strategicIntegrity', label: 'Strategic Integrity',  minLabel: 'Grandmaster',       maxLabel: 'Digs Straight Down' },
  { key: 'commentary',         label: 'Commentary Quality',   minLabel: 'Silent Strategist', maxLabel: 'Screaming Philosopher' },
]

const classificationVariants: Record<string, 'gold' | 'green' | 'blue' | 'orange' | 'red' | 'purple'> = {
  'Competent but insufficiently dramatic': 'green',
  'Promising contributor':                 'blue',
  'Loot blindness documented':             'orange',
  'Executive intervention required':       'red',
  'Historic dirt-hut incident':            'gold',
}

const classificationColors: Record<string, string> = {
  'Competent but insufficiently dramatic': '#22c55e',
  'Promising contributor':                 '#3b82f6',
  'Loot blindness documented':             '#f97316',
  'Executive intervention required':       '#9B2335',
  'Historic dirt-hut incident':            '#d4a017',
}

function avg(ratings: RatingFields): number {
  const vals = Object.values(ratings) as number[]
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [showComments, setShowComments] = useState(false)
  const average = avg(review.ratings)
  const badgeVariant = classificationVariants[review.classification] ?? 'gold'
  const accentColor = classificationColors[review.classification] ?? '#d4a017'
  const thumbUrl = review.thumbnailUrl || `https://img.youtube.com/vi/${review.videoId}/hqdefault.jpg`
  const comments = review.comments ?? []

  return (
    <div className="rounded-2xl overflow-hidden animate-fade-in-up" style={{ background: '#111111', border: '1px solid #2a2a2a' }}>
      {/* Colored accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

      {/* YouTube thumbnail */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbUrl}
          alt={review.title}
          className="w-full object-cover"
          style={{ height: 180 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <a
            href={review.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full transition-transform hover:scale-110"
            style={{ width: 52, height: 52, background: 'rgba(239,68,68,0.9)', backdropFilter: 'blur(4px)' }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M8 5v14l11-7z"/></svg>
          </a>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={badgeVariant}>{review.classification}</Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm leading-snug" style={{ color: '#f0ede4' }}>{review.title}</h3>
            <a
              href={review.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] truncate block mt-0.5 hover:underline"
              style={{ color: '#ef4444' }}
            >
              {review.youtubeUrl.replace('https://', '')}
            </a>
          </div>
          <div className="text-right shrink-0">
            <span className="text-lg font-black" style={{ color: '#d4a017' }}>{average}</span>
            <p style={{ color: '#555', fontSize: 9 }}>/10 avg</p>
          </div>
        </div>

        {/* Stat bars with min/max labels */}
        <div className="space-y-3">
          {ratingConfig.map(({ key, label, minLabel, maxLabel }) => {
            const val = review.ratings[key] ?? 0
            const color = METRIC_COLORS[key] ?? '#888'
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ color: '#888', fontSize: 11 }}>{label}</span>
                  <span style={{ color, fontSize: 11, fontWeight: 700 }}>{val}/10</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 4, background: '#2a2a2a' }}>
                  <div className="h-full rounded-full" style={{ width: `${(val / 10) * 100}%`, background: color }} />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span style={{ color: '#444', fontSize: 9 }}>{minLabel}</span>
                  <span style={{ color: '#444', fontSize: 9 }}>{maxLabel}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-[10px] text-right" style={{ color: '#555' }}>{review.timestamp}</div>

        {/* Comments */}
        {comments.length > 0 && (
          <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 12 }}>
            <button
              onClick={() => setShowComments(v => !v)}
              className="flex items-center gap-1.5 text-[11px] font-semibold mb-3 hover:opacity-70 transition-opacity"
              style={{ color: '#888' }}
            >
              {showComments ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </button>
            {showComments && (
              <div className="space-y-3">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: 'rgba(155,35,53,0.15)', border: '1px solid rgba(155,35,53,0.3)', color: '#C42A40' }}
                    >
                      {c.authorName[0]}
                    </div>
                    <div className="flex-1 rounded-xl px-3 py-2" style={{ background: '#1a1a1a' }}>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-xs font-bold" style={{ color: '#d4a017' }}>{c.authorName}</span>
                        <span className="text-[10px]" style={{ color: '#555' }}>· {c.authorTitle}</span>
                      </div>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#f0ede4' }}>{c.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px]" style={{ color: '#555' }}>{c.timestamp}</span>
                        <span className="text-[10px]" style={{ color: '#555' }}>♥ {c.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
