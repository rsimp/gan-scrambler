import { CubeIndexes } from "./cube";

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
}

export const getFaceletArray = (
  cube: CubeIndexes,
  options: FaceletArrayOptions = {}
): string[] => {
  const facelets: string[] = [];

  // add center facelets to array
  centerFacelets.forEach((facelet, centerIndex) => {
    facelets[9 * centerIndex + 4] = facelet;
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
