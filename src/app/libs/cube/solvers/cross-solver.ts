import {
  createEdgePermutationTable,
  createEdgeOrientationTable,
} from "app/libs/cube/libs/move-table";

import Search from "app/libs/cube/libs/search";

import { fiveSideMoves, Edges } from "app/libs/cube/libs/cube";

export const CrossSearch = new Search(
  () => ({
    moveTables: [
      createEdgePermutationTable({
        name: "EdgePermutation",
        affected: [Edges.UB, Edges.DB, Edges.BL, Edges.BR],
      }),

      createEdgeOrientationTable({
        name: "EdgeOrientation",
        affected: [Edges.UB, Edges.DB, Edges.BL, Edges.BR],
      }),
    ],

    pruningTables: [["EdgePermutation"], ["EdgeOrientation"]],
  }),
  fiveSideMoves
);

export const crossSolver = (scramble: string): string | false =>
  CrossSearch.solve({ scramble });
