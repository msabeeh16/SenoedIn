'use client'

import { useState } from 'react'
import type { CatPost } from '../../lib/types'
import { CatAvatar } from './CatAvatar'
import { CommentSection } from './CommentSection'
import { ThumbsUp, MessageSquare, Share2, Repeat2, MapPin } from 'lucide-react'

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

  return (
    <article
      className={`bg-seno-card border border-seno-border rounded-2xl overflow-hidden animate-fade-in-up ${className}`}
      style={style}
    >
      {/* Gold accent top on endorsed */}
      {endorsed && <div className="h-px bg-gradient-to-r from-transparent via-seno-gold to-transparent" />}

      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <CatAvatar name={post.author.name} avatar={post.author.avatar} color={post.author.color} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm font-bold text-seno-text">{post.author.name}</h3>
            {post.isUserPost && (
              <span className="text-[9px] bg-seno-gold/15 text-seno-gold px-1.5 py-0.5 rounded-full font-semibold border border-seno-border-gold">you</span>
            )}
          </div>
          <p className="text-[11px] text-seno-muted leading-tight line-clamp-1 mt-0.5">{post.author.title}</p>
          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-seno-dim">
            <span>{post.timestamp}</span>
            <span>·</span>
            <MapPin size={9} />
            <span className="truncate">{post.author.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3 space-y-2">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className={`text-sm leading-relaxed ${para.startsWith('#') ? 'text-seno-gold/80 text-xs' : 'text-seno-text'}`}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Image */}
      {post.image && (
        <div className="px-4 pb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="Post" className="w-full rounded-xl object-cover max-h-72 border border-seno-border" />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 border-t border-seno-border flex items-center justify-between text-[11px] text-seno-dim">
        <button onClick={() => setShowComments(!showComments)} className="hover:text-seno-gold transition-colors">
          <span className="text-seno-gold">✦</span> {formatCount(localEndorsements)} endorsements
        </button>
        <button onClick={() => setShowComments(!showComments)} className="hover:text-seno-gold transition-colors">
          {post.comments.length} feedback · {formatCount(post.escalations)} escalated
        </button>
      </div>

      {/* Actions */}
      <div className="px-1 py-1 border-t border-seno-border flex items-center">
        {[
          { label: 'Endorse',          icon: ThumbsUp,    action: handleEndorse,                        active: endorsed },
          { label: 'Provide Feedback', icon: MessageSquare, action: () => setShowComments(v => !v),     active: showComments },
          { label: 'Escalate',         icon: Repeat2,     action: () => {},                             active: false },
          { label: 'Forward',          icon: Share2,      action: () => {},                             active: false },
        ].map(({ label, icon: Icon, action, active }) => (
          <button
            key={label}
            onClick={action}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              active
                ? 'text-seno-gold bg-seno-gold-tint'
                : 'text-seno-dim hover:text-seno-muted hover:bg-seno-card-2'
            }`}
          >
            <Icon size={15} strokeWidth={active ? 2.5 : 1.8} />
            <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </div>

      {showComments && (
        <div className="px-4 pb-4">
          <CommentSection comments={post.comments} postId={post.id} onAddComment={onComment} />
        </div>
      )}
    </article>
  )
}
