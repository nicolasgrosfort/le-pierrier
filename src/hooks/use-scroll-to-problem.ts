import { _blocListRef, _problem } from "@/lib/store";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useScrollToProblem = () => {
  const [problem] = useAtom(_problem);
  const [blocListRef] = useAtom(_blocListRef);

  const scrollToProblem = useCallback(() => {
    const element = blocListRef.current?.querySelector(
      `#problem-item-${problem?.id}`,
    ) as HTMLElement;
    if (element && blocListRef.current) {
      const offsetTop =
        element.offsetTop - (blocListRef.current.offsetTop || 0);
      blocListRef.current.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, [blocListRef, problem]);

  return scrollToProblem;
};
