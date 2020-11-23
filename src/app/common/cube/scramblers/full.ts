import { doAlgorithm, identity } from "app/common/cube/libs/cube";
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
    const stateKey = `${getIndexFromPermutation(
      newState.cp,
      identity.cp
    )}:${getIndexFromOrientation(newState.co, 3)}:${getIndexFromPermutation(
      newState.ep,
      identity.ep
    )}:${getIndexFromOrientation(newState.eo, 2)}`;
    if (!previousCubeStates.has(stateKey)) {
      // If this state hasn't yet been encountered, save it and move on
      moves.push(move);
      previousCubeStates.add(stateKey);
      currentState = newState;
    }
  }
  return moves;
};
