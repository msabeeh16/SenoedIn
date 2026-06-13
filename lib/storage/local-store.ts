import type { Store, CatPost, Comment, ClimbingReport, GameReview, MusicSwipe } from '../types'

const KEYS = {
  catPosts: 'senoedin.catPosts',
  climbingReports: 'senoedin.climbingReports',
  gameReviews: 'senoedin.gameReviews',
  musicSwipes: 'senoedin.musicSwipes',
  reactions: 'senoedin.reactions',
  comments: 'senoedin.comments',
} as const

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage quota exceeded — silently ignore
  }
}

export class LocalStore implements Store {
  async getCatPosts(): Promise<CatPost[]> {
    return read<CatPost[]>(KEYS.catPosts, [])
  }

  async addCatPost(post: CatPost): Promise<void> {
    const posts = await this.getCatPosts()
    write(KEYS.catPosts, [post, ...posts])
  }

  async updateEndorsements(postId: string, count: number): Promise<void> {
    const reactions = read<Record<string, number>>(KEYS.reactions, {})
    reactions[postId] = count
    write(KEYS.reactions, reactions)
  }

  async addComment(postId: string, comment: Comment): Promise<void> {
    const comments = read<Record<string, Comment[]>>(KEYS.comments, {})
    comments[postId] = [...(comments[postId] ?? []), comment]
    write(KEYS.comments, comments)
  }

  async getClimbingReports(): Promise<ClimbingReport[]> {
    return read<ClimbingReport[]>(KEYS.climbingReports, [])
  }

  async addClimbingReport(report: ClimbingReport): Promise<void> {
    const reports = await this.getClimbingReports()
    write(KEYS.climbingReports, [report, ...reports])
  }

  async getGameReviews(): Promise<GameReview[]> {
    return read<GameReview[]>(KEYS.gameReviews, [])
  }

  async addGameReview(review: GameReview): Promise<void> {
    const reviews = await this.getGameReviews()
    write(KEYS.gameReviews, [review, ...reviews])
  }

  async getMusicSwipes(): Promise<MusicSwipe[]> {
    return read<MusicSwipe[]>(KEYS.musicSwipes, [])
  }

  async addMusicSwipe(swipe: MusicSwipe): Promise<void> {
    const swipes = await this.getMusicSwipes()
    const existing = swipes.findIndex(s => s.songId === swipe.songId)
    if (existing !== -1) {
      swipes[existing] = swipe
      write(KEYS.musicSwipes, swipes)
    } else {
      write(KEYS.musicSwipes, [...swipes, swipe])
    }
  }
}

export function getStoredReactions(): Record<string, number> {
  return read<Record<string, number>>(KEYS.reactions, {})
}

export function getStoredComments(): Record<string, Comment[]> {
  return read<Record<string, Comment[]>>(KEYS.comments, {})
}
