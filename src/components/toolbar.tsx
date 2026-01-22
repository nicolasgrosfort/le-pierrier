"use client";

import { _isConnected, _isId, _panzoomRef } from "@/lib/store";
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
import { useEffect, useState } from "react";

export const Toolbar = () => {
  const [panzoomRef] = useAtom(_panzoomRef);
  const [isConnected] = useAtom<boolean>(_isConnected);
  const [isId, setIsId] = useAtom<boolean>(_isId);

  const [scale, setScale] = useState<number>(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentScale = panzoomRef.current?.getScale() || 1;
      setScale(Math.round(currentScale * 100));
    }, 0);

    return () => clearInterval(interval);
  }, [panzoomRef]);

  return (
    <div className="p-2 px-4 border flex gap-6 bg-background/80 overflow-hidden backdrop-blur">
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
  );
};
