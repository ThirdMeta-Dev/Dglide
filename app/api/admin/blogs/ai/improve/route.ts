import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { callGemini } from '@/lib/gemini'

export async function POST(req: Request) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  try {
    const { text, instruction } = await req.json()
    const prompt = `Rewrite the following HTML content.
Instruction: ${instruction}

Return ONLY the improved HTML. Preserve useful HTML tags. No explanation.

Content:
${text}`
    const result = await callGemini(prompt, { temperature: 0.7, maxOutputTokens: 4096 })
    return NextResponse.json({ result })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'AI improvement failed' },
      { status: 500 }
    )
  }
}
