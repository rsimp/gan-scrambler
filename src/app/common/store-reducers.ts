import { PayloadAction } from "@reduxjs/toolkit";

export const payloadReducer = <S, P>(state: S, action: PayloadAction<P>): P => {
  return action.payload;
};

export const mergeReducer = <S, P extends Partial<S>>(
  state: S,
  action: PayloadAction<P>
): S => {
  return { ...state, ...action.payload };
};

interface SetEntry<T> {
  key: string;
  value: T;
}

export const setReducer = <T>(
  state: Record<string, T>,
  action: PayloadAction<SetEntry<T>>
): Record<string, T> => {
  state[action.payload.key] = action.payload.value;
  return state;
};

export const valueReducer = <T>(value: T): (() => T) => () => value;
