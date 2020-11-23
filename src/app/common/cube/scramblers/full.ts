import { doAlgorithm, identity, CubeIndexes } from "app/common/cube/libs/cube";
import {
  getIndexFromOrientation,
  getIndexFromPermutation,
} from "../libs/coordinates";

const cubeFaces = ["D", "L", "B", "U", "R", "F"];
const moveModifiers = ["", "2", "'"];

export function generateScramble(total = 26): string {
  return scramble(total).join(" ");
}

const scramble = (total = 26) => {
  const previousCubeStates = new Set();
  let currentState = identity;
  const moves = [];

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

    const newState = doAlgorithm(move, currentState);
    const stateHashCode = getStateHashCode(newState);
    if (!previousCubeStates.has(stateHashCode)) {
      moves.push(move);
      previousCubeStates.add(stateHashCode);
      currentState = newState;
    }
  }
  return moves;
};

const getStateHashCode = (cubeState: CubeIndexes) => {
  const cpIndex = getIndexFromPermutation(cubeState.cp, identity.cp);
  const coIndex = getIndexFromOrientation(cubeState.co, 3);
  const epIndex = getIndexFromPermutation(cubeState.ep, identity.ep);
  const eoIndex = getIndexFromOrientation(cubeState.co, 2);
  return `${cpIndex}:${coIndex}:${epIndex}:${eoIndex}`;
};
