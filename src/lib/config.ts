import { Db, Grade, HoldType, Mode, Problem } from "@/lib/types";

export const IP_ADDRESS = "192.168.1.206";

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

export const DEFAULT_DATA: Db = {
  holds: [],
  problems: [],
  transform: { x: 0, y: 0, scale: 1, rotate: 0 },
  currentProblemId: undefined,
};

export const FEET_LABEL: Record<Problem["feet"], string> = {
  "feet-hand": "Pieds-mains",
  "free-feet": "Pieds-libres",
};

export const HOLD_TYPE_COLORS: Record<HoldType, string> = {
  start: "fuchsia",
  hold: "yellow",
  foot: "cyan",
};
