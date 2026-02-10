/**
 * Robust JSON parser for AI API responses.
 * Handles markdown code blocks, truncated JSON, and trailing commas.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAIResponse(text: string): any {
  // 1. Remove markdown code blocks
  let clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  // 2. Find first { or [
  const firstBrace = clean.indexOf('{')
  const firstBracket = clean.indexOf('[')
  const start = Math.min(
    firstBrace >= 0 ? firstBrace : Infinity,
    firstBracket >= 0 ? firstBracket : Infinity
  )
  if (start === Infinity) throw new Error('No JSON found in AI response')
  clean = clean.substring(start)

  // 3. Try direct parse
  try {
    return JSON.parse(clean)
  } catch {
    // 4. Trim to last valid closing bracket/brace
    const lastBrace = clean.lastIndexOf('}')
    const lastBracket = clean.lastIndexOf(']')
    const end = Math.max(lastBrace, lastBracket) + 1
    if (end <= 0) throw new Error('No valid JSON brackets found')
    const trimmed = clean.substring(0, end)

    try {
      return JSON.parse(trimmed)
    } catch {
      // 5. Remove trailing commas and retry
      const noTrailing = trimmed.replace(/,\s*([}\]])/g, '$1')
      return JSON.parse(noTrailing)
    }
  }
}
