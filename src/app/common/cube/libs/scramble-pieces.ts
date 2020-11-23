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
  needsRotationAjustment: boolean
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

  if (needsRotationAjustment) {
    // adjust front face corners so they're all oriented with F on top
    // except when the piece is included in the enabled array to generate
    // a random orientation
    FRONT_FACE_EDGES.forEach((piece, i) => {
      if (enabled.includes(piece)) {
        return;
      }
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
  needsRotationAjustment: boolean
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

  if (needsRotationAjustment) {
    // adjust front face corners so they're all oriented with F on top
    // except when the piece is included in the enabled array to generate
    // a random oriention
    FRONT_FACE_CORNERS.forEach((piece, i) => {
      if (enabled.includes(piece)) {
        return;
      }
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
  permutationEdges: number[],
  permutationCorners: number[],
  orientationEdges = permutationEdges,
  orientationCorners = permutationCorners,
  isPhaseCompleted: (state: CubeIndexes) => boolean,
  needsRotation = false
): string | false => {
  let eo;
  let ep;
  let co;
  let cp;
  let scrambleState;
  const center = identity.center;

  // For the kociemba algorithm the U and D faces are special. For a five sided
  // solve you require both. If you orient the White or Yellow face up on the robot,
  // like in the cube previews, the solve is impossible. To work around this we start
  // by setting the Whte/Yellow face as F, even though it is U on the robot. Then we
  // rotate the cube so that the F face is now is oriented on top. This allows us to
  // not use the White/Yellow face (F) while solving, but to translate the solve
  // afterwards so that the solution algorithm does not use any U moves

  const rotations = "x";
  const rotatedIndexes = needsRotation
    ? rotateIndexes(
        {
          cp: permutationCorners,
          co: orientationCorners,
          ep: permutationEdges,
          eo: orientationEdges,
        },
        rotations
      )
    : {
        cp: permutationCorners,
        co: orientationCorners,
        ep: permutationEdges,
        eo: orientationEdges,
      };

  do {
    ep = getPermutationFromEnabled(rotatedIndexes.ep, 12);
    eo = getEdgeOrientation(rotatedIndexes.eo, ep, needsRotation);
    cp = getPermutationFromEnabled(rotatedIndexes.cp, 8);
    co = getCornerOrientation(rotatedIndexes.co, cp, needsRotation);
    scrambleState = { ep, eo, cp, co, center };
  } while (getParity(ep) !== getParity(cp) && !isPhaseCompleted(scrambleState));

  const solution = solveCoordinates(eo, ep, co, cp);
  if (needsRotation) {
    const solutionRotations = invertAlgorithm(rotations);
    return formatAlgorithm(parseAlgorithm(`${solutionRotations} ${solution}`));
  } else {
    return solution;
  }
};

const rotateIndexes = (
  indexes: {
    ep: number[];
    cp: number[];
    eo: number[];
    co: number[];
  },
  rotations: string
) => {
  const rotationMap = doRotations(identity, rotations);
  return {
    ep: indexes.ep.map((edgeIdx) => rotationMap.ep[edgeIdx]),
    eo: indexes.eo.map((edgeIdx) => rotationMap.ep[edgeIdx]),
    cp: indexes.cp.map((cornerIdx) => rotationMap.cp[cornerIdx]),
    co: indexes.co.map((cornerIdx) => rotationMap.cp[cornerIdx]),
  };
};

export default getScrambleForPieces;
