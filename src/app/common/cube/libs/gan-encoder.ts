import { chunkReducer } from "app/common/array-reducers";

const moveMap: Record<string, number> = {
  R: 0,
  R2: 1,
  "R'": 2,
  D: 3,
  D2: 4,
  "D'": 5,
  B: 6,
  B2: 7,
  "B'": 8,
  L: 9,
  L2: 10,
  "L'": 11,
  U: 12,
  U2: 13,
  "U'": 14,
};

export function getGANEncoding(scramble: string): Uint8Array {
  return new Uint8Array(
    scramble
      .split(" ")
      .map((move) => moveMap[move])
      .reduce(chunkReducer(2), [])
      .map((moves) => moves[0] * 16 + moves[1])
  );
}
