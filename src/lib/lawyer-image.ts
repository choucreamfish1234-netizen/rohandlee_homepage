const FALLBACK_IMAGES: Record<string, string> = {
  '이유림': '/images/lawyers/lawyer-lee.svg',
  '노채은': '/images/lawyers/lawyer-noh.svg',
}

let cachedImages: Record<string, string> | null = null

export async function fetchLawyerImages(): Promise<Record<string, string>> {
  if (cachedImages) return cachedImages
  try {
    const res = await fetch('/api/lawyers')
    const data = await res.json()
    if (!Array.isArray(data)) return FALLBACK_IMAGES
    const map: Record<string, string> = {}
    for (const l of data) {
      if (l.name && l.image_url) {
        map[l.name] = l.image_url
      }
    }
    cachedImages = { ...FALLBACK_IMAGES, ...map }
    return cachedImages
  } catch {
    return FALLBACK_IMAGES
  }
}

export function getFallbackImage(name: string): string {
  return FALLBACK_IMAGES[name] || '/images/lawyers/lawyer-lee.svg'
}
