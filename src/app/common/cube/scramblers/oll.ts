import getScrambleForPieces from "app/common/cube/libs/scramble-pieces";
import { Edges, Corners } from "app/common/cube/libs/cube";

export const generateOLLScramble = () =>
  getScrambleForPieces(
    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],

    [Edges.UR, Edges.UF, Edges.UL, Edges.UB],

    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],

    [Corners.URF, Corners.UFL, Corners.ULB, Corners.UBR],

    false,

    true
  );
