"use client";

import { GradeSelector } from "@/components/grade-selector";
import { InputField } from "@/components/input-fiels";
import { ProblemItem } from "@/components/problem-item";
import { ToggleGroup } from "@/components/toggle-group";
import { DEFAULT_GRADE, FEET_LABEL, GRADES } from "@/lib/config";
import { getSocket } from "@/lib/socket";
import {
  _holdType,
  _isConnected,
  _mode,
  _problem,
  _problems,
} from "@/lib/store";
import { Grade as GradeType, Mode, Problem } from "@/lib/types";
import { createUUID } from "@/lib/utils";
import { useAtom } from "jotai";
import {
  Flag,
  Footprints,
  HandMetal,
  MountainSnow,
  Plus,
  Save,
  Undo2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const [mode] = useAtom(_mode);
  const [isConnected] = useAtom(_isConnected);

  if (!isConnected) return;

  return (
    <nav className="md:border-l sborder-black w-full md:w-90 h-full flex flex-col z-10 bg-background/80 backdrop-blur overflow-hidden snap-start">
      {mode === "explore" ? <ExploreProblems /> : <HandleProblem />}
    </nav>
  );
};

const ExploreProblems = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gradesFilter, setGradesFilter] = useState<GradeType[]>([]);

  const [problems] = useAtom<Problem[]>(_problems);
  const [problem, setProblem] = useAtom<Problem | undefined>(_problem);
  const [, setMode] = useAtom<Mode>(_mode);

  const lowercasedSearchTerm = searchTerm.toLowerCase();

  const filteredBySearchTerm = problems.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercasedSearchTerm) ||
      p.author.toLowerCase().includes(lowercasedSearchTerm),
  );

  const filteredProblems = gradesFilter.length
    ? filteredBySearchTerm.filter((p) => gradesFilter.includes(p.grade))
    : filteredBySearchTerm;

  const sortedProblems = [...filteredProblems].sort(
    (a, b) => GRADES.indexOf(a.grade!) - GRADES.indexOf(b.grade!),
  );

  const handleCreate = () => {
    const socket = getSocket();
    const newProblem: Problem = {
      id: createUUID(),
      name: "",
      author: "",
      date: new Date(Date.now()).toISOString().split("T")[0],
      feet: "feet-hand",
      holds: {},
      grade: DEFAULT_GRADE,
    };
    setProblem(newProblem);
    setMode("handle");
    socket.connect();
    socket.emit("create", newProblem);
  };

  const handleResetFilters = () => {
    setGradesFilter([]);
    setSearchTerm("");
  };

  return (
    <>
      <div className="flex justify-between gap-4 p-4 py-6 shrink-0 border-b">
        <span className="font-medium text-sm p-2 flex gap-2 items-center">
          {problems.length} blocs <MountainSnow size={18} />
        </span>
        <button
          className="font-medium text-sm flex gap-2 items-center cursor-pointer bg-foreground text-background p-2 disabled:opacity-40 disabled:cursor-default"
          onClick={handleCreate}
        >
          Nouveau bloc <Plus size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-2 border-b p-6 shrink-0">
        <div className="flex justify-between ">
          <h3 className="font-bold text-sm">Filtres</h3>
          {
            <button
              className="text-xs underline cursor-pointer flex items-center gap-2 font-medium disabled:opacity-40 disabled:cursor-default"
              onClick={handleResetFilters}
              disabled={gradesFilter.length === 0 && searchTerm.length === 0}
            >
              Réinitialiser
              <X size={14} />
            </button>
          }
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            type="text"
            label="Recherche"
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Nom du bloc, auteur..."
          />
          <GradeSelector
            label="Cotations"
            mode="multiple"
            value={gradesFilter}
            onChange={setGradesFilter}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 min-h-0 gap-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm shrink-0">Blocs</h3>
          <span className="text-xs font-medium">
            [{sortedProblems.length}/{problems.length}]
          </span>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto">
          {sortedProblems.length > 0 ? (
            sortedProblems.map((_problem) => (
              <ProblemItem
                problem={_problem}
                key={_problem.id}
                selected={_problem.id === problem?.id}
              />
            ))
          ) : (
            <div className="flex flex-col gap-1 items-center justify-center">
              <span className="text-sm">Aucun bloc trouvé</span>
              {problem ? (
                <>
                  <button
                    className="text-xs font-medium underline cursor-pointer flex gap-2 items-center"
                    onClick={handleResetFilters}
                  >
                    Réinitialiser les filtres
                  </button>
                </>
              ) : (
                <button
                  className="text-xs font-medium underline cursor-pointer flex gap-2 items-center"
                  onClick={handleCreate}
                >
                  Créer un nouveau bloc
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const HandleProblem = () => {
  const [hold, setHold] = useAtom(_holdType);
  const [problem, setProblem] = useAtom(_problem);
  const [, setMode] = useAtom(_mode);

  const handleProblem = (nextProblem: Problem) => {
    setProblem(nextProblem);
    const socket = getSocket();
    socket.connect();
    socket.emit("problem", nextProblem);
  };

  useEffect(() => {
    if (!problem) {
      setMode("explore");
    }
  }, [problem, setMode]);

  if (!problem) return;

  return (
    <>
      <div className="flex justify-between gap-4 p-4 py-6 shrink-0 border-b">
        <button
          className="font-medium text-sm flex gap-2 items-center cursor-pointer p-2 underline"
          onClick={() => setMode("explore")}
        >
          Retour <Undo2 size={18} />
        </button>
        <button
          className="font-medium text-sm flex gap-2 items-center cursor-pointer bg-foreground text-background p-2"
          onClick={() => setMode("explore")}
        >
          Terminer <Save size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-4 border-b p-6 shrink-0">
        <h3 className="font-semibold text-sm">Prises</h3>
        <ToggleGroup
          value={hold}
          onChange={setHold}
          options={[
            { value: "start", label: "Départ", Icon: Flag },
            { value: "hold", label: "Main", Icon: HandMetal },
            { value: "foot", label: "Pieds", Icon: Footprints },
          ]}
        />
      </div>

      <div className="flex-1 flex flex-col border-b p-6 min-h-0">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm mb-4 shrink-0">Informations</h3>
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <InputField
            type="text"
            label="Nom du bloc"
            value={problem.name}
            onChange={(nextName) => {
              handleProblem({ ...problem, name: nextName });
            }}
            placeholder="Ex: Le Pilier du Pierrier"
          />
          <InputField
            type="text"
            label="Auteur"
            value={problem.author}
            onChange={(nextAuthor) => {
              handleProblem({ ...problem, author: nextAuthor });
            }}
            placeholder="Ex: Nicolas Grosfort"
          />
          <ToggleGroup
            label="Type"
            value={problem.feet}
            onChange={(nextFeet) => {
              handleProblem({ ...problem, feet: nextFeet });
            }}
            options={[
              { value: "feet-hand", label: FEET_LABEL["feet-hand"] },
              { value: "free-feet", label: FEET_LABEL["free-feet"] },
            ]}
          />
          <GradeSelector
            label="Cotation"
            value={problem.grade}
            onChange={(grade) => handleProblem({ ...problem, grade })}
          />
          <InputField
            type="date"
            label="Date"
            value={problem.date}
            onChange={(nextDate) =>
              handleProblem({ ...problem, date: nextDate })
            }
          />
        </div>
      </div>
    </>
  );
};
