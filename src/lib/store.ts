import { DEFAULT_HOLD, DEFAULT_MODE } from "@/lib/config";
import { Hold, Mode, Problem } from "@/lib/types";
import { atom } from "jotai";

export const _mode = atom<Mode>(DEFAULT_MODE);

export const _hold = atom<Hold>(DEFAULT_HOLD);
export const _problem = atom<Problem | undefined>(undefined);
export const _problems = atom<Problem[]>([]);

export const _isConnected = atom<boolean>(false);
export const _isId = atom<boolean>(false);
