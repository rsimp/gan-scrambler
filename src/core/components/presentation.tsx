import tag from "classed.macro";

export const ButtonRow = tag.div`
  flex flex-row w-full 
  children:flex computer:children:flex-initial children:flex-1 
  children:ml-med children:first:ml-0 
  children:w-10 children:px-0
`;

export const ContentContainer = tag.div`
  flex flex-col m-lg children:mt-lg children:first:mt-0 computer:items-start
`;

export const Tooltip = tag.div`tooltip bg-tooltip text-on-tooltip round`;
