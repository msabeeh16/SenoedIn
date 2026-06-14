'use client'

import { useState, useEffect } from 'react'
import { RouteUploader } from '../../components/climbing/RouteUploader'
import { RouteReport } from '../../components/climbing/RouteReport'
import { seedClimbing } from '../../data/seed-climbing'
import { getStore } from '../../lib/storage'
import type { ClimbingReport } from '../../lib/types'
import { Mountain } from 'lucide-react'

export default function ClimbingPage() {
  const [userReports, setUserReports] = useState<ClimbingReport[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getStore().getClimbingReports().then(r => {
      setUserReports(r)
      setLoaded(true)
    })
  }, [])

  const handleReport = async (report: ClimbingReport) => {
    await getStore().addClimbingReport(report)
    setUserReports(prev => [report, ...prev])
  }

  const allReports = [...userReports, ...seedClimbing]

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(ellipse 70% 50% at 15% 85%, rgba(155,35,53,0.2) 0%, transparent 55%), radial-gradient(ellipse 50% 35% at 85% 10%, rgba(155,35,53,0.08) 0%, transparent 50%), #0a0a0a' }}>
    <div className="max-w-xl mx-auto px-3 py-4 space-y-4">
      {/* Header */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #9B2335, #d4a017 60%, transparent)' }} />
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(155,35,53,0.12)', border: '1px solid rgba(155,35,53,0.35)' }}>
              <Mountain size={20} style={{ color: '#C42A40' }} />
            </div>
            <div>
              <h1 className="text-base font-black text-seno-text">Route Portfolio</h1>
              <p className="text-xs" style={{ color: '#9B2335' }}>Amateur Route Setting Division</p>
            </div>
          </div>
          <p className="text-xs text-seno-muted leading-relaxed">
            Upload a photo of any climbable surface — gym wall, playground equipment, tree, park structure, or questionable fence. Receive a professionally generated fictional route report complete with decorative hold markers, a grade of questionable accuracy, and dramatic beta commentary.
          </p>
        </div>
      </div>

      <RouteUploader onReport={handleReport} />

      {/* Portfolio */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-0.5 h-3 rounded-full" style={{ background: 'linear-gradient(180deg, #9B2335, #d4a017)' }} />
          <h2 className="text-sm font-bold text-seno-text">Saved Route Portfolio</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(155,35,53,0.1)', border: '1px solid rgba(155,35,53,0.25)', color: '#9B2335' }}>
            {allReports.length} routes imagined
          </span>
        </div>

        {!loaded ? (
          <div className="text-center py-12 text-seno-muted text-sm animate-pulse">
            Route-setting deliverable in progress...
          </div>
        ) : allReports.length === 0 ? (
          <div className="bg-seno-card border border-seno-border rounded-2xl p-6">
            <p className="text-center text-seno-muted text-sm">No active routes. This is statistically unusual.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allReports.map(report => (
              <RouteReport key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
