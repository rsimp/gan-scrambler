import { getScrambleForPieces } from "app/common/cube/libs/scramble-pieces";
import { Edges, Corners } from "app/common/cube/libs/cube";
import { isCubeSolved } from "../libs/cfop-criteria";

export const generatePLLScramble = (needsRotation = true): string | false =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],
    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],
    [],
    [],
    isCubeSolved,
    needsRotation
  );
