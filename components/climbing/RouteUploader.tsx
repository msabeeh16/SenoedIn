'use client'

import { useState, useRef } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import type { ClimbingReport } from '../../lib/types'
import { generateMarkers } from '../../lib/utils/climbing'

interface RouteUploaderProps {
  onReport: (report: ClimbingReport) => void
}

type Phase = 'idle' | 'preview' | 'scanning' | 'done'

export function RouteUploader({ onReport }: RouteUploaderProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageName, setImageName] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageName(file.name)
    const reader = new FileReader()
    reader.onload = ev => {
      setImagePreview(ev.target?.result as string)
      setPhase('preview')
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    setPhase('scanning')
    try {
      const res = await fetch('/api/analyze-climb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageName }),
      })
      const json = await res.json() as { data: Omit<ClimbingReport, 'id' | 'timestamp' | 'imageUrl' | 'imageName'> & { markers: ClimbingReport['markers'] } }
      const report: ClimbingReport = {
        id: `climb-${Date.now()}`,
        imageUrl: imagePreview ?? undefined,
        imageName,
        timestamp: 'Just now',
        ...json.data,
        markers: generateMarkers(imageName),
      }
      onReport(report)
      setPhase('done')
      setImagePreview(null)
      setImageName('')
      if (fileRef.current) fileRef.current.value = ''
      setTimeout(() => setPhase('idle'), 500)
    } catch {
      const { getRandomClimbReport } = await import('../../lib/utils/fallbacks')
      const fallback = getRandomClimbReport()
      const report: ClimbingReport = {
        id: `climb-${Date.now()}`,
        imageUrl: imagePreview ?? undefined,
        imageName,
        timestamp: 'Just now',
        markers: generateMarkers(imageName),
        ...fallback,
      }
      onReport(report)
      setPhase('idle')
    }
  }

  return (
    <Card>
      <h2 className="font-bold text-seno-dark mb-3">Document a New Route</h2>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-800 font-medium">
        ⚠️ Parody route report only. Do not climb unapproved structures. Decorative markers are not verified holds. Always climb with a qualified partner and appropriate safety equipment.
      </div>

      {phase === 'idle' && (
        <label htmlFor="wall-upload" className="cursor-pointer">
          <div className="border-2 border-dashed border-seno-border rounded-xl p-10 text-center hover:border-seno-blue hover:bg-seno-blue-pale transition-colors">
            <Upload size={32} className="text-seno-muted mx-auto mb-3" />
            <p className="font-semibold text-seno-dark">Upload wall image</p>
            <p className="text-xs text-seno-muted mt-1">Route-setting deliverable in progress...</p>
          </div>
          <input id="wall-upload" ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="sr-only" />
        </label>
      )}

      {phase === 'preview' && imagePreview && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-seno-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Wall preview" className="w-full max-h-72 object-cover" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setPhase('idle'); setImagePreview(null); if (fileRef.current) fileRef.current.value = '' }}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAnalyze} className="flex-1">
              Analyze Route
            </Button>
          </div>
        </div>
      )}

      {phase === 'scanning' && imagePreview && (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-seno-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Scanning" className="w-full max-h-72 object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-seno-dark/80 rounded-2xl px-6 py-4 text-center space-y-2">
                <Loader2 size={28} className="text-seno-blue animate-spin mx-auto" />
                <p className="text-white text-sm font-semibold">Route-setting deliverable in progress...</p>
                <p className="text-white/60 text-xs">Consulting the fictional setter community</p>
              </div>
            </div>
            {/* Scan line */}
            <div className="absolute inset-x-0 h-0.5 bg-seno-blue/60 animate-scan" />
          </div>
        </div>
      )}
    </Card>
  )
}
