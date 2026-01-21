"use client";

import { _isConnected, _isId } from "@/lib/store";
import { PanZoom } from "@/lib/types";
import { useAtom } from "jotai";
import {
  Bug,
  BugOff,
  Maximize2,
  Wifi,
  WifiOff,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { RefObject, useEffect, useState } from "react";

type ToolbarProps = {
  panzoomRef: RefObject<PanZoom | null>;
};

export const Toolbar = ({ panzoomRef }: ToolbarProps) => {
  const [isConnected] = useAtom<boolean>(_isConnected);
  const [isId, setIsId] = useAtom<boolean>(_isId);

  const [scale, setScale] = useState<number>(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentScale = panzoomRef.current?.getScale() || 1;
      setScale(Math.round(currentScale * 100));
    }, 100);

    return () => clearInterval(interval);
  }, [panzoomRef]);

  return (
    <div className="z-10 flex justify-between p-4">
      <div />
      <div className="p-2 px-4 border flex gap-8 bg-background">
        {isConnected ? <Wifi size={18} /> : <WifiOff size={18} />}
        <button className="cursor-pointer" onClick={() => setIsId(!isId)}>
          {isId ? <Bug size={18} /> : <BugOff size={18} />}
        </button>
        <div className="flex gap-4">
          <button
            className="cursor-pointer"
            onClick={() => panzoomRef.current?.zoomIn()}
          >
            <ZoomIn size={18} />
          </button>
          <span className="text-sm">{scale}%</span>
          <button
            className="cursor-pointer"
            onClick={() => panzoomRef.current?.zoomOut()}
          >
            <ZoomOut size={18} />
          </button>
        </div>
        <button
          className="cursor-pointer"
          onClick={() => panzoomRef.current?.reset()}
        >
          <Maximize2 size={18} />
        </button>
      </div>
      <div className="">
        <span className="font-medium text-sm p-2 flex items-center gap-6">
          <span className="flex gap-2 items-center">
            Départ <span className="h-3 w-3 rounded-lg border bg-start" />
          </span>
          <span className="flex gap-2 items-center">
            Mains <span className="h-3 w-3 rounded-lg border bg-hands" />
          </span>
          <span className="flex gap-2 items-center">
            Pieds <span className="h-3 w-3 rounded-lg border bg-feet" />
          </span>
        </span>
      </div>
    </div>
  );
};
