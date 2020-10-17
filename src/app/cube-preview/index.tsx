import React from "react";

import {
  doAlgorithm,
  getFaceletArray,
  // Edges,
  // Corners,
  // FaceletArrayFilter,
} from "app/common/cube/libs/cube";

export function createScramblePreview(scrambleCode: string): string {
  const cubeIndexes = doAlgorithm(scrambleCode);
  return getFaceletArray(cubeIndexes)
    .map((faceKey) => colorMap[faceKey])
    .reduce((acc, color) => acc.replace("{}", color), template);
}

interface CubePreviewProps {
  scrambleCode: string;
  type?: "cross" | "f2l" | "oll";
}

export function CubePreview(props: CubePreviewProps): JSX.Element {
  const svgString = createScramblePreview(props.scrambleCode);
  return (
    <div
      className="w-3/4 self-center"
      dangerouslySetInnerHTML={{ __html: svgString }}
    ></div>
  );
}

const colorMap: Record<string, string> = {
  U: "white",
  R: "red",
  F: "green",
  D: "yellow",
  L: "orange",
  B: "blue",
  G: "gray",
};

// const crossFilter = {
//   edges: [Edges.UB, Edges.UF, Edges.UR, Edges.UL],
// };

// const f2lFilter = {
//   edges: [
//     Edges.UB,
//     Edges.UF,
//     Edges.UR,
//     Edges.UL,
//     Edges.BL,
//     Edges.BR,
//     Edges.FL,
//     Edges.FR,
//   ],
//   corners: [Corners.UBR, Corners.UFL, Corners.ULB, Corners.URF],
// };

// const ollFilter = {
//   edges: [
//     Edges.UB,
//     Edges.UF,
//     Edges.UR,
//     Edges.UL,
//     Edges.BL,
//     Edges.BR,
//     Edges.FL,
//     Edges.FR,
//   ],
//   corners: [Corners.UBR, Corners.UFL, Corners.ULB, Corners.URF],
//   facelets: ["D"],
// };

const template = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 258 196" style="stroke-linejoin:round;">
  <g>
    <rect x="64" y="2" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="2" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="2" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="64" y="22" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="22" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="22" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="64" y="42" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="42" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="42" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="126" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="146" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="166" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="126" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="146" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="166" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="126" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="146" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="166" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="64" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="64" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="64" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="64" y="126" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="126" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="126" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="64" y="146" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="146" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="146" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="64" y="166" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="84" y="166" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="104" y="166" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="2" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="22" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="42" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="2" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="22" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="42" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="2" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="22" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="42" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="188" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="208" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="228" y="64" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="188" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="208" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="228" y="84" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="188" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="208" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
    <rect x="228" y="104" width="20" height="20" fill="{}" stroke="black"></rect>
  </g>
</svg>`;
