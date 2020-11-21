import {
  createEdgePermutationTable,
  createEdgeOrientationTable,
} from "app/common/cube/libs/move-table";

import Search from "app/common/cube/libs/search";

import { fiveSideMoves, Edges } from "app/common/cube/libs/cube";

export const CrossSearch = new Search(
  () => ({
    moveTables: [
      createEdgePermutationTable({
        name: "EdgePermutation",
        affected: [Edges.DB, Edges.DF, Edges.DL, Edges.DR],
      }),

      createEdgeOrientationTable({
        name: "EdgeOrientation",
        affected: [Edges.DB, Edges.DF, Edges.DL, Edges.DR],
      }),
    ],

    pruningTables: [["EdgePermutation"], ["EdgeOrientation"]],
  }),
  fiveSideMoves
);

export const crossSolver = (scramble: string): string | false =>
  CrossSearch.solve({ scramble });
