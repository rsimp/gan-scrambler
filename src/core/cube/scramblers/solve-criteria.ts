import { CubeIndexes, Corners, Edges, doAlgorithm } from "core/cube/libs/cube";

const arePiecesPermutated = (
  cubeState: CubeIndexes,
  edges: number[],
  corners: number[]
) => {
  for (const edgeIdx of edges)
    if (cubeState.ep[edgeIdx] !== edgeIdx) return false;
  for (const cornerIdx of corners)
    if (cubeState.cp[cornerIdx] !== cornerIdx) return false;
  return true;
};

const arePiecesOriented = (
  cubeState: CubeIndexes,
  edges: number[],
  corners: number[]
) => {
  for (const edgeIdx of edges) if (cubeState.eo[edgeIdx] !== 0) return false;
  for (const cornerIdx of corners)
    if (cubeState.co[cornerIdx] !== 0) return false;
  return true;
};

const arePiecesPermutatedAndOriented = (
  cubeState: CubeIndexes,
  edges: number[],
  corners: number[]
) =>
  arePiecesOriented(cubeState, edges, corners) &&
  arePiecesPermutated(cubeState, edges, corners);

export const isCrossSolved = (cubeState: CubeIndexes): boolean =>
  arePiecesPermutatedAndOriented(
    cubeState,
    [Edges.DB, Edges.DF, Edges.DL, Edges.DR],
    []
  );

export const isTopCrossSolved = (cubeState: CubeIndexes): boolean =>
  arePiecesPermutatedAndOriented(
    cubeState,
    [Edges.DB, Edges.DF, Edges.DL, Edges.DR],
    []
  );

export const isF2LSolved = (cubeState: CubeIndexes): boolean =>
  isCrossSolved(cubeState) &&
  arePiecesPermutatedAndOriented(
    cubeState,
    [Edges.BL, Edges.BR, Edges.FL, Edges.FR],
    [Corners.DBL, Corners.DBR, Corners.DFR, Corners.DLF]
  );

export const isFirstLookOLLSolved = (cubeState: CubeIndexes): boolean =>
  isF2LSolved(cubeState) &&
  arePiecesOriented(cubeState, [Edges.UB, Edges.UF, Edges.UL, Edges.UR], []);

export const isOLLSolved = (cubeState: CubeIndexes): boolean =>
  isF2LSolved(cubeState) &&
  arePiecesOriented(
    cubeState,
    [Edges.UB, Edges.UF, Edges.UL, Edges.UR],
    [Corners.UBR, Corners.UFL, Corners.ULB, Corners.URF]
  );

export const isFirstLookPLLSolved = (cubeState: CubeIndexes): boolean => {
  let rotation = 0;
  do {
    if (
      isOLLSolved(cubeState) &&
      arePiecesPermutated(
        cubeState,
        [],
        [Corners.UBR, Corners.UFL, Corners.ULB, Corners.URF]
      )
    )
      return true;
    cubeState = doAlgorithm("U", cubeState);
    rotation += 90;
  } while (rotation < 360);
  return false;
};

export const isCubeSolved = (cubeState: CubeIndexes): boolean =>
  isF2LSolved(cubeState) &&
  arePiecesPermutatedAndOriented(
    cubeState,
    [Edges.UB, Edges.UF, Edges.UL, Edges.UR],
    [Corners.UBR, Corners.UFL, Corners.ULB, Corners.URF]
  );
