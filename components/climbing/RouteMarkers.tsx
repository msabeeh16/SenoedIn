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
      {markers.map(marker => (
        <button
          key={marker.id}
          className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          onMouseEnter={() => setActiveTooltip(marker.id)}
          onMouseLeave={() => setActiveTooltip(null)}
          onClick={() => setActiveTooltip(activeTooltip === marker.id ? null : marker.id)}
          aria-label={`Route marker: ${marker.label}`}
        >
          <div className="w-7 h-7 rounded-full bg-seno-blue border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-[10px] hover:scale-110 transition-transform">
            {marker.label === 'CRUX' ? '⚡' : marker.label === 'START' ? 'S' : marker.label === 'TOP' ? '🏁' : marker.label}
          </div>
          {activeTooltip === marker.id && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-seno-dark text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
              {marker.tooltip}
            </div>
          )}
        </button>
      ))}
      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-lg">
        ⚠️ Decorative visualization only
      </div>
    </div>
  )
}
