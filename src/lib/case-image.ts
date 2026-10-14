import images from '@/data/case-images.json'

const manifest: Record<string, { src: string; alt: string; original?: string }> = images
export const absoluteCaseImage = (src: string) => src.startsWith('/') ? `https://lawfirmrohandlee.com${src}` : src
export function assignedCaseImage(slug: string) { return manifest[slug] }
export function withAssignedCaseImage<T extends { slug: string; image_url: string }>(c: T): T {
  const image = manifest[c.slug]
  // Keep deliberate future image changes made in the existing editor.
  if (!image || (image.original && c.image_url !== image.original)) return c
  return { ...c, image_url: image.src }
}
