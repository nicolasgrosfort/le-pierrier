import { ALL_HOLD_IDS, GRADES, HOLD_TYPES } from "@/utils/config";
import { Hold, Problem } from "@/utils/types";

function pickRandom<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomHolds(min = 10, max = 30): Record<string, Hold> {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;

  const pickedIds = pickRandom(ALL_HOLD_IDS, count);

  return Object.fromEntries(
    pickedIds.map((id) => [
      id,
      HOLD_TYPES[Math.floor(Math.random() * HOLD_TYPES.length)],
    ]),
  );
}

export function generateProblems(total = 10): Problem[] {
  return Array.from({ length: total }, (_, index) => {
    const id = index + 1;

    return {
      id,
      name: `Problem ${id}`,
      author: "Setter",
      date: new Date().toISOString().split("T")[0],
      grade: randomItem(GRADES),
      rate: Math.floor(Math.random() * 5) + 1,
      feet: Math.random() > 0.5,
      holds: generateRandomHolds(),
    };
  });
}
