import React from "react";

import { doAlgorithm, Edges, Corners } from "app/common/cube/libs/cube";
import {
  getFaceletArray,
  FaceletArrayFilter,
} from "app/common/cube/libs/cube-preview";

interface CubePreviewProps {
  scrambleCode: string;
  type?: string;
  colorMap?: Record<string, string>;
}

export function CubePreview(props: CubePreviewProps): JSX.Element {
  const filter = props.type ? filters[props.type] : undefined;
  const cubeIndexes = doAlgorithm(props.scrambleCode);
  const colorMap = props.colorMap ?? defaultColorMap;
  const svgString = getFaceletArray(cubeIndexes, {
    filter,
  })
    .map((faceKey) => colorMap[faceKey])
    .reduce((acc, color) => acc.replace("{}", color), template);

  return (
    <div
      className="w-3/4 self-center"
      dangerouslySetInnerHTML={{ __html: svgString }}
    ></div>
  );
}

const defaultColorMap: Record<string, string> = {
  U: "white",
  R: "red",
  F: "green",
  D: "yellow",
  L: "orange",
  B: "blue",
  G: "gray",
};

const crossFilter = {
  edges: [Edges.DB, Edges.DF, Edges.DR, Edges.DL],
};

const f2lFilter = {
  edges: [
    Edges.DB,
    Edges.DF,
    Edges.DR,
    Edges.DL,
    Edges.BL,
    Edges.BR,
    Edges.FL,
    Edges.FR,
  ],
  corners: [Corners.DBR, Corners.DLF, Corners.DBL, Corners.DFR],
};

const ollFilter = {
  edges: [
    Edges.DB,
    Edges.DF,
    Edges.DR,
    Edges.DL,
    Edges.BL,
    Edges.BR,
    Edges.FL,
    Edges.FR,
  ],
  corners: [Corners.DBR, Corners.DLF, Corners.DBL, Corners.DFR],
  facelets: ["U"],
};

const filters: Record<string, FaceletArrayFilter> = {
  cross: crossFilter,
  f2l: f2lFilter,
  oll: ollFilter,
};

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
