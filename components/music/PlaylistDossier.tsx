'use client'

import { useState } from 'react'
import type { Song } from '../../lib/types'
import { Button } from '../ui/Button'
import { Copy, CheckCircle, ExternalLink } from 'lucide-react'

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
      setCopied(true)
      onShowToast('Collaborative playlist dossier copied for executive review.')
      setTimeout(() => setCopied(false), 2500)
    } catch {
      onShowToast('Clipboard access was blocked. Open the Spotify links individually.')
    }
  }

  if (endorsedSongs.length === 0) return null

  return (
    <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/60 to-transparent" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h2 className="font-bold text-seno-text">Endorsed Playlist Dossier</h2>
            <p className="text-xs text-seno-dim mt-0.5">{endorsedSongs.length} competencies on file</p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? <CheckCircle size={13} className="text-green-400" /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy Links'}
          </Button>
        </div>

        <div className="space-y-2">
          {endorsedSongs.map(song => (
            <div key={song.id} className="flex items-center gap-3 bg-seno-card-2 rounded-xl px-3 py-2.5 border border-seno-border hover:border-seno-border-gold transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-seno-text truncate">{song.title}</p>
                <p className="text-xs text-seno-dim">{song.artist}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {song.isFriendApproved && (
                  <span className="text-[9px] text-seno-gold font-bold">✦ Seno</span>
                )}
                {song.spotifyUrl && (
                  <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer"
                    className="text-seno-dim hover:text-seno-gold transition-colors">
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
