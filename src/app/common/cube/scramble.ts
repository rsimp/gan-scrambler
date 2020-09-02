const cubeFaces = ["F", "R", "U", "B", "L", "D"];
const moveModifier = ["", "2", "'"];
const moveMap: Record<string, string> = {
  R: "0",
  R2: "1",
  "R'": "2",
  F: "3",
  F2: "4",
  "F'": "5",
  D: "6",
  D2: "7",
  "D'": "8",
  L: "9",
  L2: "a",
  "L'": "b",
  B: "c",
  B2: "d",
  "B'": "e",
};

function getRandom<T>(arr: Array<T>) {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
}

export interface Scramble {
  code: string;
  GANEncoding: string;
}

export function generateScramble(): Scramble {
  // TODO replace moveList with "cube-scrambler" npm package
  let lastMove = "";
  const moveList = [...Array(24)].map(() => {
    lastMove = getRandom(
      cubeFaces.filter((move) => move !== lastMove && move !== "F")
    );
    const modifier = getRandom(moveModifier);
    return lastMove + modifier;
  });
  return {
    code: moveList.join(" "),
    GANEncoding: moveList.map((move) => moveMap[move]).join(""),
  };
}
