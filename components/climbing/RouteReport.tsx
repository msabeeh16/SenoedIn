'use client'

import { useState } from 'react'
import type { ClimbingReport } from '../../lib/types'
import { RouteMarkers } from './RouteMarkers'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface RouteReportProps {
  report: ClimbingReport
}

export function RouteReport({ report }: RouteReportProps) {
  const [showComments, setShowComments] = useState(false)
  const comments = report.comments ?? []
  const gradeShort = report.fictionalGrade.split(' ')[0]
  const styleShort = report.style.split('/')[0].trim()

  return (
    <div className="rounded-2xl overflow-hidden animate-fade-in-up" style={{ background: '#111111', border: '1px solid #2a2a2a' }}>
      {/* Image with colored markers — flush to top */}
      {report.imageUrl ? (
        <RouteMarkers markers={report.markers} imageUrl={report.imageUrl} />
      ) : (
        <div className="relative overflow-hidden" style={{ height: 200, borderRadius: '16px 16px 0 0', background: 'linear-gradient(135deg, #111 0%, #1a1a1a 40%, #0f0f0f 100%)' }}>
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(#d4a01720 1px, transparent 1px), linear-gradient(90deg, #d4a01720 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-seno-dim text-xs">No photo — fictional route</p>
          </div>
          {report.markers.map(marker => {
            const s = marker.label === 'START' ? { bg: '#22c55e', color: '#fff' } :
                      marker.label === 'CRUX'  ? { bg: '#C42A40', color: '#fff' } :
                      marker.label === 'TOP'   ? { bg: '#a855f7', color: '#fff' } :
                                                 { bg: 'rgba(0,0,0,0.6)', color: '#d4a017' }
            return (
              <div key={marker.id} className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px]"
                style={{ left: `${marker.x}%`, top: `${marker.y}%`, background: s.bg, color: s.color, border: '2px solid rgba(255,255,255,0.2)' }}>
                {marker.label}
              </div>
            )
          })}
        </div>
      )}

      {/* Content — matches Figma layout */}
      <div className="p-4 space-y-3">
        {/* Route name + grade badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black text-xl leading-tight" style={{ color: '#f0ede4' }}>{report.routeName}</h3>
            <p className="text-sm mt-0.5" style={{ color: '#888' }}>{styleShort}</p>
            <p className="text-[10px] mt-0.5" style={{ color: '#555' }}>{report.timestamp}</p>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-black text-xs"
            style={{ background: '#d4a017', color: '#0a0a0a', boxShadow: '0 0 16px rgba(212,160,23,0.4)' }}>
            {gradeShort}
          </div>
        </div>

        {/* BETA box */}
        <div className="rounded-xl p-3" style={{ background: '#141414', border: '1px solid #2a2a2a', borderLeft: '2px solid rgba(155,35,53,0.5)' }}>
          <p className="text-[9px] font-black tracking-[0.18em] mb-2 uppercase" style={{ color: '#9B2335' }}>Beta</p>
          <p className="text-sm leading-relaxed" style={{ color: '#f0ede4' }}>{report.beta}</p>
        </div>

        {/* Quote with gold left border */}
        {report.quote && (
          <div className="pl-3" style={{ borderLeft: '2px solid #d4a017' }}>
            <p className="text-sm italic leading-relaxed" style={{ color: '#888' }}>&ldquo;{report.quote}&rdquo;</p>
          </div>
        )}

        {/* Comments */}
        {comments.length > 0 && (
          <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 12 }}>
            <button
              onClick={() => setShowComments(v => !v)}
              className="flex items-center gap-1.5 font-semibold hover:opacity-70 transition-opacity mb-3"
              style={{ color: '#888', fontSize: 11 }}
            >
              {showComments ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {comments.length} beta {comments.length === 1 ? 'note' : 'notes'}
            </button>
            {showComments && (
              <div className="space-y-3">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)', color: '#d4a017' }}>
                      {c.authorName[0]}
                    </div>
                    <div className="flex-1 rounded-xl px-3 py-2" style={{ background: '#1a1a1a' }}>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xs font-bold" style={{ color: '#d4a017' }}>{c.authorName}</span>
                        <span style={{ color: '#555', fontSize: 10 }}>· {c.authorTitle}</span>
                        {c.gradeSuggestion && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(155,35,53,0.15)', color: '#C42A40' }}>
                            {c.gradeSuggestion}
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#f0ede4' }}>{c.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span style={{ color: '#555', fontSize: 10 }}>{c.timestamp}</span>
                        <span style={{ color: '#555', fontSize: 10 }}>♥ {c.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
