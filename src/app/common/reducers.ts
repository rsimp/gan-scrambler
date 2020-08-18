import { PayloadAction } from "@reduxjs/toolkit";

export const payloadReducer = <S, P>(state: S, action: PayloadAction<P>): P => {
  return action.payload;
};

export const valueReducer = <T>(value: T): (() => T) => () => value;
