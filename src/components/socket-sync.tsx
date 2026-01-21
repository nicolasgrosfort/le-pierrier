"use client";

import { getSocket } from "@/lib/socket";
import {
  _holds,
  _isConnected,
  _problem,
  _problems,
  _wallTransform,
} from "@/lib/store";
import { Problem } from "@/lib/types";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const SocketSync = ({ children }: { children: React.ReactNode }) => {
  const [, setProblem] = useAtom(_problem);
  const [, setProblems] = useAtom(_problems);
  const [, setHolds] = useAtom(_holds);
  const [, setIsConnected] = useAtom(_isConnected);
  const [, setWallTransform] = useAtom(_wallTransform);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("holds", (nextHolds) => {
      setHolds(nextHolds);
    });

    socket.on("problems", (nextProblems: Problem[]) => {
      setProblems(nextProblems);
    });

    socket.on("problem", (nextProblem: Problem | undefined) => {
      setProblem(nextProblem);
    });

    socket.on("transform", (transform) => {
      setWallTransform(transform);
    });

    return () => {
      socket.off("problem");
      socket.off("problems");
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [setProblem, setProblems, setIsConnected, setHolds, setWallTransform]);

  return children;
};
