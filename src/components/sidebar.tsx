"use client";

import { Grade } from "@/components/grade";
import { GradeSelector } from "@/components/grade-selector";
import { InputField } from "@/components/input-fiels";
import { ProblemItem } from "@/components/problem-item";
import { ToggleGroup } from "@/components/toggle-group";
import { GRADES } from "@/lib/config";
import { getSocket } from "@/lib/socket";
import { _hold, _mode, _problem, _problems } from "@/lib/store";
import { Grade as GradeType, Hold, Mode, Problem } from "@/lib/types";
import { useAtom } from "jotai";
import {
  Flag,
  Footprints,
  HandMetal,
  MountainSnow,
  Plus,
  Save,
  Trash2,
  Undo2,
} from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [mode] = useAtom<Mode>(_mode);

  return (
    <nav className="border-l border-black w-90 h-full flex flex-col z-10 bg-background overflow-hidden">
      {mode === "explore" ? <ExploreProblems /> : <HandleProblem />}
    </nav>
  );
};

const ExploreProblems = () => {
  const [gradesFilter, setGradesFilter] = useState<GradeType[]>([]);

  const [problems] = useAtom<Problem[]>(_problems);
  const [problem] = useAtom<Problem>(_problem);
  const [, setMode] = useAtom<Mode>(_mode);

  const filteredProblems = gradesFilter.length
    ? problems.filter((p) => gradesFilter.includes(p.grade))
    : problems;

  const sortedProblems = [...filteredProblems].sort(
    (a, b) => GRADES.indexOf(a.grade!) - GRADES.indexOf(b.grade!),
  );
  return (
    <>
      <div className="flex flex-col gap-2 border-b p-6 shrink-0">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h2 className="font-serif text-xl truncate w-full">{problem.name}</h2>
          <Grade grade={problem.grade} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center justify-between">
            <span className="text-sm font-medium">{problem.author}</span>
            <span className="text-sm font-medium">
              {Object.keys(problem.holds).length} prises
            </span>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <span className="text-xs">{problem.date}</span>
            <button
              className="text-xs underline cursor-pointer"
              onClick={() => setMode("handle")}
            >
              Modifier
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-b p-6 shrink-0">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm">Cotations</h3>
          {gradesFilter.length > 0 && (
            <button
              className="text-xs underline cursor-pointer"
              onClick={() => setGradesFilter([])}
            >
              Effacer
            </button>
          )}
        </div>
        <GradeSelector
          mode="multiple"
          value={gradesFilter}
          onChange={setGradesFilter}
        />
      </div>
      <div className="flex-1 flex flex-col border-b p-6 min-h-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm mb-4 shrink-0">Blocs</h3>
          <span className="text-xs">[{sortedProblems.length}]</span>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto">
          {sortedProblems.length > 0 ? (
            sortedProblems.map((_problem) => (
              <ProblemItem
                problem={_problem}
                key={_problem.id}
                selected={_problem.id === problem.id}
              />
            ))
          ) : (
            <span className="text-sm italic">Aucun bloc pour le moment...</span>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-4 p-4 shrink-0">
        <span className="font-medium text-sm p-2 flex gap-2 items-center">
          {problems.length} blocs <MountainSnow size={18} />
        </span>
        <button
          className="font-medium text-sm flex gap-2 items-center cursor-pointer bg-foreground text-background p-2"
          onClick={() => setMode("handle")}
        >
          Nouveau bloc <Plus size={18} />
        </button>
      </div>
    </>
  );
};

const HandleProblem = () => {
  const [hold, setHold] = useAtom<Hold>(_hold);
  const [problem, setProblem] = useAtom<Problem>(_problem);
  const [, setMode] = useAtom<Mode>(_mode);

  const handleProblem = (nextProblem: Problem) => {
    setProblem(nextProblem);
    const socket = getSocket();
    socket.connect();
    socket.emit("problem", nextProblem);
  };

  return (
    <>
      <div className="flex flex-col gap-2 border-b p-6 shrink-0">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h2 className="font-serif text-xl truncate w-full">
            {problem.name || "Nouveau bloc"}
          </h2>
          <button
            className="text-xs underline cursor-pointer flex items-center gap-2"
            onClick={() => setMode("explore")}
          >
            Retour
            <Undo2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b p-6 shrink-0">
        <h3 className="font-medium text-sm">Prises</h3>

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
          <h3 className="font-medium text-sm mb-4 shrink-0">Informations</h3>
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
              { value: "feet-hand", label: "Pieds-mains" },
              { value: "free-feet", label: "Pieds-libres" },
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
      <div className="flex justify-between gap-4 p-4 shrink-0">
        <button className="font-medium text-sm p-2 flex gap-2 items-center cursor-pointer">
          Supprimer <Trash2 size={18} />
        </button>
        <button
          className="font-medium text-sm flex gap-2 items-center cursor-pointer bg-foreground text-background p-2"
          onClick={() => setMode("explore")}
        >
          Enregistrer <Save size={18} />
        </button>
      </div>
    </>
  );
};
