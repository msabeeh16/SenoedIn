'use client'

import { useState } from 'react'
import type { CatPost } from '../../lib/types'
import { CatAvatar } from './CatAvatar'
import { CommentSection } from './CommentSection'
import { ThumbsUp, MessageSquare, Share2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

const GOLD = '#d4a017'
const GOLD_LIGHT = '#e8b420'

interface PostCardProps {
  post: CatPost
  onEndorse: (postId: string, current: number) => void
  onComment: (postId: string, text: string) => void
  className?: string
  style?: React.CSSProperties
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}

export function PostCard({ post, onEndorse, onComment, className = '', style }: PostCardProps) {
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
  const bodyParagraphs = paragraphs.filter(p => !p.startsWith('#'))
  const hashtagParagraph = paragraphs.find(p => p.startsWith('#'))
  const hashtags = hashtagParagraph ? hashtagParagraph.split(/\s+/).filter(h => h.startsWith('#')) : []

  return (
    <article
      className={`rounded-2xl overflow-hidden animate-fade-in-up ${className}`}
      style={{
        background: '#111111',
        border: `1px solid ${endorsed ? 'rgba(212,160,23,0.3)' : '#2a2a2a'}`,
        boxShadow: endorsed
          ? `0 0 0 1px rgba(212,160,23,0.08), 0 4px 24px rgba(0,0,0,0.4)`
          : '0 4px 24px rgba(0,0,0,0.3)',
        ...style,
      }}
    >
      {/* Gold accent bar when endorsed */}
      {endorsed && (
        <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, transparent)` }} />
      )}

      {/* Header */}
      <div className="flex items-start gap-3 p-4 pb-3">
        <div
          className="relative flex-shrink-0 rounded-full p-0.5"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
        >
          <div className="rounded-full" style={{ background: '#0a0a0a', padding: 2 }}>
            <CatAvatar name={post.author.name} avatar={post.author.avatar} color={post.author.color} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm font-extrabold" style={{ color: '#f0ede4' }}>{post.author.name}</h3>
            {post.isUserPost && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(212,160,23,0.15)', color: GOLD, border: '1px solid rgba(212,160,23,0.3)' }}>you</span>
            )}
          </div>
          <p className="text-[11px] mt-0.5 line-clamp-1" style={{ color: '#888888' }}>{post.author.title}</p>
          <p className="text-[10px] mt-0.5" style={{ color: '#555555' }}>{post.timestamp}</p>
        </div>
        <button
          className="text-[11px] font-bold rounded-full px-2.5 py-1 flex-shrink-0"
          style={{ color: GOLD, border: '1px solid rgba(212,160,23,0.35)', background: 'rgba(212,160,23,0.06)' }}
        >
          + Connect
        </button>
      </div>

      {/* Full-width image — above content */}
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt="Post"
          className="w-full object-cover"
          style={{ maxHeight: 280 }}
        />
      )}

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-sm leading-relaxed" style={{ color: '#f0ede4', whiteSpace: 'pre-line' }}>
          {bodyParagraphs.join('\n\n')}
        </p>
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {hashtags.map(tag => (
              <span key={tag} style={{ color: endorsed ? GOLD_LIGHT : '#555555', fontSize: 11 }}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between">
        <span style={{ color: '#555555', fontSize: 11 }}>
          {endorsed ? '✦ ' : ''}{localEndorsements.toLocaleString()} endorsements
        </span>
        <button
          style={{ color: '#555555', fontSize: 11 }}
          onClick={() => setShowComments(!showComments)}
        >
          {post.comments.length} comments{' '}
          {showComments ? <ChevronUp size={10} className="inline" /> : <ChevronDown size={10} className="inline" />}
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#1e1e1e', margin: '0 16px' }} />

      {/* Actions */}
      <div className="flex items-center justify-around px-2 py-2">
        {[
          {
            icon: <ThumbsUp size={15} />,
            label: endorsed ? 'Endorsed ✦' : 'Endorse',
            action: handleEndorse,
            active: endorsed,
          },
          { icon: <MessageSquare size={15} />, label: 'Feedback', action: () => setShowComments(v => !v), active: showComments },
          { icon: <AlertTriangle size={15} />, label: 'Escalate', action: () => {}, active: false },
          { icon: <Share2 size={15} />, label: 'Forward', action: () => {}, active: false },
        ].map(btn => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="flex items-center gap-1 px-2 py-1 rounded-lg transition-colors"
            style={{
              color: btn.active ? GOLD : '#888888',
              fontSize: 11,
              fontWeight: btn.active ? 700 : 400,
              background: btn.active ? 'rgba(212,160,23,0.08)' : 'transparent',
            }}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-4">
          <div style={{ height: 1, background: '#1e1e1e', marginBottom: 8 }} />
          <CommentSection comments={post.comments} postId={post.id} onAddComment={onComment} />
        </div>
      )}
    </article>
  )
}
