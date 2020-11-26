import getScrambleForPieces from "app/common/cube/libs/scramble-pieces";
import { Edges, Corners } from "app/common/cube/libs/cube";
import { isOLLSolved } from "app/common/cube/libs/cfop-criteria";

export const generateOLLScramble = (): string | false =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],
    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],
    isOLLSolved
  );
