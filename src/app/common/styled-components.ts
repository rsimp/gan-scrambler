import styled from "styled-components/macro";

export const ButtonRow = styled.div.attrs({
  className:
    "flex flex-row w-full computer:children:flex-initial children:flex-1 children:ml-sm children:first:ml-0 children:w-40",
})``;

export const ContentContainer = styled.div.attrs({
  className:
    "flex flex-col m-med children:mt-med children:first:mt-0 computer:items-start",
})``;
