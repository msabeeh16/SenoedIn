'use client'

import { useState } from 'react'
import type { Comment } from '../../lib/types'
import { ThumbsUp, Send } from 'lucide-react'

interface CommentSectionProps {
  comments: Comment[]
  postId: string
  onAddComment: (postId: string, text: string) => void
}

export function CommentSection({ comments, postId, onAddComment }: CommentSectionProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAddComment(postId, trimmed)
    setText('')
  }

  return (
    <div className="border-t border-seno-border mt-3 pt-3 space-y-3">
      {comments.map(comment => (
        <div key={comment.id} className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-seno-blue-light flex items-center justify-center text-seno-blue text-xs font-bold shrink-0">
            {comment.authorName[0]}
          </div>
          <div className="flex-1 bg-seno-surface rounded-xl px-3 py-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-seno-dark">{comment.authorName}</span>
              <span className="text-[10px] text-seno-muted">· {comment.authorTitle}</span>
            </div>
            <p className="text-xs text-seno-dark mt-0.5 leading-relaxed">{comment.content}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <button className="text-[10px] text-seno-muted hover:text-seno-blue flex items-center gap-0.5 transition-colors">
                <ThumbsUp size={10} /> <span>{comment.likes}</span>
              </button>
              <span className="text-[10px] text-seno-muted">{comment.timestamp}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Comment input */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-start">
        <div className="w-7 h-7 rounded-full bg-seno-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
          SE
        </div>
        <div className="flex-1 flex items-center gap-2 bg-seno-surface border border-seno-border rounded-full px-3 py-1.5">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Provide professional feedback..."
            className="flex-1 bg-transparent text-xs text-seno-dark placeholder:text-seno-muted outline-none"
            aria-label="Add a comment"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="text-seno-blue disabled:opacity-30 hover:opacity-70 transition-opacity"
            aria-label="Submit feedback"
          >
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  )
}
