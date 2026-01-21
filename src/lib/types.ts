import panzoom from "@panzoom/panzoom";

export type UUID = string & { readonly __uuid: unique symbol };
export type PanZoom = ReturnType<typeof panzoom>;

export type Mode = "explore" | "handle";
export type HoldType = "start" | "hold" | "foot";
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

export type Hold = {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  a: number;
  pxs?: number[];
  pys?: number[];
  fill: string;
  stroke: string;
};

export type Problem = {
  id: UUID;
  name: string;
  grade: Grade;
  author: string;
  date: string;
  feet: Feet;
  holds: {
    [key: string]: HoldType;
  };
};

export type ServerToClientEvents = {
  problem: (problem?: Problem) => void;
  problems: (problems: Problem[]) => void;
  holds: (holds: Hold[]) => void;
  create: (problem: Problem) => void;
  delete: (id: Problem["id"]) => void;
};

export type ClientToServerEvents = {
  problem: (problem?: Problem) => void;
  problems: (problems: Problem[]) => void;
  holds: (holds: Hold[]) => void;
  create: (problem: Problem) => void;
  delete: (id: Problem["id"]) => void;
};

export type Db = {
  holds: Hold[];
  problems: Problem[];
  currentProblemId?: UUID;
};
