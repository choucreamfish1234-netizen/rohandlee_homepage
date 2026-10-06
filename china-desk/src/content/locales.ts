import type { Dictionary } from "./types";
import { zh } from "./zh";
import { ko } from "./ko";

/**
 * URL 접두어 → 사전.
 * 영어 추가 예: import { en } from "./en"; → { cn: zh, ko, en }
 */
export const dictionaries = { cn: zh, ko } satisfies Record<string, Dictionary>;

export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "cn";

export function isLocale(value: string): value is Locale {
  return value in dictionaries;
}

export function getDictionary(locale: string): Dictionary {
  return isLocale(locale) ? dictionaries[locale] : dictionaries[defaultLocale];
}
