'use client'

import { useState, useRef } from 'react'
import { Image as ImageIcon, Send, X } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import type { CatPost, CatCaptionResponse } from '../../lib/types'

interface PostComposerProps {
  onPublish: (post: CatPost) => void
}

export function PostComposer({ onPublish }: PostComposerProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageName, setImageName] = useState('')
  const [caption, setCaption] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<CatCaptionResponse | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageName(file.name)
    const reader = new FileReader()
    reader.onload = ev => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-cat-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageName }),
      })
      const data = await res.json() as { data: CatCaptionResponse }
      setGenerated(data.data)
      setCaption(data.data.caption + '\n\n' + data.data.hashtags.join(' '))
    } catch {
      setCaption('Exciting news: after extensive deliberation, I have secured the good spot on the couch. Stakeholders have been notified. #StrategicYearning #AdvancedNapping')
    } finally {
      setGenerating(false)
    }
  }

  const handlePublish = () => {
    if (!caption.trim()) return
    const post: CatPost = {
      id: `user-post-${Date.now()}`,
      authorId: 'user',
      author: {
        id: 'user',
        name: 'Seno',
        title: 'Senior Nap Strategist · Amateur Route Setter',
        avatar: 'SE',
        color: '#0a66c2',
        location: 'Greater Bedroom Metropolitan Area',
        followers: 500,
      },
      content: caption,
      image: imagePreview || undefined,
      timestamp: 'Just now',
      endorsements: 0,
      escalations: 0,
      comments: [],
      isUserPost: true,
    }
    onPublish(post)
    setCaption('')
    setImagePreview(null)
    setImageName('')
    setGenerated(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <Card>
      <div className="flex gap-3">
        <div className="w-11 h-11 rounded-full bg-seno-accent flex items-center justify-center text-white font-black text-sm shrink-0">
          SE
        </div>
        <div className="flex-1 space-y-3">
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Document an incident for your professional network..."
            className="w-full bg-transparent text-sm text-seno-dark placeholder:text-seno-muted outline-none resize-none min-h-[72px]"
            aria-label="Post content"
          />

          {imagePreview && (
            <div className="relative rounded-xl overflow-hidden border border-seno-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover" />
              <button
                onClick={() => { setImagePreview(null); setImageName(''); if (fileRef.current) fileRef.current.value = '' }}
                className="absolute top-2 right-2 bg-seno-dark/70 text-white rounded-full p-1 hover:bg-seno-dark transition-colors"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {generated && !imagePreview && (
            <div className="bg-seno-blue-pale border border-seno-blue-light rounded-lg p-3 text-xs text-seno-blue space-y-1">
              <p className="font-semibold">🐾 {generated.catName} · {generated.professionalTitle}</p>
              {generated.celebrationReason && <p className="text-seno-muted">{generated.celebrationReason}</p>}
            </div>
          )}

          <div className="flex items-center gap-2 pt-2 border-t border-seno-border flex-wrap">
            <label htmlFor="cat-image-upload" className="cursor-pointer">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-seno-muted hover:text-seno-blue transition-colors px-2 py-1 rounded-lg hover:bg-seno-blue-pale">
                <ImageIcon size={18} />
                <span>Document Incident</span>
              </div>
              <input
                id="cat-image-upload"
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>

            <div className="flex-1" />

            {imagePreview && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerate}
                loading={generating}
              >
                {generating ? 'Consulting feline communications department...' : 'Generate Communications Strategy'}
              </Button>
            )}

            <Button
              size="sm"
              onClick={handlePublish}
              disabled={!caption.trim()}
            >
              <Send size={14} />
              Publish
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
