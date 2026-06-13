'use client'

import type { Song } from '../../lib/types'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface PlaylistDossierProps {
  endorsedSongs: Song[]
  onShowToast: (msg: string) => void
}

export function PlaylistDossier({ endorsedSongs, onShowToast }: PlaylistDossierProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const links = endorsedSongs.map(s => `${s.title} — ${s.artist}\n${s.spotifyUrl}`).join('\n\n')
    try {
      await navigator.clipboard.writeText(links)
    } catch {
      // Clipboard not available — just show toast
    }
    setCopied(true)
    onShowToast('Collaborative playlist dossier prepared for executive review.')
    setTimeout(() => setCopied(false), 2500)
  }

  if (endorsedSongs.length === 0) return null

  return (
    <Card>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="font-bold text-seno-dark">Endorsed Playlist Dossier</h2>
          <p className="text-xs text-seno-muted mt-0.5">{endorsedSongs.length} competencies endorsed</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
        >
          {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy Track Links'}
        </Button>
      </div>

      <div className="space-y-2">
        {endorsedSongs.map(song => (
          <div key={song.id} className="flex items-center justify-between gap-3 bg-seno-surface rounded-xl px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-seno-dark truncate">{song.title}</p>
              <p className="text-xs text-seno-muted">{song.artist}</p>
              <p className="text-[10px] text-seno-blue mt-0.5">{song.competencyLabel}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {song.isFriendApproved && (
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Seno ✓</span>
              )}
              {song.spotifyUrl && (
                <a
                  href={song.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-seno-blue hover:underline font-medium"
                >
                  Open ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
