"use client";

import { FEET_LABEL, HOLD_TYPE_COLORS } from "@/lib/config";
import { _holds, _problem } from "@/lib/store";
import { HoldType } from "@/lib/types";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Page() {
  const [problem] = useAtom(_problem);
  const [holds] = useAtom(_holds);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setTimeout(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 0);

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {problemHolds.map((hold) => {
          return (
            <polygon
              key={hold.id}
              points={hold
                .pxs!.map((px, i) => `${px},${hold.pys![i]}`)
                .join(" ")}
              fill={hold.fill}
              stroke={hold.stroke}
              strokeWidth={2}
            />
          );
        })}
      </svg>

      {problem && (
        <div className="absolute top-10 right-10 text-white flex flex-col gap-1 text-right">
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
