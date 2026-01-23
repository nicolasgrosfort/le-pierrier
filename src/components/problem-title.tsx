"use client";

import { Grade } from "@/components/grade";
import { FEET_LABEL } from "@/lib/config";
import { getSocket } from "@/lib/socket";
import { _mode } from "@/lib/store";
import { Problem } from "@/lib/types";
import { useAtom } from "jotai";
import { Pencil, Save, Trash2, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWantDelete(false);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [problem]);

  const amountHolds = Object.keys(problem.holds).length;

  return (
    <header className="p-6 z-10 flex flex-col gap-1 overflow-hidden">
      <div className="flex gap-6 items-center w-full justify-start min-w-0">
        <div className="flex items-center gap-6 min-w-0">
          <h1 className="font-bold text-2xl font-serif truncate whitespace-nowrap">
            {problem.name || "Bloc sans nom"}
          </h1>
          <Grade grade={problem.grade} />
        </div>

        <div className="flex items-center gap-6 justify-end border-l p-2 px-4">
          {mode === "handle" ? (
            <>
              <button
                onClick={handleDone}
                className="cursor-pointer flex items-center gap-2 text-sm underline font-medium disabled:cursor-default disabled:opacity-40"
              >
                Terminer
                <Save size={18} />
              </button>
            </>
          ) : wantDelete ? (
            <>
              <button
                onClick={handleCancelDelete}
                className="cursor-pointer flex items-center gap-2 text-sm underline font-medium "
              >
                Annuler
                <Undo2 size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer flex items-center gap-2 text-sm underline font-medium disabled:cursor-default disabled:opacity-40 text-red-600"
              >
                Supprimer
                <Trash2 size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="cursor-pointer disabled:cursor-default disabled:opacity-40 underline flex items-center gap-2 text-sm font-medium"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={handleWantDelete}
                className="cursor-pointer disabled:cursor-default disabled:opacity-40"
              >
                <Trash2 size={18} />
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
