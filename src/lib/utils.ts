import { UUID } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export function createUUID(): UUID {
  return uuidv4() as UUID;
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

export const getKeyFromUrl = () => {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  return params.get("key");
};
