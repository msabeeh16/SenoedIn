import type { ClimbingReport } from '../../lib/types'
import { Badge } from '../ui/Badge'
import { RouteMarkers } from './RouteMarkers'
import { AlertTriangle } from 'lucide-react'

interface RouteReportProps {
  report: ClimbingReport
}

export function RouteReport({ report }: RouteReportProps) {
  return (
    <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden animate-fade-in-up">
      {/* Gold top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/60 to-transparent" />

      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-black text-seno-text text-lg leading-tight">{report.routeName}</h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Badge variant="gold">{report.fictionalGrade}</Badge>
              <span className="text-xs text-seno-dim">{report.style}</span>
            </div>
          </div>
          <span className="text-xs text-seno-dim shrink-0">{report.timestamp}</span>
        </div>

        {report.imageUrl ? (
          <RouteMarkers markers={report.markers} imageUrl={report.imageUrl} />
        ) : (
          <div className="relative bg-seno-card-2 border border-seno-border rounded-xl h-44 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-seno-dim text-sm">No wall image</div>
            {report.markers.map(marker => (
              <div
                key={marker.id}
                className="absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-black text-[10px] text-[#0a0a0a] shadow-[0_0_8px_rgba(212,160,23,0.6)]"
                style={{ left: `${marker.x}%`, top: `${marker.y}%`, background: 'linear-gradient(135deg,#d4a017,#e8b820)' }}
                title={marker.tooltip}
              >
                {marker.label === 'CRUX' ? '⚡' : marker.label === 'START' ? 'S' : marker.label === 'TOP' ? '★' : marker.label}
              </div>
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Starting Holds', value: report.startingHolds },
            { label: 'Crux',           value: report.crux },
            { label: 'Beta',           value: report.beta },
            { label: 'Performance Review', value: report.dramaticReview, full: true },
          ].map(({ label, value, full }) => (
            <div key={label} className={`bg-seno-card-2 rounded-xl p-3 ${full ? 'sm:col-span-2' : ''}`}>
              <p className="text-[10px] font-bold text-seno-gold uppercase tracking-widest mb-1.5">{label}</p>
              <p className="text-sm text-seno-muted leading-relaxed">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 bg-amber-950/30 border border-amber-800/30 rounded-xl p-3 text-xs text-amber-400/80">
          <AlertTriangle size={13} className="shrink-0 mt-0.5" />
          <p>{report.safetyDisclaimer}</p>
        </div>
      </div>
    </div>
  )
}
