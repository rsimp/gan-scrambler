import { CubeIndexes, Corners, Edges } from "app/common/cube/libs/cube";

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

export const isOLLSolved = (cubeState: CubeIndexes): boolean =>
  isF2LSolved &&
  arePiecesOriented(
    cubeState,
    [Corners.UBR, Corners.UFL, Corners.ULB, Corners.URF],
    [Edges.UB, Edges.UF, Edges.UL, Edges.UR]
  );

export const isCubeSolved = (cubeState: CubeIndexes): boolean =>
  isF2LSolved &&
  arePiecesPermutatedAndOriented(
    cubeState,
    [Corners.UBR, Corners.UFL, Corners.ULB, Corners.URF],
    [Edges.UB, Edges.UF, Edges.UL, Edges.UR]
  );
