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
    <div className="max-w-xl mx-auto px-3 py-4 space-y-4">
      {/* Header */}
      <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/40 to-transparent" />
        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-seno-gold-tint border border-seno-border-gold flex items-center justify-center">
              <Mountain size={20} className="text-seno-gold" />
            </div>
            <div>
              <h1 className="text-base font-black text-seno-text">Route Portfolio</h1>
              <p className="text-xs text-seno-dim">Amateur Route Setting Division</p>
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
          <h2 className="text-sm font-bold text-seno-text">Saved Route Portfolio</h2>
          <span className="text-[10px] text-seno-dim bg-seno-card border border-seno-border px-2 py-0.5 rounded-full">
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
  )
}
