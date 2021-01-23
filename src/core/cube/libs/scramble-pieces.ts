import {
  getPermutationFromIndex,
  getOrientationFromIndex,
  getParity,
} from "core/cube/libs/coordinates";

import { getRandomInt, factorial } from "core/cube/libs/tools";

import { CubeIndexes } from "core/cube/libs/cube";

import { solveCube, fiveSideSolver } from "core/cube/solvers/five-side-solver";

const getEdgeOrientation = (enabled: number[], orientLastLayer: boolean) => {
  const pieces = getOrientationFromIndex(
    getRandomInt(0, 2 ** (enabled.length - 1)),
    enabled.length,
    2
  );

  const orientation = Array(12).fill(0);

  if (!orientLastLayer) {
    enabled.forEach((piece, i) => {
      orientation[piece] = pieces[i];
    });
  }

  return orientation;
};

const getCornerOrientation = (enabled: number[], orientLastLayer: boolean) => {
  const pieces = getOrientationFromIndex(
    getRandomInt(0, 3 ** (enabled.length - 1)),
    enabled.length,
    3
  );

  const orientation = Array(8).fill(0);

  if (!orientLastLayer) {
    enabled.forEach((piece, i) => {
      orientation[piece] = pieces[i];
    });
  }

  return orientation;
};

/**
 * Returns a permutation vector where all pieces are
 * solved, except for the given enabled pieces.
 */
const getPermutationFromEnabled = (enabled: number[], size: number) => {
  const pieces = getPermutationFromIndex(
    getRandomInt(0, factorial(enabled.length)),
    enabled.slice(0),
    enabled.length
  );

  const permutation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].slice(0, size);

  enabled.forEach((piece, i) => {
    permutation[piece] = pieces[i];
  });

  return permutation;
};

/**
 * Generates a random scramble where all pieces are solved, except
 * for the provided edges and corners, which will be scrambled randomly.
 */
export const getScrambleForPieces = (
  scrambleEdges: number[],
  scrambleCorners: number[],
  isScrambleSolved: (state: CubeIndexes) => boolean,
  orientLastLayer = false
): string | false => {
  let scrambleState;

  do {
    scrambleState = {
      ep: getPermutationFromEnabled(scrambleEdges, 12),
      eo: getEdgeOrientation(scrambleEdges, orientLastLayer),
      cp: getPermutationFromEnabled(scrambleCorners, 8),
      co: getCornerOrientation(scrambleCorners, orientLastLayer),
    };
  } while (
    getParity(scrambleState.ep) !== getParity(scrambleState.cp) ||
    isScrambleSolved(scrambleState)
  );

  // The first solve gets a set of moves to solve the current cube state
  // We resolve the cube because this set of moves will contain U turns the
  // robot isn't capable of. The resolve won't use U turns
  const solution = solveCube(scrambleState);
  if (solution) {
    return fiveSideSolver(solution);
  }
  return false;
};

export default getScrambleForPieces;
