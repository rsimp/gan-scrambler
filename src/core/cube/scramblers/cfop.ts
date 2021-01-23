import getScrambleForPieces from "core/cube/libs/scramble-pieces";
import { Edges, Corners } from "core/cube/libs/cube";
import {
  isOLLSolved,
  isFirstLookOLLSolved,
  isFirstLookPLLSolved,
  isCubeSolved,
} from "core/cube/scramblers/solve-criteria";

export const generateOLLScramble = (): string | false =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],
    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],
    isOLLSolved
  );

export const generateFirstLookOLLScramble = (): string | false =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],
    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],
    isFirstLookOLLSolved
  );

export const generateSecondLookOLLScramble = (): string | false =>
  getScrambleForPieces(
    [],
    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],
    isOLLSolved
  );

export const generatePLLScramble = (): string | false =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],
    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],
    isCubeSolved,
    true
  );

export const generateFirstLookPLLScramble = (): string | false =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],
    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],
    isFirstLookPLLSolved,
    true
  );

export const generateSecondLookPLLScramble = (): string | false =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],
    [],
    isCubeSolved,
    true
  );
