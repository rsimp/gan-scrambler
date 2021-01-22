import { parseAlgorithm } from "./algorithms";

export const Centers = {
  U: 0,
  R: 1,
  F: 2,
  D: 3,
  L: 4,
  B: 5,
};

export const Edges = {
  UR: 0,
  UF: 1,
  UL: 2,
  UB: 3,
  DR: 4,
  DF: 5,
  DL: 6,
  DB: 7,
  FR: 8,
  FL: 9,
  BL: 10,
  BR: 11,
};

export const Corners = {
  URF: 0,
  UFL: 1,
  ULB: 2,
  UBR: 3,
  DFR: 4,
  DLF: 5,
  DBL: 6,
  DBR: 7,
};

const { UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR } = Edges;
const { URF, UFL, ULB, UBR, DFR, DLF, DBL, DBR } = Corners;

export interface CubeIndexes {
  ep: number[];
  eo: number[];
  cp: number[];
  co: number[];
}

// The identity cube.
export const identity: CubeIndexes = {
  ep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  cp: [0, 1, 2, 3, 4, 5, 6, 7],
  co: [0, 0, 0, 0, 0, 0, 0, 0],
};

export const moves = [
  // F
  {
    cp: [UFL, DLF, 2, 3, URF, DFR, 6, 7],
    co: [1, 2, 0, 0, 2, 1, 0, 0],
    ep: [0, FL, 2, 3, 4, FR, 6, 7, UF, DF, 10, 11],
    eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
  },

  // R
  {
    cp: [DFR, 1, 2, URF, DBR, 5, 6, UBR],
    co: [2, 0, 0, 1, 1, 0, 0, 2],
    ep: [FR, 1, 2, 3, BR, 5, 6, 7, DR, 9, 10, UR],
    eo: identity.eo,
  },

  // U
  {
    cp: [UBR, URF, UFL, ULB, 4, 5, 6, 7],
    co: identity.co,
    ep: [UB, UR, UF, UL, 4, 5, 6, 7, 8, 9, 10, 11],
    eo: identity.eo,
  },

  // B
  {
    cp: [0, 1, UBR, DBR, 4, 5, ULB, DBL],
    co: [0, 0, 1, 2, 0, 0, 2, 1],
    ep: [0, 1, 2, BR, 4, 5, 6, BL, 8, 9, UB, DB],
    eo: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
  },

  // L
  {
    cp: [0, ULB, DBL, 3, 4, UFL, DLF, 7],
    co: [0, 1, 2, 0, 0, 2, 1, 0],
    ep: [0, 1, BL, 3, 4, 5, FL, 7, 8, UL, DL, 11],
    eo: identity.eo,
  },

  // D
  {
    cp: [0, 1, 2, 3, DLF, DBL, DBR, DFR],
    co: identity.co,
    ep: [0, 1, 2, 3, DF, DL, DB, DR, 8, 9, 10, 11],
    eo: identity.eo,
  },
];

export const allMoves = [
  0, // F
  1,
  2,
  3, // R
  4,
  5,
  6, // U
  7,
  8,
  9, // B
  10,
  11,
  12, // L
  13,
  14,
  15, // D
  16,
  17,
];

export const fiveSideMoves = [
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
];

export const moveHelper = <T>(
  cube: T,
  moveIndex: number,
  fn: (cube: T, move: CubeIndexes) => T
): T => {
  const move = moves[Math.floor(moveIndex / 3)];
  const pow = (moveIndex % 3) + 1;
  for (let i = 0; i < pow; i++) {
    cube = fn(cube, move);
  }
  return cube;
};

export const doEdgeMove = (
  cube: Pick<CubeIndexes, "eo" | "ep">,
  move: CubeIndexes
): typeof cube =>
  move.ep.reduce(
    (newCube, fromIndex, toIndex) => {
      newCube.ep[toIndex] = cube.ep[fromIndex];
      newCube.eo[toIndex] = (cube.eo[fromIndex] + move.eo[toIndex]) % 2;
      return newCube;
    },
    {
      ep: new Array(12),
      eo: new Array(12),
    }
  );

export const doCornerMove = (
  cube: Pick<CubeIndexes, "co" | "cp">,
  move: CubeIndexes
): typeof cube =>
  move.cp.reduce(
    (newCube, fromIndex, toIndex) => {
      newCube.cp[toIndex] = cube.cp[fromIndex];
      newCube.co[toIndex] = (cube.co[fromIndex] + move.co[toIndex]) % 3;
      return newCube;
    },
    {
      cp: new Array(8),
      co: new Array(8),
    }
  );

export const doMove = (cube: CubeIndexes, moveIndex: number): CubeIndexes => {
  return {
    ...moveHelper(cube, moveIndex, doCornerMove),
    ...moveHelper(cube, moveIndex, doEdgeMove),
  };
};

export const doAlgorithm = (algorithm: string, cube = identity): CubeIndexes =>
  !algorithm ? cube : parseAlgorithm(algorithm).reduce(doMove, cube);
