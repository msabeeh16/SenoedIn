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

  return (
    <div className="max-w-xl mx-auto px-3 py-4 space-y-4">
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
    </div>
  )
}
