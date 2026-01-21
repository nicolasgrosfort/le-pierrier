"use client";

import { getSocket } from "@/lib/socket";
import { _isConnected, _problem, _problems } from "@/lib/store";
import { Problem } from "@/lib/types";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const SocketSync = () => {
  const [, setProblem] = useAtom<Problem | undefined>(_problem);
  const [, setProblems] = useAtom<Problem[]>(_problems);
  const [, setIsConnected] = useAtom<boolean>(_isConnected);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("problems", (nextProblems: Problem[]) => {
      setProblems(nextProblems);
    });

    socket.on("problem", (nextProblem: Problem | undefined) => {
      setProblem(nextProblem);
    });

    return () => {
      socket.off("problem");
      socket.disconnect();
    };
  }, [setProblem, setProblems, setIsConnected]);

  return null;
};
