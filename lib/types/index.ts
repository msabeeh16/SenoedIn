export interface CatProfile {
  id: string
  name: string
  title: string
  avatar: string
  color: string
  location: string
  followers: number
}

export interface Comment {
  id: string
  authorId: string
  authorName: string
  authorTitle: string
  content: string
  timestamp: string
  likes: number
}

export interface CatPost {
  id: string
  authorId: string
  author: CatProfile
  content: string
  image?: string
  timestamp: string
  endorsements: number
  escalations: number
  comments: Comment[]
  isUserPost?: boolean
}

export interface RouteMarker {
  id: string
  label: string
  x: number
  y: number
  tooltip: string
}

export interface ClimbingReport {
  id: string
  imageUrl?: string
  imageName?: string
  routeName: string
  fictionalGrade: string
  style: string
  startingHolds: string
  crux: string
  beta: string
  dramaticReview: string
  safetyDisclaimer: string
  markers: RouteMarker[]
  timestamp: string
}

export interface RatingFields {
  actionsPerMinute: number
  blindness: number
  rageLevel: number
  lootAwareness: number
  strategicIntegrity: number
  commentary: number
}

export interface GameReview {
  id: string
  youtubeUrl: string
  videoId: string
  title: string
  ratings: RatingFields
  classification: string
  timestamp: string
}

export interface Song {
  id: string
  title: string
  artist: string
  genre: string
  spotifyUrl: string
  spotifyEmbedUrl: string
  competencyLabel: string
  isFriendApproved: boolean
}

export interface MusicSwipe {
  songId: string
  direction: 'endorse' | 'decline'
  timestamp: string
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  isRead: boolean
}

export interface MessageThread {
  id: string
  participantName: string
  participantTitle: string
  participantAvatar: string
  participantColor: string
  messages: ChatMessage[]
  lastActivity: string
  preview: string
  isUnread: boolean
}

export interface ProfileData {
  name: string
  headline: string
  location: string
  about: string
  avatarInitials: string
  connections: string
  profileViews: number
  treatyViolations: number
  routesImagined: number
  yearningAlignment: number
  escalatedIncidents: number
  experience: ExperienceEntry[]
  skills: SkillEntry[]
}

export interface ExperienceEntry {
  id: string
  title: string
  company: string
  period: string
  description: string
}

export interface SkillEntry {
  id: string
  name: string
  endorsementCount: number
  endorsers: string[]
}

export interface CatCaptionResponse {
  catName: string
  professionalTitle: string
  caption: string
  hashtags: string[]
  rivalryMention: string
  celebrationReason: string
}

export interface ClimbAnalysisResponse {
  routeName: string
  fictionalGrade: string
  style: string
  startingHolds: string
  crux: string
  beta: string
  dramaticReview: string
  safetyDisclaimer: string
}

export interface Store {
  getCatPosts(): Promise<CatPost[]>
  addCatPost(post: CatPost): Promise<void>
  updateEndorsements(postId: string, count: number): Promise<void>
  addComment(postId: string, comment: Comment): Promise<void>
  getClimbingReports(): Promise<ClimbingReport[]>
  addClimbingReport(report: ClimbingReport): Promise<void>
  getGameReviews(): Promise<GameReview[]>
  addGameReview(review: GameReview): Promise<void>
  getMusicSwipes(): Promise<MusicSwipe[]>
  addMusicSwipe(swipe: MusicSwipe): Promise<void>
}
