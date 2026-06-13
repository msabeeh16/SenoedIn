'use client'

import { useState, useEffect } from 'react'
import type { CatPost, Comment } from '../../lib/types'
import { PostCard } from '../../components/cats/PostCard'
import { PostComposer } from '../../components/cats/PostComposer'
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

  const storyAuthors = [...new Map(
    [...posts].map(p => [p.authorId, p.author])
  ).values()].slice(0, 8)

  return (
    <div className="max-w-xl mx-auto py-4">
      {/* Stories row */}
      <div className="flex gap-3 px-4 pb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {storyAuthors.map(author => (
          <div key={author.id} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div
              className="w-14 h-14 rounded-full p-0.5"
              style={{ background: 'linear-gradient(135deg, #d4a017, #e8b420)' }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-2xl"
                style={{ background: '#0a0a0a', border: '2px solid #0a0a0a', backgroundColor: author.color + '22' }}
              >
                {author.avatar}
              </div>
            </div>
            <span className="text-[10px]" style={{ color: '#888888' }}>{author.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>

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
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onEndorse={handleEndorse}
              onComment={handleComment}
            />
          ))}
        </div>
      )}
    </div>
  )
}
