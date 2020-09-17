import Cube from "cubejs";
import CubePreview from "cube-preview";

export function createScramblePreview(scrambleCode: string): string {
  const cube = new Cube();
  cube.move(scrambleCode);
  return new CubePreview().svgString(cube.asString());
}
