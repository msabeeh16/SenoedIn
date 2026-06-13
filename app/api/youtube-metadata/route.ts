import { NextRequest, NextResponse } from 'next/server'
import { parseYouTubeVideoId } from '../../../lib/utils/youtube'

interface YouTubeMetadata {
  title: string
  channelTitle: string
  viewCount: string
  likeCount: string
}

const fallbackTitles = [
  'Untitled Performance Review — No Data Available',
  'Let\'s Play: Unknown Title (Metadata Pending)',
  'Gaming Content — Title Retrieval Failed Professionally',
]

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { url?: string }
  const url = body.url ?? ''
  const videoId = parseYouTubeVideoId(url)

  if (!videoId) {
    return NextResponse.json({ error: 'Invalid YouTube URL. Supported formats: youtube.com/watch?v=, youtu.be/, youtube.com/shorts/' }, { status: 400 })
  }

  const ytEnabled = process.env.NEXT_PUBLIC_ENABLE_YOUTUBE_METADATA === 'true'
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!ytEnabled || !apiKey) {
    return NextResponse.json({
      data: {
        title: fallbackTitles[Math.floor(Math.random() * fallbackTitles.length)],
        channelTitle: 'Unknown Creator',
        viewCount: '—',
        likeCount: '—',
      },
      source: 'fallback',
    })
  }

  try {
    const ytUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
    const res = await fetch(ytUrl, { signal: AbortSignal.timeout(6000) })
    if (!res.ok) throw new Error('YouTube API error')

    const data = await res.json() as { items?: { snippet?: { title?: string; channelTitle?: string }; statistics?: { viewCount?: string; likeCount?: string } }[] }
    const item = data.items?.[0]

    if (!item) {
      return NextResponse.json({ data: { title: 'Video not found', channelTitle: '—', viewCount: '—', likeCount: '—' }, source: 'youtube' })
    }

    const metadata: YouTubeMetadata = {
      title: item.snippet?.title ?? '—',
      channelTitle: item.snippet?.channelTitle ?? '—',
      viewCount: item.statistics?.viewCount ?? '—',
      likeCount: item.statistics?.likeCount ?? '—',
    }
    return NextResponse.json({ data: metadata, source: 'youtube' })
  } catch {
    return NextResponse.json({
      data: {
        title: fallbackTitles[Math.floor(Math.random() * fallbackTitles.length)],
        channelTitle: 'Unknown Creator',
        viewCount: '—',
        likeCount: '—',
      },
      source: 'fallback',
    })
  }
}
