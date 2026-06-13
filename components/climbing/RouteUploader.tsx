'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera, Upload, Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'
import type { ClimbingReport } from '../../lib/types'
import { generateMarkers } from '../../lib/utils/climbing'

interface RouteUploaderProps {
  onReport: (report: ClimbingReport) => void
}

type Phase = 'idle' | 'preview' | 'scanning' | 'done'

const SCAN_STEPS = [
  'Identifying climbable structures...',
  'Mapping potential hold positions...',
  'Calculating friction coefficients...',
  'Consulting the fictional setter community...',
  'Assigning V-grade (with confidence)...',
  'Drafting dramatic beta commentary...',
]

export function RouteUploader({ onReport }: RouteUploaderProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageName, setImageName] = useState('')
  const [scanStep, setScanStep] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (phase !== 'scanning') return
    setScanStep(0)
    const interval = setInterval(() => {
      setScanStep(s => (s + 1) % SCAN_STEPS.length)
    }, 900)
    return () => clearInterval(interval)
  }, [phase])

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
      const mimeType = imagePreview?.split(';')[0]?.split(':')[1] || 'image/jpeg'
      const res = await fetch('/api/analyze-climb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType,
          imageName,
        }),
      })
      const json = await res.json() as { data: Omit<ClimbingReport, 'id' | 'timestamp' | 'imageUrl' | 'imageName' | 'markers'> & { markers?: ClimbingReport['markers'] } }
      const report: ClimbingReport = {
        id: `climb-${Date.now()}`,
        imageUrl: imagePreview ?? undefined,
        imageName,
        timestamp: 'Just now',
        ...json.data,
        markers: json.data.markers ?? generateMarkers(imageName),
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
          <p>Parody route report only. Decorative markers are not verified holds. Do not climb unapproved structures. Yield to children on playground equipment.</p>
        </div>

        {phase === 'idle' && (
          <div className="grid grid-cols-2 gap-3">
            <label htmlFor="wall-camera" className="cursor-pointer">
              <div className="border-2 border-dashed border-seno-border hover:border-seno-gold/50 rounded-2xl p-6 text-center hover:bg-seno-gold-tint transition-all flex flex-col items-center gap-2">
                <Camera size={28} className="text-seno-gold" />
                <p className="text-xs font-semibold text-seno-text">Take Photo</p>
                <p className="text-[10px] text-seno-dim">Rear camera</p>
              </div>
              <input id="wall-camera" ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFile} className="sr-only" />
            </label>
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
              <img src={imagePreview} alt="Wall preview" className="w-full max-h-72 object-cover" />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={reset} className="flex-1">Cancel</Button>
              <Button size="sm" onClick={handleAnalyze} className="flex-1">Analyze Route</Button>
            </div>
          </div>
        )}

        {phase === 'scanning' && imagePreview && (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-seno-border-gold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Scanning" className="w-full max-h-72 object-cover opacity-60" />

              {/* Scanning line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-seno-gold to-transparent animate-scan" />

              {/* AI overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
                <div className="bg-black/85 backdrop-blur-sm rounded-2xl px-5 py-4 text-center border border-seno-border-gold w-full max-w-xs">
                  <Loader2 size={22} className="text-seno-gold animate-spin mx-auto mb-2" />
                  <p className="text-seno-gold text-xs font-bold mb-1">AI Route Analysis</p>
                  <p className="text-seno-muted text-[11px] transition-all duration-300">{SCAN_STEPS[scanStep]}</p>
                </div>
              </div>

              {/* Corner brackets — visual AI framing effect */}
              {[
                'top-2 left-2 border-t-2 border-l-2',
                'top-2 right-2 border-t-2 border-r-2',
                'bottom-2 left-2 border-b-2 border-l-2',
                'bottom-2 right-2 border-b-2 border-r-2',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-5 h-5 border-seno-gold ${cls}`} />
              ))}
            </div>

            <div className="flex items-center gap-2 px-1">
              {SCAN_STEPS.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-0.5 rounded-full transition-all duration-300"
                  style={{ background: i <= scanStep ? '#d4a017' : '#1e1e1e' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
