'use client'

import type { RouteMarker } from '../../lib/types'
import { useState } from 'react'

interface RouteMarkersProps {
  markers: RouteMarker[]
  imageUrl: string
}

function markerStyle(label: string): { bg: string; border: string; color: string; glow: string } {
  if (label === 'START') return { bg: '#22c55e',  border: '#16a34a',  color: '#fff',    glow: 'rgba(34,197,94,0.6)' }
  if (label === 'CRUX')  return { bg: '#C42A40',  border: '#9B2335',  color: '#fff',    glow: 'rgba(196,42,64,0.6)' }
  if (label === 'TOP')   return { bg: '#a855f7',  border: '#7c3aed',  color: '#fff',    glow: 'rgba(168,85,247,0.6)' }
  // numbered — hollow gold
  return { bg: 'rgba(0,0,0,0.55)', border: '#d4a017', color: '#d4a017', glow: 'rgba(212,160,23,0.5)' }
}

export function RouteMarkers({ markers, imageUrl }: RouteMarkersProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <div className="relative overflow-hidden" style={{ borderRadius: '16px 16px 0 0' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="Climbing wall" className="w-full object-cover" style={{ maxHeight: 340 }} />
      {markers.map((marker, i) => {
        const s = markerStyle(marker.label)
        return (
          <button
            key={marker.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            onMouseEnter={() => setActiveTooltip(marker.id)}
            onMouseLeave={() => setActiveTooltip(null)}
            onClick={() => setActiveTooltip(activeTooltip === marker.id ? null : marker.id)}
            aria-label={`Route marker: ${marker.label}`}
          >
            <div
              className="rounded-full flex items-center justify-center font-black hover:scale-125 transition-transform"
              style={{
                background: s.bg,
                border: `2.5px solid ${s.border}`,
                color: s.color,
                boxShadow: `0 0 10px ${s.glow}`,
                animationDelay: `${i * 120}ms`,
                height: marker.label.length > 2 ? '36px' : '30px',
                minWidth: marker.label.length > 2 ? '48px' : '30px',
                padding: marker.label.length > 2 ? '0 8px' : '0',
                fontSize: marker.label.length > 2 ? '10px' : '11px',
                letterSpacing: marker.label.length > 2 ? '0.5px' : '0',
              }}
            >
              {marker.label}
            </div>
            {activeTooltip === marker.id && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-seno-card border border-seno-border text-seno-muted text-[10px] px-2 py-1 rounded-lg whitespace-nowrap shadow-lg z-20">
                {marker.tooltip}
              </div>
            )}
          </button>
        )
      })}
      <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-[10px] px-2 py-1 rounded-lg" style={{ color: '#888', border: '1px solid #2a2a2a' }}>
        ⚠ Decorative only
      </div>
    </div>
  )
}
