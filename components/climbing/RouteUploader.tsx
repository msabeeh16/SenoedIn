'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'
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
  const cameraRef = useRef<HTMLInputElement>(null)

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
      const json = await res.json() as { data: Omit<ClimbingReport, 'id' | 'timestamp' | 'imageUrl' | 'imageName' | 'markers'> }
      const report: ClimbingReport = {
        id: `climb-${Date.now()}`,
        imageUrl: imagePreview ?? undefined,
        imageName,
        timestamp: 'Just now',
        ...json.data,
        markers: generateMarkers(imageName),
      }
      onReport(report)
      setPhase('idle')
      setImagePreview(null)
      setImageName('')
      if (fileRef.current) fileRef.current.value = ''
      if (cameraRef.current) cameraRef.current.value = ''
    } catch {
      const { getRandomClimbReport } = await import('../../lib/utils/fallbacks')
      const fallback = getRandomClimbReport()
      onReport({
        id: `climb-${Date.now()}`,
        imageUrl: imagePreview ?? undefined,
        imageName,
        timestamp: 'Just now',
        markers: generateMarkers(imageName),
        ...fallback,
      })
      setPhase('idle')
    }
  }

  const reset = () => {
    setPhase('idle')
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ''
    if (cameraRef.current) cameraRef.current.value = ''
  }

  return (
    <div className="bg-seno-card border border-seno-border rounded-2xl overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-seno-gold/50 to-transparent" />
      <div className="p-4 space-y-4">
        <h2 className="font-bold text-seno-text">Document a New Route</h2>

        <div className="bg-amber-950/25 border border-amber-800/30 rounded-xl p-3 text-xs text-amber-400/80 flex items-start gap-2">
          <span className="text-base shrink-0">⚠️</span>
          <p>Parody route report only. Decorative markers are not verified holds. Do not climb unapproved structures. Yield to children on playground equipment. Trees are unverified climbing surfaces.</p>
        </div>

        {phase === 'idle' && (
          <div className="grid grid-cols-2 gap-3">
            {/* Camera (mobile) */}
            <label htmlFor="wall-camera" className="cursor-pointer">
              <div className="border-2 border-dashed border-seno-border hover:border-seno-gold/50 rounded-2xl p-6 text-center hover:bg-seno-gold-tint transition-all flex flex-col items-center gap-2">
                <Camera size={28} className="text-seno-gold" />
                <p className="text-xs font-semibold text-seno-text">Take Photo</p>
                <p className="text-[10px] text-seno-dim">Rear camera</p>
              </div>
              <input id="wall-camera" ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFile} className="sr-only" />
            </label>

            {/* Gallery */}
            <label htmlFor="wall-gallery" className="cursor-pointer">
              <div className="border-2 border-dashed border-seno-border hover:border-seno-gold/50 rounded-2xl p-6 text-center hover:bg-seno-gold-tint transition-all flex flex-col items-center gap-2">
                <Upload size={28} className="text-seno-muted" />
                <p className="text-xs font-semibold text-seno-text">Upload Image</p>
                <p className="text-[10px] text-seno-dim">From gallery</p>
              </div>
              <input id="wall-gallery" ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="sr-only" />
            </label>
          </div>
        )}

        {phase === 'preview' && imagePreview && (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-seno-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Wall preview" className="w-full max-h-64 object-cover" />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={reset} className="flex-1">Cancel</Button>
              <Button size="sm" onClick={handleAnalyze} className="flex-1">Analyze Route</Button>
            </div>
          </div>
        )}

        {phase === 'scanning' && imagePreview && (
          <div className="relative rounded-xl overflow-hidden border border-seno-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Scanning" className="w-full max-h-64 object-cover opacity-40" />
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-seno-gold to-transparent animate-scan" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/80 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-seno-border-gold">
                <Loader2 size={24} className="text-seno-gold animate-spin mx-auto mb-2" />
                <p className="text-seno-gold text-sm font-bold">Route-setting deliverable in progress...</p>
                <p className="text-seno-dim text-xs mt-1">Consulting the fictional setter community</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
