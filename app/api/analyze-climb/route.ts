import { NextRequest, NextResponse } from 'next/server'
import { getRandomClimbReport } from '../../../lib/utils/fallbacks'
import { generateMarkers } from '../../../lib/utils/climbing'
import type { ClimbAnalysisResponse } from '../../../lib/types'

const PROMPT = `You are a parody climbing route analyst for a fictional professional network called SenoedIn.

Carefully look at this image. Identify what type of climbable structure is in it (playground equipment, gym wall, tree, fence, building, etc.) and generate a humorous route report based on what you actually see.

Be specific about what's visible — mention the actual colors, shapes, and features you can see (slides, bars, towers, etc.) in the route description. Make the grade and beta sound like real climbing analysis but with absurd professional corporate humor.

Return ONLY valid JSON with no markdown:
{
  "routeName": "A funny corporate/professional-themed name referencing something visible in the image",
  "fictionalGrade": "V? (funny adjective, e.g. 'V4 (Nostalgic)' or 'V6 (Aspirational)')",
  "style": "Climbing style description (e.g. 'Lateral Bar Traverse / Grip Strength / Public Spectacle')",
  "startingHolds": "Describe the starting holds using what's visible in the image, with corporate metaphors",
  "crux": "Describe the hardest section referencing the actual structure visible",
  "beta": "Climbing advice with absurd professional/life advice subtext, referencing visible features",
  "dramaticReview": "2-3 sentence dramatic review that references what's actually in the image",
  "safetyDisclaimer": "Parody route report only. Do not climb unapproved structures. Decorative markers are not verified holds."
}`

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  const body = await req.json().catch(() => ({})) as {
    imageBase64?: string
    mimeType?: string
    imageName?: string
  }

  const imageName = body.imageName ?? 'wall.jpg'
  const markers = generateMarkers(imageName)

  // Strip data URL prefix if present
  const rawBase64 = body.imageBase64?.includes(',')
    ? body.imageBase64.split(',')[1]
    : body.imageBase64

  if (!apiKey || !rawBase64) {
    const report = getRandomClimbReport()
    return NextResponse.json({ data: { ...report, markers }, source: 'fallback' })
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                inline_data: {
                  mime_type: body.mimeType || 'image/jpeg',
                  data: rawBase64,
                },
              },
              { text: PROMPT },
            ],
          }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 600 },
        }),
        signal: AbortSignal.timeout(12000),
      }
    )

    if (!res.ok) {
      const report = getRandomClimbReport()
      return NextResponse.json({ data: { ...report, markers }, source: 'fallback' })
    }

    const result = await res.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] }
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      const report = getRandomClimbReport()
      return NextResponse.json({ data: { ...report, markers }, source: 'fallback' })
    }

    const parsed = JSON.parse(jsonMatch[0]) as ClimbAnalysisResponse
    return NextResponse.json({ data: { ...parsed, markers }, source: 'gemini' })
  } catch {
    const report = getRandomClimbReport()
    return NextResponse.json({ data: { ...report, markers }, source: 'fallback' })
  }
}
