import { NextRequest, NextResponse } from 'next/server'
import { getRandomClimbReport } from '../../../lib/utils/fallbacks'
import { generateMarkers } from '../../../lib/utils/climbing'
import type { ClimbAnalysisResponse } from '../../../lib/types'

export async function POST(req: NextRequest) {
  const geminiEnabled = process.env.ENABLE_GEMINI === 'true'
  const apiKey = process.env.GEMINI_API_KEY

  const body = await req.json().catch(() => ({})) as { imageName?: string }
  const imageName = body.imageName ?? 'wall.jpg'
  const markers = generateMarkers(imageName)

  if (!geminiEnabled || !apiKey) {
    const report = getRandomClimbReport()
    return NextResponse.json({ data: { ...report, markers }, source: 'fallback' })
  }

  try {
    const prompt = `You are a parody climbing route analyst for a fictional professional network. Generate a humorous climbing route report.
Image filename: "${imageName}"
Return ONLY valid JSON:
{
  "routeName": "string (funny corporate/professional-themed route name)",
  "fictionalGrade": "string (e.g. 'V5 (Anxious)' or 'V7 (Aspirational)')",
  "style": "string (e.g. 'Technical Arete / Power Endurance / Existential')",
  "startingHolds": "string (describe starting holds with corporate metaphors)",
  "crux": "string (describe the hardest section with workplace humor)",
  "beta": "string (advice with professional/life advice subtext)",
  "dramaticReview": "string (2-3 sentence dramatic review of the route)",
  "safetyDisclaimer": "Parody route report only. Do not climb unapproved structures. Decorative markers are not verified holds."
}`

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.85, maxOutputTokens: 512 },
        }),
        signal: AbortSignal.timeout(8000),
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
