import type { ClimbingReport } from '../../lib/types'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { RouteMarkers } from './RouteMarkers'
import { AlertTriangle } from 'lucide-react'

interface RouteReportProps {
  report: ClimbingReport
}

export function RouteReport({ report }: RouteReportProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-black text-seno-dark text-lg">{report.routeName}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="blue">{report.fictionalGrade}</Badge>
            <Badge variant="default">{report.style}</Badge>
          </div>
        </div>
        <span className="text-xs text-seno-muted shrink-0">{report.timestamp}</span>
      </div>

      {report.imageUrl && (
        <RouteMarkers markers={report.markers} imageUrl={report.imageUrl} />
      )}

      {!report.imageUrl && report.markers.length > 0 && (
        <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl h-48 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
            No wall image — markers shown on placeholder
          </div>
          {report.markers.map(marker => (
            <div
              key={marker.id}
              className="absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-seno-blue border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-[10px]"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              title={marker.tooltip}
            >
              {marker.label === 'CRUX' ? '⚡' : marker.label === 'START' ? 'S' : marker.label === 'TOP' ? '🏁' : marker.label}
            </div>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        {[
          { label: 'Starting Holds', value: report.startingHolds },
          { label: 'Crux', value: report.crux },
          { label: 'Beta', value: report.beta },
          { label: 'Performance Review', value: report.dramaticReview },
        ].map(({ label, value }) => (
          <div key={label} className={`bg-seno-surface rounded-lg p-3 ${label === 'Performance Review' ? 'sm:col-span-2' : ''}`}>
            <p className="text-xs font-bold text-seno-blue uppercase tracking-wide mb-1">{label}</p>
            <p className="text-seno-dark leading-relaxed">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        <AlertTriangle size={14} className="shrink-0 mt-0.5" />
        <p>{report.safetyDisclaimer}</p>
      </div>
    </Card>
  )
}
