import {
    createEdgePermutationTable,
    createEdgeOrientationTable,
  } from 'app/common/cube/libs/move-table';

import Search from 'app/common/cube/libs/search';

import { fiveSideMoves } from "app/common/cube/libs/cube";

export const CrossSearch = new Search(() => ({
moveTables: [
    createEdgePermutationTable({
    name: 'EdgePermutation',
    affected: [4, 5, 6, 7],
    }),

    createEdgeOrientationTable({
    name: 'EdgeOrientation',
    affected: [4, 5, 6, 7],
    }),
],

pruningTables: [['EdgePermutation'], ['EdgeOrientation']],
}), fiveSideMoves);
  
export const crossSolver = (scramble: string) => CrossSearch.solve({ scramble });  