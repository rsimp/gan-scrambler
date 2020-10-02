import { chunkReducer } from "app/common/array-reducers";

const moveMap: Record<string, number> = {
  R: 0,
  R2: 1,
  "R'": 2,
  F: 3,
  F2: 4,
  "F'": 5,
  D: 6,
  D2: 7,
  "D'": 8,
  L: 9,
  L2: 10,
  "L'": 11,
  B: 12,
  B2: 13,
  "B'": 14,
};

export function getGANEncoding(scramble: string): Uint8Array {
  return new Uint8Array(scramble.split(" ")
    .map((move) => moveMap[move])
    .reduce(chunkReducer(2), [])
    .map((moves) => moves[0] * 16 + moves[1])
  );
}