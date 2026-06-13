import type { GameReview, RatingFields } from '../../lib/types'
import { Badge } from '../ui/Badge'

interface ReviewCardProps {
  review: GameReview
}

const METRIC_COLORS: Record<string, string> = {
  actionsPerMinute:   '#d4a017',
  blindness:          '#ef4444',
  rageLevel:          '#f97316',
  lootAwareness:      '#22c55e',
  strategicIntegrity: '#a855f7',
  commentary:         '#3b82f6',
}

const ratingLabels: Record<string, string> = {
  actionsPerMinute:   'Actions Per Minute',
  blindness:          'Loot Blindness',
  rageLevel:          'Rage Level',
  lootAwareness:      'Loot Awareness',
  strategicIntegrity: 'Strategic Integrity',
  commentary:         'Commentary Rating',
}

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
  'Executive intervention required':       '#ef4444',
  'Historic dirt-hut incident':            '#d4a017',
}

function avg(ratings: RatingFields): number {
  const vals = Object.values(ratings) as number[]
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
}

export function ReviewCard({ review }: ReviewCardProps) {
  const average = avg(review.ratings)
  const badgeVariant = classificationVariants[review.classification] ?? 'default'
  const accentColor = classificationColors[review.classification] ?? '#d4a017'
  const thumbUrl = `https://img.youtube.com/vi/${review.videoId}/hqdefault.jpg`

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
        {/* Play button overlay */}
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
        {/* Classification badge overlay */}
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

        {/* Stats */}
        <div className="space-y-2.5">
          {(Object.entries(review.ratings) as [string, number][]).map(([key, val]) => {
            const color = METRIC_COLORS[key] ?? '#888'
            return (
              <div key={key} className="flex items-center gap-3">
                <span style={{ color: '#888', fontSize: 11, width: 130, flexShrink: 0 }}>
                  {ratingLabels[key] ?? key}
                </span>
                <div className="rounded-full overflow-hidden flex-1" style={{ height: 4, background: '#2a2a2a' }}>
                  <div className="h-full rounded-full" style={{ width: `${(val / 10) * 100}%`, background: color }} />
                </div>
                <span style={{ color, fontSize: 11, fontWeight: 700, width: 20, textAlign: 'right' }}>{val}</span>
              </div>
            )
          })}
        </div>

        <div className="text-[10px] text-right" style={{ color: '#555' }}>{review.timestamp}</div>
      </div>
    </div>
  )
}
