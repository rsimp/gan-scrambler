import { getScrambleForPieces } from "app/common/cube/libs/scramble-pieces";
import { Edges, Corners } from "app/common/cube/libs/cube";

export const generatePLLScramble = (): string | false =>
  getScrambleForPieces(
    [Edges.DR, Edges.DF, Edges.DL, Edges.DB],

    [Corners.DFR, Corners.DLF, Corners.DBL, Corners.DBR],

    [],

    []
  );
