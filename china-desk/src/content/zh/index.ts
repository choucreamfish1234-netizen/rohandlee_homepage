import type { Dictionary } from "../types";
import { zhSite } from "./site";
import { zhCases } from "./cases";

export const zh: Dictionary = { ...zhSite, caseList: zhCases };
