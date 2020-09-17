// for version 1.3.X
// fill in as needed

declare module "cubejs" {
  declare class Cube {
    constructor();
    move(scrambleCode: string): void;
    asString(): string;
  }
  export default Cube;
}
