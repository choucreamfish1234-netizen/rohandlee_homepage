/**
 * 블로그 글에서 마크다운 강조 기호(**굵게**, *기울임*)의 별표를 없앤다.
 * 한국어 문장에서는 강조 기호가 렌더링되지 않고 ** 그대로 노출되는 경우가 많아,
 * 저장·발행·표시 단계에서 모두 이 함수를 거친다.
 * 소제목(#)과 인용(>)은 그대로 두고, 줄 맨 앞의 "* " 목록 기호는 "- "로 바꾼다.
 */
export function stripEmphasis(text: string): string
export function stripEmphasis(text: string | null | undefined): string | null | undefined
export function stripEmphasis(text: string | null | undefined) {
  if (!text) return text
  return text
    .split('\n')
    .map((line) => {
      const bullet = line.match(/^(\s*)[*+]\s+/)
      const head = bullet ? `${bullet[1]}- ` : ''
      const body = bullet ? line.slice(bullet[0].length) : line
      return head + body.replace(/\*/g, '')
    })
    .join('\n')
}

const POST_TEXT_FIELDS = ['title', 'seo_title', 'content', 'excerpt', 'meta_description', 'naver_content'] as const

/** 블로그 글 객체의 문자열 필드에서 강조 기호를 정리한 복사본을 돌려준다. */
export function cleanPostText<T>(post: T): T {
  if (!post || typeof post !== 'object') return post
  const cleaned = { ...post } as Record<string, unknown>
  for (const key of POST_TEXT_FIELDS) {
    if (typeof cleaned[key] === 'string') cleaned[key] = stripEmphasis(cleaned[key] as string)
  }
  return cleaned as T
}
