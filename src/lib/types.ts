import panzoom from "@panzoom/panzoom";

export type UUID = string & { readonly __uuid: unique symbol };
export type Mode = "explore" | "handle";
export type PanZoom = ReturnType<typeof panzoom>;
export type Hold = "start" | "hold" | "foot";
export type Feet = "feet-hand" | "free-feet";

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
  id: UUID;
  name: string;
  grade: Grade;
  author: string;
  date: string;
  feet: Feet;
  holds: {
    [key: string]: Hold;
  };
};

export type ServerToClientEvents = {
  problem: (problem?: Problem) => void;
  problems: (problems: Problem[]) => void;
  create: (problem: Problem) => void;
  delete: (id: Problem["id"]) => void;
};

export type ClientToServerEvents = {
  problem: (problem?: Problem) => void;
  problems: (problems: Problem[]) => void;
  create: (problem: Problem) => void;
  delete: (id: Problem["id"]) => void;
};

export type Db = {
  problems: Problem[];
  currentProblemId?: UUID;
};
