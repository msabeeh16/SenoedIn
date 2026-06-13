// Supabase integration stub — enable via NEXT_PUBLIC_ENABLE_SUPABASE=true
// Requires: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
//
// SQL migration reference:
//   CREATE TABLE profiles (id uuid primary key, name text, headline text, ...);
//   CREATE TABLE cat_posts (id uuid primary key, author_id uuid, content text, timestamp timestamptz, endorsements int, ...);
//   CREATE TABLE climbing_reports (id uuid primary key, route_name text, fictional_grade text, ...);
//   CREATE TABLE game_reviews (id uuid primary key, youtube_url text, title text, ratings jsonb, ...);
//   CREATE TABLE song_swipes (id uuid primary key, song_id text, direction text, timestamp timestamptz);

import type { Store, CatPost, Comment, ClimbingReport, GameReview, MusicSwipe } from '../types'
import { LocalStore } from './local-store'

export class SupabaseStore implements Store {
  private fallback = new LocalStore()

  // All methods delegate to LocalStore until Supabase client is wired up.
  // Replace each method body with actual Supabase calls after configuring credentials.

  async getCatPosts(): Promise<CatPost[]> { return this.fallback.getCatPosts() }
  async addCatPost(post: CatPost): Promise<void> { return this.fallback.addCatPost(post) }
  async updateEndorsements(postId: string, count: number): Promise<void> { return this.fallback.updateEndorsements(postId, count) }
  async addComment(postId: string, comment: Comment): Promise<void> { return this.fallback.addComment(postId, comment) }
  async getClimbingReports(): Promise<ClimbingReport[]> { return this.fallback.getClimbingReports() }
  async addClimbingReport(report: ClimbingReport): Promise<void> { return this.fallback.addClimbingReport(report) }
  async getGameReviews(): Promise<GameReview[]> { return this.fallback.getGameReviews() }
  async addGameReview(review: GameReview): Promise<void> { return this.fallback.addGameReview(review) }
  async getMusicSwipes(): Promise<MusicSwipe[]> { return this.fallback.getMusicSwipes() }
  async addMusicSwipe(swipe: MusicSwipe): Promise<void> { return this.fallback.addMusicSwipe(swipe) }
}
