import { Grade } from "@/components/grade";
import { FEET_LABEL } from "@/lib/config";
import { getSocket } from "@/lib/socket";
import { Problem } from "@/lib/types";

type ProblemItemProps = {
  problem: Problem;
  selected: boolean;
};

export const ProblemItem = ({ problem, selected }: ProblemItemProps) => {
  const handleOnClick = () => {
    const socket = getSocket();
    socket.connect();
    socket.emit("problem", problem);
  };

  return (
    <button
      key={problem.id}
      className={`border p-2 cursor-pointer ${selected ? "bg-foreground text-background" : ""}`}
      onClick={handleOnClick}
      id={`problem-item-${problem.id}`}
    >
      <div className="flex justify-between leading-none items-center gap-2">
        <div className="flex flex-col text-left gap-1 flex-1 min-w-0">
          <h4 className="font-mono font-semibold text-sm truncate">
            {problem.name || "Bloc sans nom"}
          </h4>
          <div className="flex items-center gap-4">
            <span className="text-xs truncate font-medium">
              {problem.author || "Inconnu"}
            </span>
            <span className="text-xs whitespace-nowrap font-medium">
              {FEET_LABEL[problem.feet]}
            </span>
          </div>
        </div>
        <Grade grade={problem.grade} inverse={selected} />
      </div>
    </button>
  );
};
