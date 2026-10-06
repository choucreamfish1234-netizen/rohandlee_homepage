import "server-only";
import { getSetting, setSetting } from "./store";

export const LAWYER_IDS = ["lee", "roh"] as const;
export type LawyerId = (typeof LAWYER_IDS)[number];

export interface LawyerPhoto {
  url: string;
  path: string;
  updatedAt: string;
}
export type LawyerPhotos = Partial<Record<LawyerId, LawyerPhoto>>;

const KEY = "lawyer_photos";

export function isLawyerId(v: string): v is LawyerId {
  return (LAWYER_IDS as readonly string[]).includes(v);
}

export async function getLawyerPhotos(): Promise<LawyerPhotos> {
  try {
    return await getSetting<LawyerPhotos>(KEY, {});
  } catch {
    return {};
  }
}

export async function saveLawyerPhotos(photos: LawyerPhotos): Promise<void> {
  await setSetting(KEY, photos);
}
