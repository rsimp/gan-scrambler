import { chunkReducer } from "app/common/array-reducers";

const cubeFaces = ["D", "L", "B", "U", "R", "F"];
const moveModifiers = ["", "2", "'"];
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

/*
           +----------+
           | 24 25 26 |
           | 31  U 27 |
           | 30 29 28 |
+----------+----------+----------+----------+
| 08 09 10 | 40 41 42 | 32 33 34 | 16 17 18 |
| 15  L 11 | 47  F 43 | 39  R 35 | 23  B 19 |
| 14 13 12 | 46 45 44 | 38 37 36 | 22 21 20 |
+----------+----------+----------+----------+
           | 00 01 02 |
           | 07  D 03 |
           | 06 05 04 |
           +----------+
*/
const faceEdges: Record<string, Array<number>> = {
  D: [46, 45, 44, 38, 37, 36, 22, 21, 20, 14, 13, 12],
  L: [24, 31, 30, 40, 47, 46, 0, 7, 6, 20, 19, 18],
  B: [26, 25, 24, 8, 15, 14, 6, 5, 4, 36, 35, 34],
  U: [18, 17, 16, 34, 33, 32, 42, 41, 40, 10, 9, 8],
  R: [28, 27, 26, 16, 23, 22, 4, 3, 2, 44, 43, 42],
  F: [30, 29, 28, 32, 39, 38, 2, 1, 0, 12, 11, 10],
};

export interface Scramble {
  code: string;
  cubeState: string;
  GANEncoding: Array<number>;
}

export function generateScramble(): Scramble {
  const cube = createCube();
  const moveList = cube.scramble();
  return {
    code: moveList.join(" "),
    GANEncoding: moveList
      .map((move) => moveMap[move])
      .reduce(chunkReducer(2), [])
      .map((moves) => moves[0] * 16 + moves[1]),
    cubeState: cube.currentState,
  };
}

function createCube() {
  const cubeHistory = ["DDDDDDDDLLLLLLLLBBBBBBBBUUUUUUUURRRRRRRRFFFFFFFF"];
  const reset = () => cubeHistory.splice(1);
  const twist = (cubeStateStr: string, move: string) => {
    const cubeFace = move.charAt(0);
    const cubeFaceIdx = cubeFaces.indexOf(cubeFace) * 8;
    const rotationMultiplier =
      move.length > 1 ? (move.charAt(1) === "2" ? 2 : 3) : 1;

    const cubeState = cubeStateStr.split(""); // convert to array in order to edit
    const prevCubeState = cubeState.slice(0);

    // Rotate the stickers on the face itself
    for (let faceletOffset = 0; faceletOffset < 8; faceletOffset++) {
      const rotationOffset = (faceletOffset + 6 * rotationMultiplier) % 8;
      cubeState[cubeFaceIdx + faceletOffset] =
        prevCubeState[cubeFaceIdx + rotationOffset];
    }

    // Rotate the adjacent stickers that are part of the same layer
    for (let edgeIdx = 0; edgeIdx < 12; edgeIdx++) {
      const rotatedEdgeIdx = (edgeIdx + 9 * rotationMultiplier) % 12;
      cubeState[faceEdges[cubeFace][edgeIdx]] =
        prevCubeState[faceEdges[cubeFace][rotatedEdgeIdx]];
    }

    return cubeState.join("");
  };
  const scramble = (total = 26) => {
    const moves = [];
    let currentState = cubeHistory[cubeHistory.length - 1];

    while (moves.length < total) {
      // Generate a random move
      const move =
        cubeFaces[Math.floor(Math.random() * 6)] +
        moveModifiers[Math.floor(Math.random() * 3)];
      if (move.charAt(0) === "U") {
        continue;
      }
      // Don't move the same face twice in a row
      if (
        moves.length > 0 &&
        move.charAt(0) === moves[moves.length - 1].charAt(0)
      ) {
        continue;
      }
      // Avoid move sequences like "R L R", which is the same as "R2 L"
      if (
        moves.length > 1 &&
        move.charAt(0) === moves[moves.length - 2].charAt(0) &&
        moves[moves.length - 1].charAt(0) ===
          cubeFaces[(cubeFaces.indexOf(move.charAt(0)) + 3) % 6]
      ) {
        continue;
      }
      const newState = twist(currentState, move);
      if (cubeHistory.indexOf(newState) === -1) {
        // If this state hasn't yet been encountered, save it and move on
        moves.push(move);
        cubeHistory.push(newState);
        currentState = newState;
      }
    }
    return moves;
  };

  return {
    scramble,
    reset,
    twist,
    currentState: cubeHistory[cubeHistory.length - 1],
  };
}
