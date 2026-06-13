'use client'

import type { RouteMarker } from '../../lib/types'
import { useState } from 'react'

interface RouteMarkersProps {
  markers: RouteMarker[]
  imageUrl: string
}

export function RouteMarkers({ markers, imageUrl }: RouteMarkersProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <div className="relative rounded-xl overflow-hidden border border-seno-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="Climbing wall" className="w-full max-h-96 object-cover" />
      {markers.map((marker, i) => (
        <button
          key={marker.id}
          className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          onMouseEnter={() => setActiveTooltip(marker.id)}
          onMouseLeave={() => setActiveTooltip(null)}
          onClick={() => setActiveTooltip(activeTooltip === marker.id ? null : marker.id)}
          aria-label={`Route marker: ${marker.label}`}
        >
          <div
            className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center font-black text-[10px] text-[#0a0a0a] hover:scale-125 transition-transform shadow-[0_0_10px_rgba(212,160,23,0.8)]"
            style={{
              background: `linear-gradient(135deg, #d4a017, #e8b820)`,
              animationDelay: `${i * 120}ms`,
            }}
          >
            {marker.label === 'CRUX' ? '⚡' : marker.label === 'START' ? 'S' : marker.label === 'TOP' ? '★' : marker.label}
          </div>
          {activeTooltip === marker.id && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-seno-card border border-seno-border text-seno-muted text-[10px] px-2 py-1 rounded-lg whitespace-nowrap shadow-lg z-20">
              {marker.tooltip}
            </div>
          )}
        </button>
      ))}
      <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-seno-gold text-[10px] px-2 py-1 rounded-lg border border-seno-border-gold">
        ⚠ Decorative only
      </div>
    </div>
  )
}
