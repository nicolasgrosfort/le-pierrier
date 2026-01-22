"use client";

import { getSocket } from "@/lib/socket";
import { _holds } from "@/lib/store";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

type Point = {
  x: number;
  y: number;
};

export default function Page() {
  const [holds] = useAtom(_holds);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentPolygon, setCurrentPolygon] = useState<Point[]>([]);
  const [hoveringFirstPoint, setHoveringFirstPoint] = useState(false);

  const nextHoldId =
    holds.reduce((maxId, hold) => {
      return hold.id > maxId ? hold.id : maxId;
    }, 0) + 1;

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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as SVGElement).tagName === "circle") {
      return;
    }

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentPolygon([...currentPolygon, { x, y }]);
  };

  const handleFirstPointClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPolygon.length >= 3) {
      setCurrentPolygon([]);
      const socket = getSocket();
      socket.emit("addHold", {
        id: nextHoldId,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        a: 0,
        fill: "white",
        stroke: "white",
        pxs: currentPolygon.map((p) => p.x),
        pys: currentPolygon.map((p) => p.y),
      });
      setHoveringFirstPoint(false);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentPolygon.length >= 3) {
        e.preventDefault();
        const socket = getSocket();
        socket.emit("addHold", {
          id: nextHoldId,
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          a: 0,
          fill: "white",
          stroke: "white",
          pxs: currentPolygon.map((p) => p.x),
          pys: currentPolygon.map((p) => p.y),
        });
        setCurrentPolygon([]);
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setCurrentPolygon([]);
      }
    },
    [currentPolygon, nextHoldId],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const getPolygonPoints = (points: Point[]) => {
    return points.map((p) => `${p.x},${p.y}`).join(" ");
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded z-10">
        <p>Cliquez pour ajouter des points au polygone</p>
        <p>
          Cliquez sur le <strong>premier point</strong> pour fermer (min 3
          points)
        </p>
        <p>
          Ou appuyez sur <strong>Enter</strong> pour enregistrer
        </p>
        <p>
          Appuyez sur <strong>Escape</strong> pour annuler
        </p>
      </div>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        onClick={handleSvgClick}
        className="cursor-crosshair"
      >
        {currentPolygon.length > 0 && (
          <g>
            {currentPolygon.length > 1 && (
              <polyline
                points={getPolygonPoints(currentPolygon)}
                fill="none"
                stroke="rgba(34, 197, 94, 0.8)"
                strokeWidth="2"
              />
            )}

            {currentPolygon.length >= 3 && (
              <line
                x1={currentPolygon[currentPolygon.length - 1].x}
                y1={currentPolygon[currentPolygon.length - 1].y}
                x2={currentPolygon[0].x}
                y2={currentPolygon[0].y}
                stroke="rgba(34, 197, 94, 0.4)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}

            {currentPolygon.map((point, idx) => {
              const isFirstPoint = idx === 0;
              const canClose = currentPolygon.length >= 3 && isFirstPoint;
              const isHovered = canClose && hoveringFirstPoint;

              return (
                <circle
                  key={idx}
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? "8" : "5"}
                  fill={isHovered ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)"}
                  stroke="white"
                  strokeWidth="2"
                  className={canClose ? "cursor-pointer" : ""}
                  onClick={canClose ? handleFirstPointClick : undefined}
                  onMouseEnter={
                    canClose ? () => setHoveringFirstPoint(true) : undefined
                  }
                  onMouseLeave={
                    canClose ? () => setHoveringFirstPoint(false) : undefined
                  }
                />
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
