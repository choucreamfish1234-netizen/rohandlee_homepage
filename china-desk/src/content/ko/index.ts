import type { Dictionary } from "../types";
import { koSite } from "./site";
import { koCases } from "./cases";
import { koQa } from "./qa";

export const ko: Dictionary = { ...koSite, caseList: koCases, qaList: koQa };
