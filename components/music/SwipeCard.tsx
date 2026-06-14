'use client'

import { useRef, useState } from 'react'
import type { Song } from '../../lib/types'
import { X, Heart, ExternalLink } from 'lucide-react'

interface SwipeCardProps {
  song: Song
  onEndorse: (song: Song) => void
  onDecline: (song: Song) => void
}

const SWIPE_THRESHOLD = 90

export function SwipeCard({ song, onEndorse, onDecline }: SwipeCardProps) {
  const [dragX, setDragX] = useState(0)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)
  const startRef = useRef({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const triggerExit = (dir: 'left' | 'right') => {
    if (exiting) return
    setExiting(dir)
    setDragX(dir === 'right' ? 600 : -600)
    setTimeout(() => {
      if (dir === 'right') onEndorse(song)
      else onDecline(song)
    }, 300)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (exiting) return
    e.currentTarget.setPointerCapture(e.pointerId)
    startRef.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || exiting) return
    setDragX(e.clientX - startRef.current.x)
    setDragY(e.clientY - startRef.current.y)
  }

  const onPointerUp = () => {
    if (!isDragging || exiting) return
    setIsDragging(false)
    if (Math.abs(dragX) >= SWIPE_THRESHOLD) {
      triggerExit(dragX > 0 ? 'right' : 'left')
    } else {
      setDragX(0)
      setDragY(0)
    }
  }

  const rotate = dragX * 0.08
  const endorseOpacity = Math.min(1, Math.max(0, dragX / SWIPE_THRESHOLD))
  const declineOpacity = Math.min(1, Math.max(0, -dragX / SWIPE_THRESHOLD))

  const cardStyle: React.CSSProperties = {
    transform: `translateX(${dragX}px) translateY(${dragY * 0.2}px) rotate(${rotate}deg)`,
    transition: isDragging ? 'none' : exiting ? 'transform 0.3s ease-out, opacity 0.3s' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    opacity: exiting ? 0 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
    userSelect: 'none',
  }

  return (
    <div className="relative select-none">
      {/* Background hint cards */}
      <div className="absolute inset-0 rounded-3xl bg-seno-card-2 border border-seno-border scale-95 opacity-60" style={{ zIndex: 0, transform: 'scale(0.95) translateY(8px)' }} />
      <div className="absolute inset-0 rounded-3xl bg-seno-card border border-seno-border scale-97 opacity-80" style={{ zIndex: 1, transform: 'scale(0.97) translateY(4px)' }} />

      {/* Main swipeable card */}
      <div
        ref={cardRef}
        style={{ ...cardStyle, position: 'relative', zIndex: 10 }}
        className="bg-seno-card border border-seno-border rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Swipe overlays — ENDORSE on RIGHT (swipe right = Endorse button side), PASS on LEFT */}
        <div
          className="absolute inset-0 z-20 rounded-3xl flex items-start justify-end p-6 pointer-events-none"
          style={{ opacity: endorseOpacity, background: 'linear-gradient(225deg, rgba(34,197,94,0.35) 0%, transparent 60%)' }}
        >
          <div className="border-4 border-green-400 rounded-xl px-4 py-2 rotate-[12deg]">
            <span className="text-green-400 font-black text-2xl tracking-widest">ENDORSE</span>
          </div>
        </div>
        <div
          className="absolute inset-0 z-20 rounded-3xl flex items-start justify-start p-6 pointer-events-none"
          style={{ opacity: declineOpacity, background: 'linear-gradient(135deg, rgba(155,35,53,0.4) 0%, transparent 60%)' }}
        >
          <div className="rounded-xl px-4 py-2 rotate-[-12deg]" style={{ border: '4px solid #C42A40' }}>
            <span className="font-black text-2xl tracking-widest" style={{ color: '#C42A40' }}>PASS</span>
          </div>
        </div>

        <div className="relative h-52 overflow-hidden pointer-events-none">
          {song.albumArtUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={song.albumArtUrl}
                alt={`${song.title} album art`}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-seno-card via-transparent to-transparent opacity-80" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-seno-card-2 to-black flex items-center justify-center">
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #d4a017 0%, transparent 60%), radial-gradient(circle at 70% 60%, #d4a017 0%, transparent 60%)' }} />
              <span className="text-5xl">🎵</span>
            </div>
          )}
        </div>

        <div className="p-5 space-y-3 pointer-events-none">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-black text-seno-text text-xl leading-tight">{song.title}</h3>
              <p className="text-seno-muted text-sm mt-0.5">{song.artist}</p>
              <p className="text-seno-dim text-xs mt-0.5">{song.genre}</p>
            </div>
            {song.isFriendApproved && (
              <span className="text-[10px] bg-seno-gold/15 text-seno-gold px-2 py-1 rounded-full font-bold border border-seno-border-gold shrink-0">
                ✦ Seno
              </span>
            )}
          </div>

          <p className="text-xs text-seno-gold/80">{song.competencyLabel}</p>

          <p className="text-xs text-seno-dim bg-seno-card-2 rounded-xl px-3 py-2 italic">
            &ldquo;This track has been flagged as a potential professional networking opportunity.&rdquo;
          </p>

          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-xs font-semibold text-seno-gold hover:text-seno-gold-light"
            onPointerDown={e => e.stopPropagation()}
          >
            Find {song.title} by {song.artist} on Spotify
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 px-5 pb-5 pointer-events-auto">
          <button
            onClick={() => triggerExit('left')}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-seno-card-2 border border-seno-border text-seno-muted hover:border-seno-garnet/50 hover:text-seno-garnet-light hover:bg-seno-garnet-tint transition-all font-semibold text-sm active:scale-95"
          >
            <X size={20} />
            Pass
          </button>
          <button
            onClick={() => triggerExit('right')}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-seno-gold text-[#0a0a0a] hover:bg-seno-gold-light transition-all font-black text-sm active:scale-95 shadow-[0_4px_20px_rgba(212,160,23,0.5)]"
          >
            <Heart size={20} />
            Endorse
          </button>
        </div>
      </div>
    </div>
  )
}
