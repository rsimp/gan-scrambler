import {
  getPermutationFromIndex,
  getIndexFromPermutation,
  getOrientationFromIndex,
  getIndexFromOrientation,
} from "./coordinates";

import {
  doEdgeMove,
  doCornerMove,
  moveHelper,
  allMoves,
  identity,
} from "./cube";

import { factorial } from "./tools";

/**
 * Create a function which performs a move on a coordinate.
 */
const createMoveHandler = (
  getVector: GetVectorCallback,
  cubieMove: CubieMoveCallback,
  getIndex: GetIndexCallback
) => (index: number, move: number) => {
  let vector = getVector(index);
  vector = cubieMove(vector, move);
  return getIndex(vector);
};

type GetVectorCallback = (index: number) => number[];
type CubieMoveCallback = (pieces: number[], moveIndex: number) => number[];
type GetIndexCallback = (pieces: number[]) => number;

interface BaseMoveTableSettings {
  name: string;
  size: number;
  defaultIndex?: number;
  solvedIndexes?: number[];
  doMove?: (table: number[][], index: number, move: number) => number;
}

interface MoveTableSettingsWithTable extends BaseMoveTableSettings {
  table: number[][];
}

export interface MoveTableSettingsWithoutTable extends BaseMoveTableSettings {
  moves?: number[];
  getVector: GetVectorCallback;
  cubieMove: (pieces: number[], moveIndex: number) => number[];
  getIndex: GetIndexCallback;
}

export type MoveTableSettings =
  | MoveTableSettingsWithTable
  | MoveTableSettingsWithoutTable;

export class MoveTable {
  name: string;
  size: number;
  defaultIndex: number;
  solvedIndexes: number[];
  table: number[][];

  constructor(settings: MoveTableSettings) {
    // A name must be provided if the generic solver is being used, as
    // we use them to create the pruning tables.
    this.name = settings.name;

    // Some tables in the Kociemba solver define their own size, as
    // they are a subset of another already generated helper table.
    this.size = settings.size;

    this.defaultIndex = settings.defaultIndex || 0;
    this.solvedIndexes = settings.solvedIndexes || [this.defaultIndex];

    // We allow defining a custom function that returns the updated
    // index. This is useful for helper tables which are subsets
    // of already generated tables.
    const doMove = settings.doMove;
    if (doMove) {
      this.doMove = (index, move) => doMove(this.table, index, move);
    }

    if ("table" in settings) {
      this.table = settings.table;

      // If a pre-generated table is provide, do not generate another one.
      return;
    }

    const cubieMove = createMoveHandler(
      settings.getVector,
      settings.cubieMove,
      settings.getIndex
    );

    this.table = this.createMoveTable(settings.size, cubieMove, settings.moves);
  }

  doMove(index: number, move: number): number {
    return this.table[index][move];
  }

  createMoveTable(
    size: number,
    cubieMove: ReturnType<typeof createMoveHandler>,
    moves = allMoves
  ): number[][] {
    const table: number[][] = [];

    for (let i = 0; i < size; i += 1) {
      table.push([]);
    }

    // Create a matrix which stores the result after
    // applying a move to a coordinate.
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < moves.length; j += 1) {
        const move = moves[j];

        if (!table[i][move]) {
          // Assign both the value and its inverse at once
          // to avoid exess computing on the cubie level.
          const result = cubieMove(i, move);
          const inverse = move - 2 * (move % 3) + 2;
          table[i][move] = result;
          table[result][inverse] = i;
        }
      }
    }

    return table;
  }
}

export interface PermutationTableSettings {
  name: string;
  moves?: number[];
  affected: number[];
  reversed?: boolean;
  size?: number;
}

export const createCornerPermutationTable = (
  settings: PermutationTableSettings
): MoveTable =>
  new MoveTable({
    name: settings.name,
    moves: settings.moves,
    defaultIndex: getIndexFromPermutation(
      [0, 1, 2, 3, 4, 5, 6, 7],
      settings.affected,
      settings.reversed
    ),
    size:
      settings.size || factorial(8) / factorial(8 - settings.affected.length),
    getVector: (index) =>
      getPermutationFromIndex(
        index,
        settings.affected.slice(),
        8,
        settings.reversed
      ),
    cubieMove: (pieces, moveIndex) =>
      moveHelper({ cp: pieces, co: identity.co }, moveIndex, doCornerMove).cp,
    getIndex: (pieces) =>
      getIndexFromPermutation(pieces, settings.affected, settings.reversed),
  });

export const createEdgePermutationTable = (
  settings: PermutationTableSettings
): MoveTable =>
  new MoveTable({
    name: settings.name,
    moves: settings.moves,
    defaultIndex: getIndexFromPermutation(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      settings.affected,
      settings.reversed
    ),
    size:
      settings.size || factorial(12) / factorial(12 - settings.affected.length),
    getVector: (index) =>
      getPermutationFromIndex(
        index,
        settings.affected.slice(),
        12,
        settings.reversed
      ),
    cubieMove: (pieces, moveIndex) =>
      moveHelper({ ep: pieces, eo: identity.eo }, moveIndex, doEdgeMove).ep,
    getIndex: (pieces) =>
      getIndexFromPermutation(pieces, settings.affected, settings.reversed),
  });

const getCorrectOrientations = (
  affected: number[],
  numPieces: number,
  numStates: number
) => {
  const indexes = [];

  const size = numStates ** (numPieces - 1);

  const target = numStates ** (numPieces - affected.length - 1);

  for (let i = 0; i < size && indexes.length < target; i += 1) {
    const orientation = getOrientationFromIndex(i, numPieces, numStates);

    if (affected.every((piece) => orientation[piece] === 0)) {
      indexes.push(i);
    }
  }

  return indexes;
};

export interface OrientationTableSettings {
  name: string;
  affected: number[];
}

export const createEdgeOrientationTable = (
  settings: OrientationTableSettings
): MoveTable =>
  new MoveTable({
    name: settings.name,
    size: 2048,
    solvedIndexes: getCorrectOrientations(settings.affected, 12, 2),
    getVector: (index) => getOrientationFromIndex(index, 12, 2),
    cubieMove: (pieces, moveIndex) =>
      moveHelper({ ep: identity.ep, eo: pieces }, moveIndex, doEdgeMove).eo,
    getIndex: (pieces) => getIndexFromOrientation(pieces, 2),
  });

export const createCornerOrientationTable = (
  settings: OrientationTableSettings
): MoveTable =>
  new MoveTable({
    name: settings.name,
    size: 2187,
    solvedIndexes: getCorrectOrientations(settings.affected, 8, 3),
    getVector: (index) => getOrientationFromIndex(index, 8, 3),
    cubieMove: (pieces, moveIndex) =>
      moveHelper({ cp: identity.cp, co: pieces }, moveIndex, doCornerMove).co,
    getIndex: (pieces) => getIndexFromOrientation(pieces, 3),
  });
