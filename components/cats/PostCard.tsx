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
  onNotify?: (message: string) => void
  className?: string
  style?: React.CSSProperties
}

export function PostCard({ post, onEndorse, onComment, onNotify, className = '', style }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [endorsed, setEndorsed] = useState(false)
  const [connected, setConnected] = useState(false)
  const [escalated, setEscalated] = useState(false)
  const [localEndorsements, setLocalEndorsements] = useState(post.endorsements)

  const handleEndorse = () => {
    const next = endorsed ? localEndorsements - 1 : localEndorsements + 1
    setEndorsed(!endorsed)
    setLocalEndorsements(next)
    onEndorse(post.id, next)
  }

  const handleForward = async () => {
    const text = `${post.author.name}: ${post.content.slice(0, 120)}`
    try {
      if (navigator.share) await navigator.share({ title: 'SenoedIn post', text })
      else await navigator.clipboard.writeText(text)
      onNotify?.('Post forwarded to the appropriate stakeholders.')
    } catch {
      onNotify?.('Forwarding was cancelled.')
    }
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
        border: `1px solid ${escalated ? 'rgba(155,35,53,0.35)' : endorsed ? 'rgba(212,160,23,0.3)' : '#2a2a2a'}`,
        boxShadow: escalated
          ? '0 0 0 1px rgba(155,35,53,0.08), 0 4px 24px rgba(0,0,0,0.4)'
          : endorsed
          ? `0 0 0 1px rgba(212,160,23,0.08), 0 4px 24px rgba(0,0,0,0.4)`
          : '0 4px 24px rgba(0,0,0,0.3)',
        ...style,
      }}
    >
      {/* Accent bar — gold when endorsed, garnet when escalated */}
      {(endorsed || escalated) && (
        <div style={{ height: 2, background: escalated
          ? 'linear-gradient(90deg, #9B2335, #C42A40, transparent)'
          : `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}, transparent)` }} />
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
          onClick={() => {
            setConnected(value => !value)
            onNotify?.(connected ? `Connection with ${post.author.name} withdrawn.` : `Connected with ${post.author.name}.`)
          }}
          className="text-[11px] font-bold rounded-full px-2.5 py-1 flex-shrink-0"
          style={{ color: GOLD, border: '1px solid rgba(212,160,23,0.35)', background: 'rgba(212,160,23,0.06)' }}
        >
          {connected ? 'Connected' : '+ Connect'}
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
        <button
          onClick={handleEndorse}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors"
          style={{ color: endorsed ? GOLD : '#777', fontSize: 11, fontWeight: endorsed ? 700 : 400, background: endorsed ? 'rgba(212,160,23,0.08)' : 'transparent' }}
        >
          <ThumbsUp size={15} /> {endorsed ? 'Endorsed ✦' : 'Endorse'}
        </button>
        <button
          onClick={() => setShowComments(v => !v)}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors"
          style={{ color: showComments ? GOLD : '#777', fontSize: 11, fontWeight: showComments ? 700 : 400, background: showComments ? 'rgba(212,160,23,0.08)' : 'transparent' }}
        >
          <MessageSquare size={15} /> Feedback
        </button>
        <button
          onClick={() => {
            setEscalated(value => !value)
            onNotify?.(escalated ? 'Escalation withdrawn.' : 'Incident escalated for executive review.')
          }}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors"
          style={{ color: escalated ? '#C42A40' : '#777', fontSize: 11, fontWeight: escalated ? 700 : 400, background: escalated ? 'rgba(155,35,53,0.1)' : 'transparent' }}
        >
          <AlertTriangle size={15} /> {escalated ? 'Escalated' : 'Escalate'}
        </button>
        <button
          onClick={handleForward}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors"
          style={{ color: '#777', fontSize: 11 }}
        >
          <Share2 size={15} /> Forward
        </button>
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
