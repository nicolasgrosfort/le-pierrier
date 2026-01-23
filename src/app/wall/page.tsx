"use client";

import {
  FEET_LABEL,
  HOLD_TYPE_COLORS,
  ROTATE_STEP,
  SCALE_STEP,
  TRANSLATE_STEP,
} from "@/lib/config";
import { getSocket } from "@/lib/socket";
import { _holds, _problem, _wallTransform } from "@/lib/store";
import { HoldType } from "@/lib/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Page() {
  const [problem] = useAtom(_problem);
  const [holds] = useAtom(_holds);
  const [transform, setTransform] = useAtom(_wallTransform);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showAllHolds, setShowAllHolds] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDimensions({
        width: window.visualViewport?.width || window.innerWidth,
        height: window.visualViewport?.height || window.innerHeight,
      });
    }, 0);

    const handleResize = () => {
      setDimensions({
        width: window.visualViewport?.width || window.innerWidth,
        height: window.visualViewport?.height || window.innerHeight,
      });
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const socket = getSocket();
      let nextTransform = { ...transform };

      if (e.key === "a") {
        setShowAllHolds(!showAllHolds);
      }

      if (e.key === "ArrowDown") {
        nextTransform = {
          ...transform,
          y: transform.y + TRANSLATE_STEP,
        };
      }

      if (e.key === "ArrowUp") {
        nextTransform = {
          ...transform,
          y: transform.y - TRANSLATE_STEP,
        };
      }

      if (e.key === "ArrowLeft") {
        nextTransform = {
          ...transform,
          x: transform.x - TRANSLATE_STEP,
        };
      }

      if (e.key === "ArrowRight") {
        nextTransform = {
          ...transform,
          x: transform.x + TRANSLATE_STEP,
        };
      }

      if (e.key === "+") {
        nextTransform = {
          ...transform,
          scale: transform.scale + SCALE_STEP,
        };
      }

      if (e.key === "-") {
        nextTransform = {
          ...transform,
          scale: transform.scale - SCALE_STEP,
        };
      }

      if (e.key === "r") {
        nextTransform = {
          ...transform,
          rotate: transform.rotate + ROTATE_STEP,
        };
      }

      if (e.key === "l") {
        nextTransform = {
          ...transform,
          rotate: transform.rotate - ROTATE_STEP,
        };
      }

      if (e.key === "0") {
        nextTransform = { x: 0, y: 0, scale: 1, rotate: 0 };
      }

      setTransform(nextTransform);
      socket.emit("transform", nextTransform);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [setTransform, showAllHolds, transform]);

  const problemHolds = holds
    .filter((hold) =>
      problem ? Object.keys(problem.holds).includes(hold.id.toString()) : false,
    )
    .map((hold) => ({
      ...hold,
      stroke:
        HOLD_TYPE_COLORS[problem?.holds[hold.id.toString()] as HoldType] ||
        "white",
    }));

  return (
    <div className="relative w-full h-screen bg-black">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <g
          style={{
            transformOrigin: "CENTER CENTER",
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotate}deg)`,
          }}
        >
          {(showAllHolds ? holds : problemHolds).map((hold) => {
            return (
              <polygon
                key={hold.id}
                points={hold
                  .pxs!.map((px, i) => `${px},${hold.pys![i]}`)
                  .join(" ")}
                fill={hold.fill}
                stroke={hold.stroke}
                strokeWidth={8}
              />
            );
          })}
        </g>
      </svg>

      {problem && (
        <div className="absolute top-10 right-0 text-white flex flex-col gap-1 text-left rotate-45 origin-top-left">
          <span className="text-3xl font-serif">
            {problem.name || "Bloc sans nom"}
          </span>
          <span className="text-2xl font-mono font-bold">
            Par {problem.author || "-"}
          </span>
          <span className="text-xl font-mono font-bold">
            {FEET_LABEL[problem.feet]} - {problem.grade}
          </span>
        </div>
      )}
    </div>
  );
}
