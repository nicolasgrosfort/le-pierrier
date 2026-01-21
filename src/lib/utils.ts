import { ALL_HOLD_IDS, GRADES, HOLD_TYPES } from "@/lib/config";
import { Hold, Problem, UUID } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export function createUUID(): UUID {
  return uuidv4() as UUID;
}

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

function randomRecentDate(daysBack = 180): string {
  const now = Date.now();
  const past = now - daysBack * 24 * 60 * 60 * 1000;

  return new Date(past + Math.random() * (now - past))
    .toISOString()
    .split("T")[0];
}

export function generateProblems(total = 10): Problem[] {
  return Array.from({ length: total }, () => {
    const id = createUUID();
    return {
      id,
      name: randomProblemName(id),
      author: "Setter",
      date: randomRecentDate(),
      grade: randomItem(GRADES),
      rate: Math.floor(Math.random() * 5) + 1,
      feet: Math.random() > 0.5 ? "feet-hand" : "free-feet",
      holds: generateRandomHolds(),
    };
  });
}

export function blobFromSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
  }

  const r = () => {
    h = Math.imul(48271, h) % 2147483647;
    return (h & 2147483647) / 2147483647;
  };

  const p = () => Math.floor(45 + r() * 50);

  return `${p()}% ${p()}% ${p()}% ${p()}% / ${p()}% ${p()}% ${p()}% ${p()}%`;
}

function randomNameWord() {
  const words = [
    "Étoile",
    "Cascade",
    "Volcan",
    "Dragon",
    "Montagne",
    "Éclipse",
    "Rivière",
    "Tempête",
    "Sérénité",
    "Aurore",
    "Mystère",
    "Sable",
    "Cristal",
    "Nuage",
    "Ombre",
    "Feuille",
    "Foudre",
    "Brume",
    "Horizon",
    "Équinoxe",
  ];
  return words[Math.floor(Math.random() * words.length)];
}

function randomProblemName(id: UUID) {
  const length = Math.floor(Math.random() * 3) + 2; // 2 à 4 mots
  const words = Array.from({ length }, () => randomNameWord());
  return `${words.join(" ")} #${id}`;
}
