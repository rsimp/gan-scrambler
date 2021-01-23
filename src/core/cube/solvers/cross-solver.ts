import {
  createEdgePermutationTable,
  createEdgeOrientationTable,
} from "core/cube/libs/move-table";

import Search from "core/cube/libs/search";

import { fiveSideMoves, Edges } from "core/cube/libs/cube";

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
