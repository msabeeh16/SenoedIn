'use client'

import { useState } from 'react'
import type { Comment } from '../../lib/types'
import { Send } from 'lucide-react'

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
        <div key={comment.id} className="flex gap-2.5">
          <div className="w-7 h-7 rounded-full bg-seno-gold/20 border border-seno-border-gold flex items-center justify-center text-seno-gold text-xs font-bold shrink-0">
            {comment.authorName[0]}
          </div>
          <div className="flex-1 bg-seno-card-2 rounded-xl px-3 py-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-seno-gold">{comment.authorName}</span>
              <span className="text-[10px] text-seno-dim">· {comment.authorTitle}</span>
            </div>
            <p className="text-xs text-seno-text mt-0.5 leading-relaxed">{comment.content}</p>
            <span className="text-[10px] text-seno-dim mt-1 block">{comment.timestamp}</span>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <div className="w-7 h-7 rounded-full bg-seno-gold flex items-center justify-center text-[#0a0a0a] text-xs font-black shrink-0">
          SE
        </div>
        <div className="flex-1 flex items-center gap-2 bg-seno-card-2 border border-seno-border rounded-full px-3 py-2 focus-within:border-seno-border-gold transition-colors">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Provide professional feedback..."
            className="flex-1 bg-transparent text-xs text-seno-text placeholder:text-seno-dim outline-none"
            aria-label="Add a comment"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="text-seno-gold disabled:opacity-30 hover:opacity-70 transition-opacity"
            aria-label="Submit"
          >
            <Send size={13} />
          </button>
        </div>
      </form>
    </div>
  )
}
