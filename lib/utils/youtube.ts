export function parseYouTubeVideoId(url: string): string | null {
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function isValidYouTubeUrl(url: string): boolean {
  return parseYouTubeVideoId(url) !== null
}

export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

export function classifyReviewScore(avg: number): string {
  if (avg <= 2) return 'Competent but insufficiently dramatic'
  if (avg <= 5) return 'Promising contributor'
  if (avg <= 7) return 'Loot blindness documented'
  if (avg <= 9) return 'Executive intervention required'
  return 'Historic dirt-hut incident'
}

export function calculateAverageRating(ratings: Record<string, number>): number {
  const values = Object.values(ratings)
  return values.reduce((a, b) => a + b, 0) / values.length
}
