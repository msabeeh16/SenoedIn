import type { GameReview } from '../../lib/types'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { YouTubeEmbed } from './YouTubeEmbed'

interface ReviewCardProps {
  review: GameReview
}

const ratingLabels: Record<string, [string, string]> = {
  actionsPerMinute: ['Meditative', 'Unhinged'],
  blindness: ['Eagle-Eyed', 'Legally Unaware'],
  rageLevel: ['Zen Master', 'Controller Launched'],
  lootAwareness: ['Looted Everything', 'Left Diamonds'],
  strategicIntegrity: ['Plays Like a Grandmaster', 'Digs Straight Down'],
  commentary: ['Silent Strategist', 'Screaming Philosopher'],
}

const classificationColors: Record<string, 'default' | 'green' | 'blue' | 'orange' | 'red' | 'purple'> = {
  'Competent but insufficiently dramatic': 'green',
  'Promising contributor': 'blue',
  'Loot blindness documented': 'orange',
  'Executive intervention required': 'red',
  'Historic dirt-hut incident': 'purple',
}

function avg(ratings: Record<string, number>): number {
  const vals = Object.values(ratings)
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
}

export function ReviewCard({ review }: ReviewCardProps) {
  const average = avg(review.ratings)
  const badgeVariant = classificationColors[review.classification] ?? 'default'

  return (
    <Card className="space-y-4 animate-fade-in-up">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-seno-dark text-sm leading-snug">{review.title}</h3>
          <p className="text-xs text-seno-muted mt-0.5 truncate">{review.youtubeUrl}</p>
        </div>
        <span className="text-xs text-seno-muted shrink-0">{review.timestamp}</span>
      </div>

      <YouTubeEmbed videoId={review.videoId} title={review.title} />

      <div className="flex items-center gap-3 flex-wrap">
        <Badge variant={badgeVariant}>{review.classification}</Badge>
        <span className="text-sm font-bold text-seno-dark">
          Avg: <span className="text-seno-blue">{average}/10</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {(Object.entries(review.ratings) as [string, number][]).map(([key, val]) => {
          const [minL, maxL] = ratingLabels[key] ?? ['Min', 'Max']
          const pct = (val / 10) * 100
          return (
            <div key={key} className="bg-seno-surface rounded-lg p-2.5">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] font-semibold text-seno-dark uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-[10px] font-bold text-seno-blue">{val}</span>
              </div>
              <div className="h-1.5 bg-seno-border rounded-full overflow-hidden">
                <div className="h-full bg-seno-blue rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-seno-muted">{minL}</span>
                <span className="text-[9px] text-seno-muted">{maxL}</span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
