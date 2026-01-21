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
      <div className="flex justify-between leading-none">
        <div className="">
          <h4 className="font-serif">{problem.name}</h4>
          <span className="text-xs">{problem.author}</span>
        </div>
        <Grade grade={problem.grade} inverse={selected} />
      </div>
    </button>
  );
};
