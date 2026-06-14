import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const title  = req.nextUrl.searchParams.get('title')  ?? ''
  const artist = req.nextUrl.searchParams.get('artist') ?? ''

  try {
    const query = encodeURIComponent(`${artist} ${title}`.trim())
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music&limit=5&entity=song`,
      { next: { revalidate: 3600 } }
    )
    const data = await res.json() as {
      results?: Array<{ previewUrl?: string; trackName?: string; artistName?: string }>
    }

    // prefer a result that matches both title and artist
    const results = data.results ?? []
    const best =
      results.find(r =>
        r.previewUrl &&
        r.trackName?.toLowerCase().includes(title.toLowerCase()) &&
        r.artistName?.toLowerCase().includes(artist.toLowerCase())
      ) ??
      results.find(r => r.previewUrl && r.trackName?.toLowerCase().includes(title.toLowerCase())) ??
      results.find(r => r.previewUrl)

    return NextResponse.json({ previewUrl: best?.previewUrl ?? null })
  } catch {
    return NextResponse.json({ previewUrl: null })
  }
}
