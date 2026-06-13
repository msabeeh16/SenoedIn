'use client'

import { useState, useEffect } from 'react'
import { RouteUploader } from '../../components/climbing/RouteUploader'
import { RouteReport } from '../../components/climbing/RouteReport'
import { Card } from '../../components/ui/Card'
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
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <Card>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-seno-blue-light flex items-center justify-center">
            <Mountain size={22} className="text-seno-blue" />
          </div>
          <div>
            <h1 className="text-xl font-black text-seno-dark">Route Portfolio</h1>
            <p className="text-sm text-seno-muted">Professional Experience · Amateur Route Setting Division</p>
          </div>
        </div>
        <p className="text-sm text-seno-dark mt-2">
          Upload a photo of any wall surface. Receive a professionally generated fictional route report complete with decorative hold markers, a grade of questionable accuracy, and dramatic beta commentary. For entertainment purposes only.
        </p>
      </Card>

      <RouteUploader onReport={handleReport} />

      {/* Portfolio */}
      <div>
        <h2 className="text-base font-bold text-seno-dark mb-4 flex items-center gap-2">
          <span>Saved Route Portfolio</span>
          <span className="text-xs font-normal text-seno-muted">({allReports.length} routes professionally imagined)</span>
        </h2>

        {!loaded ? (
          <div className="text-center py-12 text-seno-muted text-sm animate-pulse">
            Route-setting deliverable in progress...
          </div>
        ) : allReports.length === 0 ? (
          <Card>
            <p className="text-center text-seno-muted text-sm py-6">No active routes. This is statistically unusual.</p>
          </Card>
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
