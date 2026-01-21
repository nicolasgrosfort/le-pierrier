import { DEFAULT_HOLD, DEFAULT_MODE } from "@/lib/config";
import { Hold, Mode, PanZoom, Problem } from "@/lib/types";
import { atom } from "jotai";
import { RefObject } from "react";

export const _mode = atom<Mode>(DEFAULT_MODE);

export const _hold = atom<Hold>(DEFAULT_HOLD);
export const _problem = atom<Problem | undefined>(undefined);
export const _problems = atom<Problem[]>([]);

export const _isConnected = atom<boolean>(false);
export const _isId = atom<boolean>(false);

export const _panzoomRef = atom<RefObject<PanZoom | null>>({ current: null });
export const _wallRef = atom<RefObject<SVGSVGElement | null>>({
  current: null,
});
