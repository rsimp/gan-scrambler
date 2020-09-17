import React from "react";
import { Scramble } from "app/common/cube/scramble";
import { createScramblePreview } from "app/common/cube/preview";

interface CubePreviewProps {
  scramble: Scramble;
}

export function CubePreview(props: CubePreviewProps): JSX.Element {
  const svgString = createScramblePreview(props.scramble.code);
  return (
    <div
      style={{ width: "25%" }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    ></div>
  );
}
