import { NextRequest, NextResponse } from 'next/server'
import { getRandomCatCaption } from '../../../lib/utils/fallbacks'
import type { CatCaptionResponse } from '../../../lib/types'

export async function POST(req: NextRequest) {
  const geminiEnabled = process.env.ENABLE_GEMINI === 'true'
  const apiKey = process.env.GEMINI_API_KEY

  if (!geminiEnabled || !apiKey) {
    return NextResponse.json({ data: getRandomCatCaption(), source: 'fallback' })
  }

  try {
    const body = await req.json() as { imageName?: string }
    const prompt = `You are a parody LinkedIn post generator for cats. Generate a caption for a professional cat social network post.
Context: the image filename is "${body.imageName ?? 'cat.jpg'}".
Return ONLY valid JSON with these exact fields:
{
  "catName": "string (professional cat name with title prefix)",
  "professionalTitle": "string (absurd professional title)",
  "caption": "string (150-250 word LinkedIn-style post, extremely professional tone, absurd content about napping/territory/blankets/sun patches)",
  "hashtags": ["array", "of", "hashtag", "strings"],
  "rivalryMention": "string (brief mention of a cat rival or recent dispute)",
  "celebrationReason": "string (what is being celebrated)"
}`

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 512 },
        }),
        signal: AbortSignal.timeout(8000),
      }
    )

    if (!res.ok) return NextResponse.json({ data: getRandomCatCaption(), source: 'fallback' })

    const result = await res.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] }
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return NextResponse.json({ data: getRandomCatCaption(), source: 'fallback' })

    const parsed = JSON.parse(jsonMatch[0]) as CatCaptionResponse
    return NextResponse.json({ data: parsed, source: 'gemini' })
  } catch {
    return NextResponse.json({ data: getRandomCatCaption(), source: 'fallback' })
  }
}
