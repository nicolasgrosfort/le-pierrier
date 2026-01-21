import { Grade } from "@/components/grade";
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
    >
      <div className="flex justify-between leading-none items-center gap-2">
        <div className="flex flex-col text-left gap-1 flex-1 min-w-0">
          <h4 className="font-mono font-semibold text-sm truncate">
            {problem.name || "Bloc sans nom"}
          </h4>
          <span className="text-xs">{problem.author || "-"}</span>
        </div>
        <Grade grade={problem.grade} inverse={selected} />
      </div>
    </button>
  );
};
