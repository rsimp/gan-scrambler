import { parseAlgorithm } from "./algorithms";
import { rotateParts } from "./tools";

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

const _U = (x: number) => x - 1;
const _R = (x: number) => _U(9) + x;
const _F = (x: number) => _R(9) + x;
const _D = (x: number) => _F(9) + x;
const _L = (x: number) => _D(9) + x;
const _B = (x: number) => _L(9) + x;

const centerFacelets = ["U", "R", "F", "D", "L", "B"];

const cornerFacelets = [
  ["U", "R", "F"],
  ["U", "F", "L"],
  ["U", "L", "B"],
  ["U", "B", "R"],
  ["D", "F", "R"],
  ["D", "L", "F"],
  ["D", "B", "L"],
  ["D", "R", "B"],
];

const cornerFaceletIndexes = [
  [_U(9), _R(1), _F(3)],
  [_U(7), _F(1), _L(3)],
  [_U(1), _L(1), _B(3)],
  [_U(3), _B(1), _R(3)],
  [_D(3), _F(9), _R(7)],
  [_D(1), _L(9), _F(7)],
  [_D(7), _B(9), _L(7)],
  [_D(9), _R(9), _B(7)],
];

const edgeFacelets = [
  ["U", "R"],
  ["U", "F"],
  ["U", "L"],
  ["U", "B"],
  ["D", "R"],
  ["D", "F"],
  ["D", "L"],
  ["D", "B"],
  ["F", "R"],
  ["F", "L"],
  ["B", "L"],
  ["B", "R"],
];

const edgeFaceletIndexes = [
  [_U(6), _R(2)],
  [_U(8), _F(2)],
  [_U(4), _L(2)],
  [_U(2), _B(2)],
  [_D(6), _R(8)],
  [_D(2), _F(8)],
  [_D(4), _L(8)],
  [_D(8), _B(8)],
  [_F(6), _R(4)],
  [_F(4), _L(6)],
  [_B(6), _L(4)],
  [_B(4), _R(6)],
];

/**
 * We define moves as the four pieces which are
 * rotated in a circular fashion.
 */
const edgeMoves = [
  [1, 8, 5, 9],
  [0, 11, 4, 8],
  [1, 2, 3, 0],
  [3, 10, 7, 11],
  [2, 9, 6, 10],
  [5, 4, 7, 6],
];

/**
 * Corner moves are defined in the same way as
 * the edge moves are defined.
 */
const cornerMoves = [
  [1, 0, 4, 5],
  [0, 3, 7, 4],
  [0, 1, 2, 3],
  [3, 2, 6, 7],
  [2, 1, 5, 6],
  [5, 4, 7, 6],
];

/**
 * Helper function to perform a corner or edge permutation move
 * to the given permutation vector.
 */
const permutationMove = (
  pieces: number[],
  moveIndex: number,
  moves: number[][]
) => {
  let updated = pieces;
  const move = moves[Math.floor(moveIndex / 3)];
  const pow = moveIndex % 3;

  for (let i = 0; i <= pow; i += 1) {
    updated = rotateParts(updated, move);
  }

  return updated;
};

/**
 * Perform a move to an edge permutaion vector.
 */
export const edgePermutationMove = (
  pieces: number[],
  moveIndex: number
): number[] => permutationMove(pieces, moveIndex, edgeMoves);

/**
 * Perform a move to a corner permuttaion vector.
 */
export const cornerPermutationMove = (
  pieces: number[],
  moveIndex: number
): number[] => permutationMove(pieces, moveIndex, cornerMoves);

/**
 * Perform a move to an edge orientation vector.
 */
export const edgeOrientationMove = (
  pieces: number[],
  moveIndex: number
): number[] => {
  const moveNumber = Math.floor(moveIndex / 3);
  const move = edgeMoves[moveNumber];
  const pow = moveIndex % 3;

  const updatedPieces = edgePermutationMove(pieces, moveIndex);

  // Only quarter moves of the F and B faces affect the edge orientation.
  if ((moveNumber === 0 || moveNumber === 3) && pow % 2 === 0) {
    for (let i = 0; i < 4; i += 1) {
      updatedPieces[move[i]] = (updatedPieces[move[i]] + 1) % 2;
    }
  }

  return updatedPieces;
};

