import type { GameReview, RatingFields } from '../../lib/types'
import { Badge } from '../ui/Badge'
import { YouTubeEmbed } from './YouTubeEmbed'

interface ReviewCardProps {
  review: GameReview
}

const ratingLabels: Record<string, [string, string]> = {
  actionsPerMinute:   ['Meditative',        'Unhinged'],
  blindness:          ['Eagle-Eyed',         'Legally Unaware'],
  rageLevel:          ['Zen Master',         'Controller Launched'],
  lootAwareness:      ['Looted Everything',  'Left Diamonds'],
  strategicIntegrity: ['Grandmaster Plays',  'Digs Straight Down'],
  commentary:         ['Silent Strategist',  'Screaming Philosopher'],
}

const classificationVariants: Record<string, 'gold' | 'green' | 'blue' | 'orange' | 'red' | 'purple'> = {
  'Competent but insufficiently dramatic': 'green',
  'Promising contributor':                 'blue',
  'Loot blindness documented':             'orange',
  'Executive intervention required':       'red',
  'Historic dirt-hut incident':            'gold',
}

function avg(ratings: RatingFields): number {
  const vals = Object.values(ratings) as number[]
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
}

export function ReviewCard({ review }: ReviewCardProps) {
  const average = avg(review.ratings)
  const badgeVariant = classificationVariants[review.classification] ?? 'default'

  return (
    <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden animate-fade-in-up">
      <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/40 to-transparent" />
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-seno-text text-sm leading-snug">{review.title}</h3>
            <p className="text-[10px] text-seno-dim mt-0.5 truncate">{review.youtubeUrl}</p>
          </div>
          <span className="text-[10px] text-seno-dim shrink-0">{review.timestamp}</span>
        </div>

        <YouTubeEmbed videoId={review.videoId} title={review.title} />

        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant={badgeVariant}>{review.classification}</Badge>
          <span className="text-sm text-seno-muted">
            Avg: <span className="text-seno-gold font-bold">{average}/10</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(review.ratings) as [string, number][]).map(([key, val]) => {
            const [minL, maxL] = ratingLabels[key] ?? ['Min', 'Max']
            return (
              <div key={key} className="bg-seno-card-2 rounded-xl p-2.5 border border-seno-border">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-semibold text-seno-muted uppercase tracking-wide">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-[10px] font-black text-seno-gold">{val}</span>
                </div>
                <div className="h-1 bg-seno-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(val / 10) * 100}%`, background: 'linear-gradient(90deg,#d4a017,#e8b820)' }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[8px] text-seno-dim">{minL}</span>
                  <span className="text-[8px] text-seno-dim">{maxL}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
