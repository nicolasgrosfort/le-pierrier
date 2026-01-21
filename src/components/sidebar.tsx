"use client";

import { Grade } from "@/components/grade";
import { ProblemItem } from "@/components/problem-item";
import { GRADES } from "@/lib/config";
import { _problem, _problems } from "@/lib/store";
import { Grade as GradeType, Problem } from "@/lib/types";
import { useAtom } from "jotai";
import { MountainSnow, Plus } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [gradesFilter, setGradesFilter] = useState<GradeType[]>([]);

  const [problems] = useAtom<Problem[]>(_problems);
  const [problem] = useAtom<Problem>(_problem);

  console.log("Sidebar render", { problems, problem });

  const filteredProblems = gradesFilter.length
    ? problems.filter((p) => gradesFilter.includes(p.grade))
    : problems;

  const sortedProblems = [...filteredProblems].sort(
    (a, b) => GRADES.indexOf(a.grade!) - GRADES.indexOf(b.grade!),
  );

  return (
    <nav className="border-l border-black w-90 h-full flex flex-col z-10 bg-background overflow-hidden">
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
            <span className="text-xs underline">Modifier</span>
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
        <div className="grid grid-cols-8 gap-1">
          {GRADES.map((grade) => (
            <button
              key={grade}
              className="cursor-pointer"
              onClick={() => {
                setGradesFilter((current) =>
                  current.includes(grade)
                    ? current.filter((g) => g !== grade)
                    : [...current, grade],
                );
              }}
            >
              <Grade inverse={!gradesFilter.includes(grade)} grade={grade} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col border-b p-6 min-h-0">
        <h3 className="font-medium text-sm mb-4 shrink-0">Blocs</h3>
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
          123 blocs <MountainSnow size={18} />
        </span>
        <button className="font-medium text-sm flex gap-2 items-center cursor-pointer bg-foreground text-background p-2">
          Nouveau bloc <Plus size={18} />
        </button>
      </div>
    </nav>
  );
};
