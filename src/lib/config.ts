import {
  DbConfig,
  DbHolds,
  DbProblems,
  Grade,
  HoldType,
  Mode,
  Problem,
} from "@/lib/types";

export const TRANSLATE_STEP = 0.1;
export const SCALE_STEP = 0.001;
export const ROTATE_STEP = 0.01;

export const DEFAULT_MODE: Mode = "explore";
export const DEFAULT_GRADE: Grade = "4a";
export const DEFAULT_HOLD_TYPE: HoldType = "start";

export const HOLD_TYPES: HoldType[] = ["start", "hold", "foot"];

export const GRADES: Grade[] = [
  "4a",
  "4b",
  "4c",
  "5a",
  "5b",
  "5c",
  "6a",
  "6a+",
  "6b",
  "6b+",
  "6c",
  "6c+",
  "7a",
  "7a+",
  "7b",
  "7b+",
  "7c",
  "7c+",
  "8a",
  "8a+",
  "8b",
  "8b+",
  "8c",
  "8c+",
];

export const FEET_LABEL: Record<Problem["feet"], string> = {
  "feet-hand": "Pieds-mains",
  "free-feet": "Pieds-libres",
};

export const HOLD_TYPE_COLORS: Record<HoldType, string> = {
  start: "fuchsia",
  hold: "yellow",
  foot: "cyan",
};

export const DEFAULT_DB_PROBLEMS: DbProblems = {
  problems: [],
  currentProblemId: undefined,
};

export const DEFAULT_DB_CONFIG: DbConfig = {
  transform: { x: 0, y: 0, scale: 1, rotate: 0 },
};
export const DEFAULT_DB_HOLDS: DbHolds = [];
