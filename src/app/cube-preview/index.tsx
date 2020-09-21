import React from "react";
import Cube from "cubejs";
import CubePreviewCreator from "cube-preview";

import { Scramble } from "app/common/cube/scramble";

export function createScramblePreview(scrambleCode: string): string {
  const cube = new Cube();
  cube.move(scrambleCode);
  return new CubePreviewCreator().svgString(cube.asString());
}

interface CubePreviewProps {
  scramble: Scramble;
}

export function CubePreview(props: CubePreviewProps): JSX.Element {
  const svgString = createScramblePreview(props.scramble.code);
  return (
    <div
      style={{ width: "50%" }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    ></div>
  );
}
