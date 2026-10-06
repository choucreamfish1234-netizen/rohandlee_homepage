import type { Dictionary } from "../types";
import { koSite } from "./site";
import { koCases } from "./cases";

export const ko: Dictionary = { ...koSite, caseList: koCases };
