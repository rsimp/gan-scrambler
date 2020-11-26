import {
  getPermutationFromIndex,
  getOrientationFromIndex,
  getParity,
} from "app/common/cube/libs/coordinates";

import { getRandomInt, factorial } from "app/common/cube/libs/tools";

import { invertAlgorithm, formatAlgorithm, parseAlgorithm } from "./algorithms";
import { identity, Corners, CubeIndexes } from "app/common/cube/libs/cube";
import { doRotations } from "app/common/cube/libs/cube-preview";

import { solveCoordinates } from "app/common/cube/solvers/five-side-solver";

const FRONT_FACE_EDGES = [1, 9, 5, 8];
const FRONT_FACE_CORNERS = [Corners.URF, Corners.UFL, Corners.DLF, Corners.DFR];

const mod = (n: number, m: number) => ((n % m) + m) % m;

const getEdgeOrientation = (
  enabled: number[],
  permutation: number[],
  orientLastLayer: boolean
) => {
  const pieces = getOrientationFromIndex(
    getRandomInt(0, 2 ** (enabled.length - 1)),
    enabled.length,
    2
  );

  const orientation = Array(12).fill(0);

  enabled.forEach((piece, i) => {
    orientation[piece] = pieces[i];
  });

  if (orientLastLayer) {
    // adjust front face corners so they're all oriented with F on top
    FRONT_FACE_EDGES.forEach((piece, i) => {
      // if edge is in the correct or opposite side set orientation to 0
      // otherwise set orientation to 1
      orientation[piece] = mod(
        FRONT_FACE_EDGES.indexOf(permutation[piece]) - i,
        2
      );
    });
  }

  return orientation;
};

const getCornerOrientation = (
  enabled: number[],
  permutation: number[],
  orientLastLayer: boolean
) => {
  const pieces = getOrientationFromIndex(
    getRandomInt(0, 3 ** (enabled.length - 1)),
    enabled.length,
    3
  );

  const orientation = Array(8).fill(0);

  enabled.forEach((piece, i) => {
    orientation[piece] = pieces[i];
  });

  if (orientLastLayer) {
    // adjust front face corners so they're all oriented with F on top
    FRONT_FACE_CORNERS.forEach((piece, i) => {
      const frontCornerIndex = FRONT_FACE_CORNERS.indexOf(permutation[piece]);
      const displacement = frontCornerIndex - i;
      // if corner is in the correct or opposite corner then set orientation to 0
      if (mod(displacement, 2) !== 0) {
        // otherwise set URF and DLF to 2 and the others to 1
        orientation[piece] = mod(frontCornerIndex, 2) === 0 ? 2 : 1;
      }
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
  // For the kociemba algorithm the U and D faces are special. For a five sided
  // solve you require both. If you set White or Yellow as U or D, like in the cube
  // previews, the solve is impossible. To work around this we assume the Whte/Yellow
  // face is F, complete the solve and then translate the solution with an x' rotation
  // afterwards. This allows us to not use the White/Yellow face (F) while solving,
  // but end with a solution where White/Yellow is oriented as U again
  let ep, eo, cp, co;
  const center = identity.center;

  // internally we consider White/Yellow to be F but externally it is U so first we
  // rotate the inputs so that U becomes F and so on
  const rotation = "x";
  const rotatedPieces = rotatePieces(scrambleEdges, scrambleCorners, rotation);
  do {
    ep = getPermutationFromEnabled(rotatedPieces.edges, 12);
    eo = getEdgeOrientation(rotatedPieces.edges, ep, orientLastLayer);
    cp = getPermutationFromEnabled(rotatedPieces.corners, 8);
    co = getCornerOrientation(rotatedPieces.corners, cp, orientLastLayer);
  } while (
    getParity(ep) !== getParity(cp) ||
    isScrambleSolved({ ep, eo, cp, co, center })
  );

  const solution = solveCoordinates(eo, ep, co, cp);

  if (solution) {
    // now translate the solution so that White/Yellow is now U again
    const solutionRotations = invertAlgorithm(rotation);
    return formatAlgorithm(parseAlgorithm(`${solutionRotations} ${solution}`));
  }
  return false;
};

const rotatePieces = (edges: number[], corners: number[], rotation: string) => {
  const rotationMap = doRotations(identity, rotation);
  return {
    edges: edges.map((edgeIdx) => rotationMap.ep[edgeIdx]),
    corners: corners.map((cornerIdx) => rotationMap.cp[cornerIdx]),
  };
};

export default getScrambleForPieces;
