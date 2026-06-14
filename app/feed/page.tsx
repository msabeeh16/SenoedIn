'use client'

import { useState, useEffect } from 'react'
import type { CatPost, Comment } from '../../lib/types'
import { PostCard } from '../../components/cats/PostCard'
import { PostComposer } from '../../components/cats/PostComposer'
import { seedPosts } from '../../data/seed-posts'
import { getStore } from '../../lib/storage'
import { getStoredComments, getStoredReactions } from '../../lib/storage/local-store'
import { Toast } from '../../components/ui/Toast'

export default function FeedPage() {
  const [posts, setPosts] = useState<CatPost[]>([])
  const [loaded, setLoaded] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const store = getStore()
      const userPosts = await store.getCatPosts()
      const reactions = getStoredReactions()
      const comments = getStoredComments()
      setPosts([...userPosts, ...seedPosts].map(post => ({
        ...post,
        endorsements: reactions[post.id] ?? post.endorsements,
        comments: [...post.comments, ...(comments[post.id] ?? [])],
      })))
      setLoaded(true)
    }
    load()
  }, [])

  function handlePublish(post: CatPost) {
    const store = getStore()
    store.addCatPost(post)
    setPosts(prev => [post, ...prev])
  }

  function handleEndorse(postId: string, current: number) {
    const store = getStore()
    store.updateEndorsements(postId, current)
  }

  function handleComment(postId: string, text: string) {
    const store = getStore()
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorId: 'user',
      authorName: 'Seno',
      authorTitle: 'Senior Nap Strategist',
      content: text,
      timestamp: 'Just now',
      likes: 0,
    }
    store.addComment(postId, newComment)
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    )
  }

  const filteredPosts = selectedTag
    ? posts.filter(p => p.content.toLowerCase().includes(selectedTag.toLowerCase()))
    : posts

  const trending = [
    { tag: '#StrategicNapping',     stat: '2.4k endorsements', hot: true  },
    { tag: '#TerritoryExpansion',   stat: '↑ 847 this week',   hot: true  },
    { tag: '#MidnightVocals',       stat: '1.2k mentions',     hot: false },
    { tag: '#BlanketRelocation',    stat: 'Trending near you',  hot: false },
    { tag: '#SunPatchAlliance',     stat: '↑ 203 today',       hot: false },
    { tag: '#WindowsillDiplomacy',  stat: 'Emerging topic',    hot: false },
    { tag: '#LapAcquisition',       stat: '↑ 562 this week',   hot: false },
    { tag: '#ChaosLeadership',      stat: '3.2k endorsements', hot: true  },
  ]

  return (
    <div className="max-w-xl mx-auto py-4">
      {/* Trending in the Territory */}
      <div className="px-4 pb-1">
        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: '#555555' }}>
          Trending in the Territory
        </p>
      </div>
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {trending.map(({ tag, stat, hot }) => {
          const isActive = selectedTag === tag
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(isActive ? null : tag)}
              className="flex-shrink-0 rounded-xl px-3 py-2 text-left transition-all"
              style={{
                background: isActive ? 'rgba(212,160,23,0.15)' : '#111111',
                border: `1px solid ${isActive ? 'rgba(212,160,23,0.6)' : '#2a2a2a'}`,
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              <div className="flex items-center gap-1 mb-0.5">
                {hot && <span style={{ fontSize: 9 }}>🔥</span>}
                <span className="text-[11px] font-bold" style={{ color: isActive ? '#d4a017' : '#f0ede4' }}>{tag}</span>
              </div>
              <p className="text-[10px]" style={{ color: '#555555' }}>{isActive ? 'tap to clear' : stat}</p>
            </button>
          )
        })}
      </div>
      {selectedTag && (
        <div className="px-4 pb-3 flex items-center gap-2">
          <span className="text-xs" style={{ color: '#888' }}>
            Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for
            <span style={{ color: '#d4a017' }}> {selectedTag}</span>
          </span>
          <button onClick={() => setSelectedTag(null)} className="text-[10px] hover:opacity-70" style={{ color: '#555' }}>✕ clear</button>
        </div>
      )}

      <div className="px-3 mb-4">
        <PostComposer onPublish={handlePublish} />
      </div>

      {!loaded ? (
        <div className="text-center py-16 text-seno-muted text-sm">
          <div className="text-3xl mb-3 animate-pulse-dot">🐾</div>
          <p>Aligning stakeholders...</p>
        </div>
      ) : (
        <div className="px-3 space-y-4">
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onEndorse={handleEndorse}
              onComment={handleComment}
              onNotify={setToast}
            />
          ))}
        </div>
      )}
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  )
}
