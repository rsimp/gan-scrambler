import tag from "classed.macro";

export const ButtonRow = tag.div`
  flex flex-row w-full computer:children:flex-initial children:flex-1 children:ml-med children:first:ml-0 children:w-10
`;

export const ContentContainer = tag.div`
  flex flex-col m-lg children:mt-lg children:first:mt-0 computer:items-start
`;
