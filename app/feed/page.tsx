'use client'

import { useState, useEffect } from 'react'
import type { CatPost, Comment } from '../../lib/types'
import { PostCard } from '../../components/cats/PostCard'
import { PostComposer } from '../../components/cats/PostComposer'
import { ProfileSidebar } from '../../components/shared/ProfileSidebar'
import { TrendingSidebar } from '../../components/shared/TrendingSidebar'
import { seedPosts } from '../../data/seed-posts'
import { getStore } from '../../lib/storage'

export default function FeedPage() {
  const [posts, setPosts] = useState<CatPost[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function load() {
      const store = getStore()
      const userPosts = await store.getCatPosts()
      setPosts([...userPosts, ...seedPosts])
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Left sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-4 sticky top-20 self-start">
          <ProfileSidebar />
          <div className="bg-seno-card border border-seno-border rounded-xl p-4 text-xs text-seno-muted space-y-2">
            <p className="font-semibold text-seno-dark">Cats you may have unresolved history with</p>
            {['Director Pudding', 'SVP Noodlemane', 'Orangecat (no title)'].map(name => (
              <div key={name} className="flex items-center justify-between gap-2">
                <span>{name}</span>
                <button className="text-seno-blue font-semibold hover:underline text-[10px]">Connect</button>
              </div>
            ))}
          </div>
        </aside>

        {/* Main feed */}
        <main className="flex-1 min-w-0 space-y-4">
          <PostComposer onPublish={handlePublish} />

          {!loaded ? (
            <div className="text-center py-16 text-seno-muted text-sm">
              <div className="text-3xl mb-3 animate-pulse-dot">🐾</div>
              <p>Aligning stakeholders...</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onEndorse={handleEndorse}
                onComment={handleComment}
              />
            ))
          )}
        </main>

        {/* Right sidebar */}
        <aside className="hidden xl:block w-72 shrink-0 space-y-4 sticky top-20 self-start">
          <TrendingSidebar />
          <div className="bg-seno-card border border-seno-border rounded-xl p-4">
            <p className="text-xs font-bold text-seno-dark mb-3">Recent Developments</p>
            {[
              { text: 'CEO Biscuit escalated 3 blanket incidents', time: '2h ago', emoji: '📋' },
              { text: 'New treaty signed: Windowsill Accord v2.1', time: '5h ago', emoji: '🤝' },
              { text: 'VP Fluffington endorsed your nap methodology', time: '1d ago', emoji: '👍' },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 py-2 border-b border-seno-border last:border-0">
                <span className="text-base">{item.emoji}</span>
                <div>
                  <p className="text-xs text-seno-dark">{item.text}</p>
                  <p className="text-[10px] text-seno-muted mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
