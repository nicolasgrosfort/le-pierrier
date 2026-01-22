"use client";

import { Grade } from "@/components/grade";
import { FEET_LABEL } from "@/lib/config";
import { getSocket } from "@/lib/socket";
import { _mode } from "@/lib/store";
import { Problem } from "@/lib/types";
import { useAtom } from "jotai";
import { Pencil, Save, Trash2, Undo2 } from "lucide-react";
import { useState } from "react";

type ProblemTitleProps = {
  problem: Problem;
};

export const ProblemTitle = ({ problem }: ProblemTitleProps) => {
  const [mode, setMode] = useAtom(_mode);
  const [wantDelete, setWantDelete] = useState<boolean>(false);

  const handleEdit = () => {
    setMode("handle");
  };

  const handleDone = () => {
    setMode("explore");
  };

  const handleWantDelete = () => {
    setWantDelete(true);
  };

  const handleCancelDelete = () => {
    setWantDelete(false);
  };

  const handleDelete = () => {
    const socket = getSocket();
    socket.emit("delete", problem.id);
    setWantDelete(false);
    setMode("explore");
  };

  const amountHolds = Object.keys(problem.holds).length;

  return (
    <header className="p-6 z-10 flex flex-col gap-1 overflow-hidden">
      <div className="flex gap-6 items-center w-full justify-between  min-w-0">
        <div className="flex items-center gap-6 min-w-0">
          <h1 className="font-bold text-2xl font-serif truncate whitespace-nowrap">
            {problem.name || "Bloc sans nom"}
          </h1>
          <Grade grade={problem.grade} />
        </div>

        <div className="flex items-center gap-4 justify-end">
          {mode === "handle" ? (
            <>
              <button onClick={handleDone} className="cursor-pointer">
                <Undo2 size={20} />
              </button>
              <button
                onClick={handleDone}
                className="cursor-pointer flex items-center gap-2 text-sm underline font-medium"
              >
                Terminer
                <Save size={20} />
              </button>
            </>
          ) : wantDelete ? (
            <>
              <button onClick={handleCancelDelete} className="cursor-pointer">
                <Undo2 size={20} />
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer flex items-center gap-2 text-sm underline font-medium"
              >
                Supprimer
                <Trash2 size={20} />
              </button>
            </>
          ) : (
            <>
              <button onClick={handleWantDelete} className="cursor-pointer">
                <Trash2 size={20} />
              </button>
              <button onClick={handleEdit} className="cursor-pointer">
                <Pencil size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-6 font-medium">
        <div className="flex flex-col min-w-0">
          <span className="truncate whitespace-nowrap">
            {problem.author || "Inconnu"}
          </span>
          <span className="text-sm">{problem.date}</span>
        </div>
        <div className="flex flex-col">
          <span className="whitespace-nowrap">{FEET_LABEL[problem.feet]}</span>
          <span className="text-sm">{`${amountHolds} prise${amountHolds > 1 ? "s" : ""}`}</span>
        </div>
      </div>
    </header>
  );
};
