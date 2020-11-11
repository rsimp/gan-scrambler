import {
  CubeIndexes,
  Centers,
  Edges,
  Corners,
  identity,
  doEdgeMove,
  doCornerMove,
  doCenterMove,
} from "./cube";

const centerFacelets = ["U", "R", "F", "D", "L", "B"];

const cornerFacelets = [
  ["U8", "R0", "F2"],
  ["U6", "F0", "L2"],
  ["U0", "L0", "B2"],
  ["U2", "B0", "R2"],
  ["D2", "F8", "R6"],
  ["D0", "L8", "F6"],
  ["D6", "B8", "L6"],
  ["D8", "R8", "B6"],
];

const edgeFacelets = [
  ["U5", "R1"],
  ["U7", "F1"],
  ["U3", "L1"],
  ["U1", "B1"],
  ["D5", "R7"],
  ["D1", "F7"],
  ["D3", "L7"],
  ["D7", "B7"],
  ["F5", "R3"],
  ["F3", "L5"],
  ["B5", "L3"],
  ["B3", "R5"],
];

const { F, R, U, B, L, D } = Centers;
const { UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR } = Edges;
const { URF, UFL, ULB, UBR, DFR, DLF, DBL, DBR } = Corners;

export const rotations: Record<string, CubeIndexes> = {
  x: {
    center: [F, 1, D, B, 4, U],
    cp: [DFR, DLF, UFL, URF, DBR, DBL, ULB, UBR],
    co: [2, 1, 2, 1, 1, 2, 1, 2],
    ep: [FR, DF, FL, UF, BR, DB, BL, UB, DR, DL, UL, UR],
    eo: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
  },
  y: {
    center: [0, B, R, 3, F, L],
    cp: [UBR, URF, UFL, ULB, DBR, DFR, DLF, DBL],
    co: identity.co,
    ep: [3, 0, 1, 2, 7, 4, 5, 6, 11, 8, 9, 10],
    eo: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  },
  z: {
    center: [L, U, 2, R, D, 5],
    cp: [UFL, DLF, DBL, ULB, URF, DFR, DBR, UBR],
    co: [1, 2, 1, 2, 2, 1, 2, 1],
    ep: [UL, FL, DF, BL, UR, FR, DR, BR, UF, DL, DB, UB],
    eo: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

const getFaceletIndex = (facelet: string) =>
  centerFacelets.indexOf(facelet[0]) * 9 + Number(facelet[1]);
const getCornerFacelet = (
  cube: CubeIndexes,
  cornerIndex: number,
  orientationIndex: number
) => {
  return cornerFacelets[cube.cp[cornerIndex]][
    mod(orientationIndex - cube.co[cornerIndex], 3)
  ][0];
};

const getEdgeFacelet = (
  cube: CubeIndexes,
  edgeIndex: number,
  orientationIndex: number
) =>
  edgeFacelets[cube.ep[edgeIndex]][
    mod(orientationIndex - cube.eo[edgeIndex], 2)
  ][0];

export interface FaceletArrayFilter {
  edges?: number[];
  corners?: number[];
  facelets?: string[];
}

export interface FaceletArrayOptions {
  filter?: FaceletArrayFilter;
  rotations?: string;
}

export const getFaceletArray = (
  cube: CubeIndexes,
  options: FaceletArrayOptions = {}
): string[] => {
  const facelets: string[] = [];

  if (options.rotations) {
    cube = doRotations(cube, options.rotations);
  }

  // add center facelets to array
  centerFacelets.forEach((facelet, centerIndex) => {
    facelets[9 * cube.center[centerIndex] + 4] = facelet;
  });

  // add corner cubie facelets
  cornerFacelets.forEach((corner, cornerIndex) => {
    corner.forEach((facelet, orientation) => {
      const faceletIndex = getFaceletIndex(facelet);
      const faceletValue = getCornerFacelet(cube, cornerIndex, orientation);

      facelets[faceletIndex] =
        !options.filter ||
        options.filter.corners?.includes(cube.cp[cornerIndex]) ||
        options.filter.facelets?.includes(faceletValue)
          ? faceletValue
          : "G";
    });
  });

  // add edge cubie facelets
  edgeFacelets.forEach((edge, edgeIndex) => {
    edge.forEach((facelet, orientation) => {
      const faceletIndex = getFaceletIndex(facelet);
      const faceletValue = getEdgeFacelet(cube, edgeIndex, orientation);

      facelets[faceletIndex] =
        !options.filter ||
        options.filter.edges?.includes(cube.ep[edgeIndex]) ||
        options.filter.facelets?.includes(faceletValue)
          ? faceletValue
          : "G";
    });
  });

  return facelets;
};

const powers: Record<string, number> = {
  "": 1,
  2: 2,
  "'": 3,
};

export const doRotations = (
  cube: CubeIndexes,
  rotationAlg: string
): CubeIndexes => {
  return rotationAlg
    .split(" ")
    .map((rotation: string) => ({
      move: rotations[rotation.charAt(0)],
      pow: powers[rotation.charAt(1)],
    }))
    .reduce((newCube, { move, pow }) => {
      for (let i = 0; i < pow; i++) {
        newCube = {
          center: doCenterMove(newCube.center, move),
          ...doEdgeMove(newCube, move),
          ...doCornerMove(newCube, move),
        };
      }
      return newCube;
    }, cube);
};
