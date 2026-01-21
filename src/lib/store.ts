import { DEFAULT_HOLD, DEFAULT_PROBLEM } from "@/lib/config";
import { Hold, Problem } from "@/lib/types";
import { atom } from "jotai";

export const _hold = atom<Hold>(DEFAULT_HOLD);
export const _problem = atom<Problem>(DEFAULT_PROBLEM);
export const _problems = atom<Problem[]>([]);

export const _isConnected = atom<boolean>(false);
export const _isId = atom<boolean>(false);
