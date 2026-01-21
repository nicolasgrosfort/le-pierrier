import panzoom from "@panzoom/panzoom";

export type PanZoom = ReturnType<typeof panzoom>;

export type Hold = "start" | "hold" | "foot";

export type Grade =
  | "4a"
  | "4b"
  | "4c"
  | "5a"
  | "5b"
  | "5c"
  | "6a"
  | "6a+"
  | "6b"
  | "6b+"
  | "6c"
  | "6c+"
  | "7a"
  | "7a+"
  | "7b"
  | "7b+"
  | "7c"
  | "7c+"
  | "8a"
  | "8a+"
  | "8b"
  | "8b+"
  | "8c"
  | "8c+";

export type Problem = {
  name: string;
  grade: Grade;
  author: string;
  date: string;
  rate?: number;
  feet: boolean;
  holds: {
    [key: string]: Hold;
  };
  id: number;
};

export type ServerToClientEvents = {
  current: (problem: Problem["id"]) => void;
  problem: (problem: Problem) => void;
  problems: (problems: Problem[]) => void;
  // selectProblem: (index: number) => void;
  // addProblem: (problem: Problem) => void;
  // deleteProblem: (index: number) => void;
};

export type ClientToServerEvents = {
  current: (problem: Problem["id"]) => void;
  problem: (problem: Problem) => void;
  problems: (problems: Problem[]) => void;
  // selectProblem: (index: number) => void;
  // addProblem: (problem: Problem) => void;
  // deleteProblem: (index: number) => void;
};
