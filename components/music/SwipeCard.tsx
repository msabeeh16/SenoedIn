'use client'

import { useState } from 'react'
import type { Song } from '../../lib/types'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { X, ThumbsUp } from 'lucide-react'

interface SwipeCardProps {
  song: Song
  onEndorse: (song: Song) => void
  onDecline: (song: Song) => void
}

export function SwipeCard({ song, onEndorse, onDecline }: SwipeCardProps) {
  const [animating, setAnimating] = useState<'left' | 'right' | null>(null)

  const trigger = (dir: 'left' | 'right') => {
    if (animating) return
    setAnimating(dir)
    setTimeout(() => {
      if (dir === 'right') onEndorse(song)
      else onDecline(song)
    }, 320)
  }

  return (
    <div
      className={`bg-seno-card border border-seno-border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
        animating === 'left' ? 'animate-swipe-left' : animating === 'right' ? 'animate-swipe-right' : ''
      }`}
    >
      {/* Spotify embed or placeholder */}
      {song.spotifyEmbedUrl ? (
        <iframe
          src={song.spotifyEmbedUrl}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-0"
          title={`${song.title} by ${song.artist}`}
        />
      ) : (
        <div className="h-32 bg-gradient-to-br from-green-900 via-green-800 to-gray-900 flex flex-col items-center justify-center gap-2">
          <div className="text-4xl">🎵</div>
          <p className="text-white/60 text-xs">Spotify embed available when URL is configured</p>
        </div>
      )}

      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-seno-dark">{song.title}</h3>
              <p className="text-sm text-seno-muted">{song.artist}</p>
            </div>
            {song.isFriendApproved && (
              <Badge variant="green" className="shrink-0">Seno Approved ✓</Badge>
            )}
          </div>
          <p className="text-xs text-seno-blue mt-1.5">{song.competencyLabel}</p>
        </div>

        <div className="text-xs text-seno-muted bg-seno-surface rounded-lg px-3 py-2 italic">
          &ldquo;This track has been identified as a potential professional networking opportunity.&rdquo;
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
            onClick={() => trigger('left')}
          >
            <X size={16} />
            Decline Connection
          </Button>
          <Button
            variant="primary"
            className="flex-1 bg-seno-green hover:bg-green-700"
            onClick={() => trigger('right')}
          >
            <ThumbsUp size={16} />
            Endorse Vibes
          </Button>
        </div>
      </div>
    </div>
  )
}
