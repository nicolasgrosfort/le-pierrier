import { DEFAULT_HOLD_TYPE, DEFAULT_MODE } from "@/lib/config";
import {
  Hold,
  HoldType,
  Mode,
  PanZoom,
  Problem,
  WallTransform,
} from "@/lib/types";
import { atom } from "jotai";
import { RefObject } from "react";

export const _mode = atom<Mode>(DEFAULT_MODE);
export const _holdType = atom<HoldType>(DEFAULT_HOLD_TYPE);

export const _problem = atom<Problem | undefined>(undefined);
export const _problems = atom<Problem[]>([]);
export const _holds = atom<Hold[]>([]);

export const _isConnected = atom<boolean>(false);
export const _isId = atom<boolean>(false);

export const _blocListRef = atom<RefObject<HTMLDivElement | null>>({
  current: null,
});
export const _panzoomRef = atom<RefObject<PanZoom | null>>({ current: null });
export const _wallRef = atom<RefObject<SVGSVGElement | null>>({
  current: null,
});

export const _wallTransform = atom<WallTransform>({
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
});
