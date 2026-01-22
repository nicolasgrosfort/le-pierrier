"use client";

import { GenericTitle } from "@/components/generic-title";
import { ProblemTitle } from "@/components/problem-title";
import { _problem } from "@/lib/store";
import { useAtom } from "jotai";

export const Header = () => {
  const [problem] = useAtom(_problem);

  return problem ? <ProblemTitle problem={problem} /> : <GenericTitle />;
};
