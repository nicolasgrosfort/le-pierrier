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
  const [draggingPointIndex, setDraggingPointIndex] = useState<number | null>(
    null,
  );
  const [hoveringPointIndex, setHoveringPointIndex] = useState<number | null>(
    null,
  );
  const [selectedHoldId, setSelectedHoldId] = useState<number | null>(null);
  const [editingPolygon, setEditingPolygon] = useState<Point[]>([]);
  const [editingId, setEditingId] = useState<string>("");
  const [draggingHold, setDraggingHold] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<Point | null>(null);

  const getNextHoldId = useCallback(() => {
    return (
      holds.reduce((maxId, hold) => (hold.id > maxId ? hold.id : maxId), 0) + 1
    );
  }, [holds]);

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.visualViewport?.width || window.innerWidth,
      height: window.visualViewport?.height || window.innerHeight,
    });
  }, []);

  const savePolygon = useCallback(() => {
    if (currentPolygon.length < 3) return;

    const socket = getSocket();
    socket.emit("addHold", {
      id: getNextHoldId(),
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
    setHoveringFirstPoint(false);
  }, [currentPolygon, getNextHoldId]);

  useEffect(() => {
    setTimeout(updateDimensions, 0);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as SVGElement).tagName === "circle") return;
    if ((e.target as SVGElement).tagName === "polygon") return;
    if (draggingPointIndex !== null) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Désélectionner la prise en cours si on commence une nouvelle prise
    if (selectedHoldId !== null) {
      setSelectedHoldId(null);
      setEditingPolygon([]);
    }

    setCurrentPolygon([...currentPolygon, { x, y }]);
  };

  const handleHoldClick = (holdId: number) => {
    const hold = holds.find((h) => h.id === holdId);
    if (!hold || !hold.pxs || !hold.pys) return;

    setSelectedHoldId(holdId);
    setEditingPolygon(hold.pxs.map((x, i) => ({ x, y: hold.pys![i] })));
    setEditingId(holdId.toString());
    setCurrentPolygon([]);
  };

  const handleHoldMouseDown = (e: React.MouseEvent, holdId: number) => {
    e.stopPropagation();

    // Si la prise n'est pas sélectionnée, la sélectionner
    if (selectedHoldId !== holdId) {
      handleHoldClick(holdId);
      return;
    }

    // Si elle est déjà sélectionnée, commencer le drag
    setDraggingHold(true);
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleUpdateHoldId = () => {
    if (selectedHoldId === null) return;
    const newId = parseInt(editingId, 10);
    if (isNaN(newId)) return;
    if (newId === selectedHoldId) return;

    // Vérifier si l'ID existe déjà
    if (holds.some((h) => h.id === newId)) {
      alert(`L'ID ${newId} est déjà utilisé par une autre prise`);
      return;
    }

    const socket = getSocket();
    const hold = holds.find((h) => h.id === selectedHoldId);
    if (!hold) return;

    // D'abord supprimer l'ancienne prise
    socket.emit("deleteHold", selectedHoldId);

    // Puis créer la nouvelle prise avec le nouvel ID
    socket.emit("addHold", {
      ...hold,
      id: newId,
      pxs: editingPolygon.map((p) => p.x),
      pys: editingPolygon.map((p) => p.y),
    });

    setSelectedHoldId(newId);
    setEditingId(newId.toString());
  };

  const handleToggleFill = useCallback(() => {
    if (selectedHoldId === null) return;
    const hold = holds.find((h) => h.id === selectedHoldId);
    if (!hold) return;

    const newFill = hold.fill === "transparent" ? "white" : "transparent";
    const socket = getSocket();
    socket.emit("updateHold", {
      ...hold,
      fill: newFill,
      pxs: editingPolygon.map((p) => p.x),
      pys: editingPolygon.map((p) => p.y),
    });
  }, [selectedHoldId, holds, editingPolygon]);

  const handlePointMouseDown = (
    e: React.MouseEvent,
    index: number,
    isEditing = false,
  ) => {
    e.stopPropagation();

    if (isEditing) {
      setDraggingPointIndex(index);
      return;
    }

    const isFirstPoint = index === 0;
    const canClose = currentPolygon.length >= 3 && isFirstPoint;

    if (!canClose) {
      setDraggingPointIndex(index);
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    // Si on déplace toute la prise
    if (draggingHold && dragStartPos && selectedHoldId !== null) {
      const deltaX = e.clientX - dragStartPos.x;
      const deltaY = e.clientY - dragStartPos.y;

      setEditingPolygon((prev) =>
        prev.map((point) => ({
          x: point.x + deltaX,
          y: point.y + deltaY,
        })),
      );

      setDragStartPos({ x: e.clientX, y: e.clientY });
      return;
    }

    // Si on déplace un point individuel
    if (draggingPointIndex === null) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedHoldId !== null) {
      setEditingPolygon((prev) =>
        prev.map((point, idx) =>
          idx === draggingPointIndex ? { x, y } : point,
        ),
      );
    } else {
      setCurrentPolygon((prev) =>
        prev.map((point, idx) =>
          idx === draggingPointIndex ? { x, y } : point,
        ),
      );
    }
  };

  const handleSvgMouseUp = () => {
    // Sauvegarder après un drag de toute la prise
    if (draggingHold && selectedHoldId !== null) {
      const socket = getSocket();
      socket.emit("updateHold", {
        ...holds.find((h) => h.id === selectedHoldId)!,
        pxs: editingPolygon.map((p) => p.x),
        pys: editingPolygon.map((p) => p.y),
      });
      setDraggingHold(false);
      setDragStartPos(null);
      return;
    }

    // Sauvegarder après un drag d'un point individuel
    if (draggingPointIndex !== null && selectedHoldId !== null) {
      const socket = getSocket();
      socket.emit("updateHold", {
        ...holds.find((h) => h.id === selectedHoldId)!,
        pxs: editingPolygon.map((p) => p.x),
        pys: editingPolygon.map((p) => p.y),
      });
    }

    setDraggingPointIndex(null);
  };

  const handleFirstPointClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    savePolygon();
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentPolygon.length >= 3) {
        e.preventDefault();
        savePolygon();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setCurrentPolygon([]);
        setSelectedHoldId(null);
        setEditingPolygon([]);
      }

      if (e.key === "Delete" && selectedHoldId !== null) {
        e.preventDefault();
        const socket = getSocket();
        socket.emit("deleteHold", selectedHoldId);
        setSelectedHoldId(null);
        setEditingPolygon([]);
      }

      if ((e.key === "t" || e.key === "T") && selectedHoldId !== null) {
        e.preventDefault();
        handleToggleFill();
      }
    },
    [currentPolygon, savePolygon, selectedHoldId, handleToggleFill],
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
        <div className="pointer-events-none">
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
        {selectedHoldId !== null && (
          <div className="mt-4 pt-4 border-t border-blue-400 pointer-events-auto">
            <p className="text-blue-400 mb-2">
              Prise sélectionnée - <strong>Delete</strong> pour supprimer
            </p>
            <div className="flex gap-2 items-center mb-2">
              <label className="text-sm">ID:</label>
              <input
                type="number"
                value={editingId}
                onChange={(e) => setEditingId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdateHoldId();
                  }
                }}
                className="bg-black/50 border border-blue-400 text-white px-2 py-1 w-20 rounded"
              />
              <button
                onClick={handleUpdateHoldId}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Modifier
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={handleToggleFill}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
              >
                {holds.find((h) => h.id === selectedHoldId)?.fill === "transparent"
                  ? "Rendre opaque"
                  : "Rendre transparent"}
              </button>
              <span className="text-xs text-gray-400">ou touche <strong>T</strong></span>
            </div>
          </div>
        )}
      </div>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        onClick={handleSvgClick}
        onMouseMove={handleSvgMouseMove}
        onMouseUp={handleSvgMouseUp}
        onMouseLeave={handleSvgMouseUp}
        className="cursor-crosshair"
      >
        {/* Afficher toutes les prises existantes */}
        {holds.map((hold) => {
          if (!hold.pxs || !hold.pys) return null;
          const isSelected = hold.id === selectedHoldId;

          // Si la prise est sélectionnée et en cours d'édition, ne pas l'afficher ici
          if (isSelected && editingPolygon.length > 0) return null;

          return (
            <polygon
              key={hold.id}
              points={hold.pxs.map((x, i) => `${x},${hold.pys![i]}`).join(" ")}
              fill="rgba(255, 255, 255, 0.2)"
              stroke="rgb(156, 163, 175)"
              strokeWidth="2"
              className="cursor-pointer"
              onMouseDown={(e) => handleHoldMouseDown(e, hold.id)}
            />
          );
        })}

        {/* Afficher le polygone et les points de la prise en cours d'édition */}
        {selectedHoldId !== null && editingPolygon.length > 0 && (
          <g>
            {/* Polygone en cours d'édition */}
            <polygon
              points={editingPolygon.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="rgba(59, 130, 246, 0.3)"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              className="cursor-move"
              onMouseDown={(e) => {
                e.stopPropagation();
                setDraggingHold(true);
                setDragStartPos({ x: e.clientX, y: e.clientY });
              }}
            />

            {/* Points d'édition */}
            {editingPolygon.map((point, idx) => {
              const isDragging = draggingPointIndex === idx;
              const isHovering = hoveringPointIndex === idx;

              return (
                <circle
                  key={idx}
                  cx={point.x}
                  cy={point.y}
                  r={isDragging || isHovering ? "8" : "5"}
                  fill={
                    isDragging || isHovering
                      ? "rgb(59, 130, 246)"
                      : "rgb(96, 165, 250)"
                  }
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-move"
                  onMouseDown={(e) => handlePointMouseDown(e, idx, true)}
                  onMouseEnter={() => setHoveringPointIndex(idx)}
                  onMouseLeave={() => setHoveringPointIndex(null)}
                />
              );
            })}
          </g>
        )}

        {/* Afficher le polygone en cours de création */}
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
              const isDragging = draggingPointIndex === idx;
              const isHoveringDraggable =
                !canClose && hoveringPointIndex === idx;

              return (
                <circle
                  key={idx}
                  cx={point.x}
                  cy={point.y}
                  r={isHovered || isDragging || isHoveringDraggable ? "8" : "5"}
                  fill={
                    isHovered
                      ? "rgb(239, 68, 68)"
                      : isDragging || isHoveringDraggable
                        ? "rgb(59, 130, 246)"
                        : "rgb(34, 197, 94)"
                  }
                  stroke="white"
                  strokeWidth="2"
                  className={canClose ? "cursor-pointer" : "cursor-move"}
                  onClick={canClose ? handleFirstPointClick : undefined}
                  onMouseDown={(e) => handlePointMouseDown(e, idx)}
                  onMouseEnter={
                    canClose
                      ? () => setHoveringFirstPoint(true)
                      : () => setHoveringPointIndex(idx)
                  }
                  onMouseLeave={
                    canClose
                      ? () => setHoveringFirstPoint(false)
                      : () => setHoveringPointIndex(null)
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
