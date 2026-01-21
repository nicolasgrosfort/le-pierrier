"use client";

import { _holds, _problem } from "@/lib/store";
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

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      className="bg-black"
    ></svg>
  );
}
