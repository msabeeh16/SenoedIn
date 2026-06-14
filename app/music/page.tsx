'use client'

import { useState, useEffect } from 'react'
import { SwipeCard } from '../../components/music/SwipeCard'
import { CompatibilityModal } from '../../components/music/CompatibilityModal'
import { PlaylistDossier } from '../../components/music/PlaylistDossier'
import { Toast } from '../../components/ui/Toast'
import { seedSongs, FRIEND_APPROVED_SONG_IDS } from '../../data/seed-songs'
import { getStore } from '../../lib/storage'
import type { Song, MusicSwipe } from '../../lib/types'
import { Music, RotateCcw } from 'lucide-react'

export default function MusicPage() {
  const [swipes, setSwipes] = useState<MusicSwipe[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalShownAt, setModalShownAt] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [deckIndex, setDeckIndex] = useState(0)

  useEffect(() => {
    getStore().getMusicSwipes().then(s => {
      setSwipes(s)
      const swipedIds = new Set(s.map(swipe => swipe.songId))
      const firstUnseen = seedSongs.findIndex(song => !swipedIds.has(song.id))
      setDeckIndex(firstUnseen === -1 ? 0 : firstUnseen)
      setLoaded(true)
    })
  }, [])

  const endorsedIds = new Set(swipes.filter(s => s.direction === 'endorse').map(s => s.songId))
  const endorsedSongs = seedSongs.filter(s => endorsedIds.has(s.id))
  const endorsedFriendApproved = endorsedSongs.filter(s => FRIEND_APPROVED_SONG_IDS.includes(s.id))

  const handleSwipe = async (song: Song, direction: 'endorse' | 'decline') => {
    const swipe: MusicSwipe = { songId: song.id, direction, timestamp: new Date().toISOString() }
    const next = [...swipes.filter(existing => existing.songId !== song.id), swipe]
    setSwipes(next)
    setDeckIndex(current => (current + 1) % seedSongs.length)
    await getStore().addMusicSwipe(swipe)

    if (direction === 'endorse') {
      const newEndorsedFriendApproved = next
        .filter(s => s.direction === 'endorse' && FRIEND_APPROVED_SONG_IDS.includes(s.songId))
      if (newEndorsedFriendApproved.length >= 3 && newEndorsedFriendApproved.length > modalShownAt) {
        setModalShownAt(newEndorsedFriendApproved.length)
        setTimeout(() => setShowModal(true), 400)
      }
    }
  }

  const currentSong = seedSongs[deckIndex]

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse 75% 50% at 25% 10%, rgba(155,35,53,0.22) 0%, transparent 55%), radial-gradient(ellipse 60% 45% at 80% 80%, rgba(168,85,247,0.15) 0%, transparent 50%), #0a0a0a' }}>
    <div className="max-w-xl mx-auto px-3 py-4 space-y-4">
      {/* Header */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #a855f7, #9B2335 50%, transparent)' }} />
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)' }}>
              <Music size={20} style={{ color: '#a855f7' }} />
            </div>
            <div>
              <h1 className="text-base font-black text-seno-text">Music Networking</h1>
              <p className="text-xs" style={{ color: '#a855f7' }}>Compatibility Analytics Division</p>
            </div>
          </div>
          <p className="text-xs text-seno-muted leading-relaxed">
            Grow your professional network through deeply concerning musical compatibility. Endorse tracks to build your playlist dossier.
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[10px] flex-wrap">
              <span className="flex items-center gap-1" style={{ color: '#555' }}>🎵 <strong style={{ color: '#888' }}>{seedSongs.length}</strong> rotating tracks</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.2)', color: '#888' }}>✦ <strong style={{ color: '#d4a017' }}>{endorsedSongs.length}</strong> endorsed</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: 'rgba(155,35,53,0.08)', border: '1px solid rgba(155,35,53,0.2)', color: '#888' }}>🤝 <strong style={{ color: '#C42A40' }}>{endorsedFriendApproved.length}/3</strong> Seno overlaps</span>
            </div>
            {swipes.length > 0 && (
              <button
                onClick={async () => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('senoedin.musicSwipes')
                  }
                  setSwipes([])
                  setDeckIndex(0)
                  setModalShownAt(0)
                  setToast('Dossier reset. Fresh start.')
                }}
                className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-all shrink-0"
                style={{ background: 'rgba(155,35,53,0.1)', border: '1px solid rgba(155,35,53,0.3)', color: '#C42A40' }}
              >
                <RotateCcw size={10} />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Swipe card */}
      {!loaded ? (
        <div className="bg-seno-card border border-seno-border rounded-2xl p-8">
          <p className="text-center text-seno-muted text-sm animate-pulse">
            Aligning stakeholders...
          </p>
        </div>
      ) : (
        <div>
          <p className="text-center text-[10px] text-seno-dim mb-2">
            Track {deckIndex + 1} of {seedSongs.length} · catalog repeats
          </p>
          <SwipeCard
            key={`${currentSong.id}-${currentSong.spotifyUrl}-${swipes.find(s => s.songId === currentSong.id)?.timestamp ?? 'new'}`}
            song={currentSong}
            onEndorse={s => handleSwipe(s, 'endorse')}
            onDecline={s => handleSwipe(s, 'decline')}
          />
        </div>
      )}

      {loaded && <PlaylistDossier endorsedSongs={endorsedSongs} onShowToast={setToast} />}

      <CompatibilityModal
        open={showModal}
        onClose={() => setShowModal(false)}
        endorsedCount={endorsedFriendApproved.length}
      />

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
    </div>
  )
}
