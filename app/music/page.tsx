'use client'

import { useState, useEffect } from 'react'
import { SwipeCard } from '../../components/music/SwipeCard'
import { CompatibilityModal } from '../../components/music/CompatibilityModal'
import { PlaylistDossier } from '../../components/music/PlaylistDossier'
import { Toast } from '../../components/ui/Toast'
import { Card } from '../../components/ui/Card'
import { seedSongs, FRIEND_APPROVED_SONG_IDS } from '../../data/seed-songs'
import { getStore } from '../../lib/storage'
import type { Song, MusicSwipe } from '../../lib/types'
import { Music } from 'lucide-react'

export default function MusicPage() {
  const [swipes, setSwipes] = useState<MusicSwipe[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalShownAt, setModalShownAt] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getStore().getMusicSwipes().then(s => {
      setSwipes(s)
      setLoaded(true)
    })
  }, [])

  const swipedIds = new Set(swipes.map(s => s.songId))
  const remaining = seedSongs.filter(s => !swipedIds.has(s.id))
  const endorsedIds = new Set(swipes.filter(s => s.direction === 'endorse').map(s => s.songId))
  const endorsedSongs = seedSongs.filter(s => endorsedIds.has(s.id))
  const endorsedFriendApproved = endorsedSongs.filter(s => FRIEND_APPROVED_SONG_IDS.includes(s.id))

  const handleSwipe = async (song: Song, direction: 'endorse' | 'decline') => {
    const swipe: MusicSwipe = { songId: song.id, direction, timestamp: new Date().toISOString() }
    const next = [...swipes, swipe]
    setSwipes(next)
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

  const currentSong = remaining[0]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <Card>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Music size={22} className="text-green-700" />
          </div>
          <div>
            <h1 className="text-xl font-black text-seno-dark">Music Networking</h1>
            <p className="text-sm text-seno-muted">My Network Division · Compatibility Analytics</p>
          </div>
        </div>
        <p className="text-sm text-seno-dark mt-2">
          Grow your professional network through deeply concerning musical compatibility. Endorse tracks to build your playlist dossier. Decline connections that do not align with your strategic yearning goals.
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-seno-muted">
          <span>🎵 {remaining.length} tracks remaining</span>
          <span>👍 {endorsedSongs.length} endorsed</span>
          <span>✓ {endorsedFriendApproved.length}/3 Seno overlaps</span>
        </div>
      </Card>

      {/* Current swipe card */}
      {!loaded ? (
        <Card>
          <p className="text-center text-seno-muted text-sm py-8 animate-pulse">
            Aligning stakeholders...
          </p>
        </Card>
      ) : currentSong ? (
        <div>
          <div className="text-center mb-3 text-xs text-seno-muted">
            Track {swipedIds.size + 1} of {seedSongs.length}
          </div>
          <SwipeCard
            key={currentSong.id}
            song={currentSong}
            onEndorse={s => handleSwipe(s, 'endorse')}
            onDecline={s => handleSwipe(s, 'decline')}
          />
        </div>
      ) : (
        <Card>
          <div className="text-center py-8 space-y-2">
            <div className="text-4xl">✅</div>
            <p className="font-bold text-seno-dark">Dossier complete.</p>
            <p className="text-sm text-seno-muted">
              All available networking opportunities have been processed. Connection quality exceeds internal thresholds.
            </p>
          </div>
        </Card>
      )}

      {/* Dossier */}
      {loaded && <PlaylistDossier endorsedSongs={endorsedSongs} onShowToast={setToast} />}

      <CompatibilityModal
        open={showModal}
        onClose={() => setShowModal(false)}
        endorsedCount={endorsedFriendApproved.length}
      />

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  )
}
