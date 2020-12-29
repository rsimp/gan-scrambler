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

interface RegistryEntry<T, Tkey extends keyof T> {
  key: Tkey;
  value: T[Tkey];
}

export const registryReducer = <S>(
  state: S,
  action: PayloadAction<RegistryEntry<S, keyof S>>
): S => {
  state[action.payload.key] = action.payload.value;
  return state;
};

export const valueReducer = <T>(value: T): (() => T) => () => value;
