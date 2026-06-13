'use client'

import { useState } from 'react'
import type { CatPost } from '../../lib/types'
import { CatAvatar } from './CatAvatar'
import { CommentSection } from './CommentSection'
import { Card } from '../ui/Card'
import { ThumbsUp, MessageSquare, Share2, Repeat2, MapPin } from 'lucide-react'

interface PostCardProps {
  post: CatPost
  onEndorse: (postId: string, current: number) => void
  onComment: (postId: string, text: string) => void
  className?: string
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}

export function PostCard({ post, onEndorse, onComment, className = '' }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [endorsed, setEndorsed] = useState(false)
  const [localEndorsements, setLocalEndorsements] = useState(post.endorsements)

  const handleEndorse = () => {
    const next = endorsed ? localEndorsements - 1 : localEndorsements + 1
    setEndorsed(!endorsed)
    setLocalEndorsements(next)
    onEndorse(post.id, next)
  }

  const paragraphs = post.content.split('\n\n').filter(Boolean)

  return (
    <Card padding={false} className={`animate-fade-in-up overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <CatAvatar name={post.author.name} avatar={post.author.avatar} color={post.author.color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <h3 className="text-sm font-bold text-seno-dark truncate">{post.author.name}</h3>
            {post.isUserPost && (
              <span className="text-[10px] bg-seno-blue-light text-seno-blue px-1.5 py-0.5 rounded-full font-semibold">You</span>
            )}
          </div>
          <p className="text-xs text-seno-muted leading-tight line-clamp-1">{post.author.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-seno-muted">{post.timestamp}</span>
            <span className="text-seno-muted">·</span>
            <MapPin size={10} className="text-seno-muted" />
            <span className="text-[10px] text-seno-muted">{post.author.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3 space-y-2">
        {paragraphs.map((para, i) => (
          <p key={i} className={`text-sm text-seno-dark leading-relaxed ${i === paragraphs.length - 1 && para.startsWith('#') ? 'text-seno-blue text-xs' : ''}`}>
            {para}
          </p>
        ))}
      </div>

      {/* Image */}
      {post.image && (
        <div className="px-4 pb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="Post image" className="w-full rounded-lg object-cover max-h-80 border border-seno-border" />
        </div>
      )}

      {/* Stats row */}
      <div className="px-4 py-2 border-t border-seno-border flex items-center justify-between text-xs text-seno-muted">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 hover:underline hover:text-seno-blue transition-colors"
        >
          <span>👍</span>
          <span>{formatCount(localEndorsements)} endorsements</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="hover:underline hover:text-seno-blue transition-colors"
        >
          {post.comments.length} feedback items · {formatCount(post.escalations)} escalations
        </button>
      </div>

      {/* Actions */}
      <div className="px-2 py-1 border-t border-seno-border flex items-center">
        {[
          { label: 'Endorse', icon: ThumbsUp, action: handleEndorse, active: endorsed },
          { label: 'Provide Feedback', icon: MessageSquare, action: () => setShowComments(!showComments), active: showComments },
          { label: 'Escalate', icon: Repeat2, action: () => {}, active: false },
          { label: 'Forward to Leadership', icon: Share2, action: () => {}, active: false },
        ].map(({ label, icon: Icon, action, active }) => (
          <button
            key={label}
            onClick={action}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              active ? 'text-seno-blue bg-seno-blue-pale' : 'text-seno-muted hover:bg-seno-surface hover:text-seno-dark'
            }`}
          >
            <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
            <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-4">
          <CommentSection
            comments={post.comments}
            postId={post.id}
            onAddComment={onComment}
          />
        </div>
      )}
    </Card>
  )
}
