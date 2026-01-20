import { GRADES } from "@/lib/config";
import { Problem } from "@/lib/types";
import { MountainSnow, Plus } from "lucide-react";

function rand(min = 45, max = 95) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function highCurvatureBlob() {
  return `${rand()}% ${rand()}% ${rand()}% ${rand()}% / ${rand()}% ${rand()}% ${rand()}% ${rand()}%`;
}

const problems: Problem[] = [
  {
    id: 1,
    author: "Nicolas",
    name: "Échauffement",
    grade: "4b",
    date: "12.12.2026",
    feet: true,
    holds: {},
  },
  {
    id: 2,
    author: "Pascal",
    name: "Medium",
    grade: "5b",
    date: "12.12.2026",
    feet: true,
    holds: {},
  },
];

export const Sidebar = () => {
  return (
    <nav className="border-l border-black min-w-[320px] h-full flex flex-col z-10 bg-background">
      <div className="flex flex-col gap-2 border-b p-6">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h2 className="font-serif text-xl">Échauffement</h2>
          <div
            className="w-8 h-8 bg-foreground flex items-center justify-center"
            style={{ borderRadius: highCurvatureBlob() }}
          >
            <span className="text-background font-medium">4b</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center justify-between">
            <span className="text-sm font-medium">Nicolas</span>
            <span className="text-sm font-medium">8 prises</span>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <span className="text-xs">12.12.2026</span>
            <span className="text-xs underline">Modifier</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-b p-6">
        <h3 className="font-medium text-sm">Cotations</h3>
        <div className="grid grid-cols-8 gap-1">
          {GRADES.map((grade, id) => (
            <button
              key={grade}
              className={`${id === 0 ? "bg-foreground text-background" : "bg-background text-foreground"} w-8 h-8 flex items-center justify-center border cursor-pointer`}
              style={{ borderRadius: highCurvatureBlob() }}
            >
              <span className="font-medium text-sm">{grade}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 border-b p-6">
        <h3 className="font-medium text-sm">Blocs</h3>
        <div className="flex flex-col gap-2">
          {problems.map((problem) => (
            <div key={problem.id} className="border p-2">
              <div className="flex justify-between leading-none">
                <div className="">
                  <h4 className="font-serif">{problem.name}</h4>
                  <span className="text-xs">{problem.author}</span>
                </div>
                <div
                  className="w-8 h-8 bg-foreground flex items-center justify-center"
                  style={{ borderRadius: highCurvatureBlob() }}
                >
                  <span className="text-background font-medium text-sm">
                    {problem.grade}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-4 p-4">
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
