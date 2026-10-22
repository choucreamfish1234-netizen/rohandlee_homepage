import { defenseArea } from './defense'
import { collectionArea } from './collection'
import { cryptoArea } from './crypto'
import { businessArea } from './business'
import type { AreaKey, PracticeArea } from './types'

export * from './types'

export const practiceAreas: PracticeArea[] = [defenseArea, collectionArea, cryptoArea, businessArea]

export function getArea(key: AreaKey): PracticeArea {
  return practiceAreas.find((a) => a.key === key)!
}

export function getAreaPage(key: AreaKey, slug: string) {
  return getArea(key).pages.find((p) => p.slug === slug) ?? null
}

export { victimCenters } from './nav'