/**
 * Perform a move to a corner orientation vector.
 */
export const cornerOrientationMove = (
  pieces: number[],
  moveIndex: number
): number[] => {
  const moveNumber = Math.floor(moveIndex / 3);
  const move = cornerMoves[moveNumber];
  const pow = moveIndex % 3;

  const updatedPieces = cornerPermutationMove(pieces, moveIndex);

  // Only quarter moves of any slice but the U and D slices
  // affect the corner orientation.
  if (moveNumber !== 2 && moveNumber !== 5 && pow % 2 === 0) {
    for (let i = 0; i < 4; i += 1) {
      updatedPieces[move[i]] = (updatedPieces[move[i]] + ((i + 1) % 2) + 1) % 3;
    }
  }

  return updatedPieces;
};

// The identity cube.
export const identity: CubeIndexes = {
  ep: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  cp: [0, 1, 2, 3, 4, 5, 6, 7],
  co: [0, 0, 0, 0, 0, 0, 0, 0],
};

export interface CubeIndexes {
  ep: number[];
  eo: number[];
  cp: number[];
  co: number[];
}

/**
 * Performs an algorithm to a cube on the cubie level.
 */
export const doAlgorithm = (
  algorithm: string,
  cube = identity
): CubeIndexes => {
  if (!algorithm) {
    return cube;
  }

  const cubeCopy = {
    ep: cube.ep.slice(),
    eo: cube.eo.slice(),
    cp: cube.cp.slice(),
    co: cube.co.slice(),
  };
  return parseAlgorithm(algorithm).reduce(
    (newCube: CubeIndexes, move) => ({
      ep: edgePermutationMove(newCube.ep, move),
      eo: edgeOrientationMove(newCube.eo, move),
      cp: cornerPermutationMove(newCube.cp, move),
      co: cornerOrientationMove(newCube.co, move),
    }),
    cubeCopy
  );
};

export interface FaceletArrayFilter {
  edges?: number[];
  corners?: number[];
  facelets?: string[];
}

export const getFaceletArray = (
  cube: CubeIndexes,
  filter?: FaceletArrayFilter
): string[] => {
  const facelets: string[] = [];

  const filteredCornerFacelets = cornerFacelets.map((facelets, i) => {
    if (!filter || (filter.corners && filter.corners.includes(i))) {
      return facelets;
    }
    return facelets.map((facelet) =>
      filter.facelets && filter.facelets.includes(facelet) ? facelet : "G"
    );
  });

  const filteredEdgeFacelets = edgeFacelets.map((facelets, i) => {
    if (!filter || (filter.edges && filter.edges.includes(i))) {
      return facelets;
    }
    return facelets.map((facelet) =>
      filter.facelets && filter.facelets.includes(facelet) ? facelet : "G"
    );
  });

  // add center facelets to array
  centerFacelets.forEach((facelet, i) => {
    facelets[9 * i + 4] = facelet;
  });

  // add corner cubie facelets
  identity.cp.forEach((i) => {
    filteredCornerFacelets[cube.cp[i]].forEach((facelet, j) => {
      facelets[cornerFaceletIndexes[i][(j + cube.co[i]) % 3]] = facelet;
    });
  });

  // add edge cubie facelets
  identity.ep.forEach((i) => {
    filteredEdgeFacelets[cube.ep[i]].forEach((facelet, j) => {
      facelets[edgeFaceletIndexes[i][(j + cube.eo[i]) % 2]] = facelet;
    });
  });

  return facelets;
};

/**
 * All the moves which can be performed on a cube.
 */
export const allMoves = [
  0, //f
  1,
  2,
  3, //r
  4,
  5,
  6, //u
  7,
  8,
  9, //b
  10,
  11,
  12, //l
  13,
  14,
  15, //d
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
