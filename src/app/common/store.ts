import { Reducer } from "redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { SagaIterator } from "redux-saga";
import { call, spawn, delay } from "redux-saga/effects";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApplicationState {}
const reducerRegistry: { [key: string]: Reducer } = {};

export function registerReducer<TKey extends keyof ApplicationState>(
  key: TKey,
  reducer: Reducer<ApplicationState[TKey]>
): void {
  reducerRegistry[key] = reducer;
}

export type Saga = (...args: unknown[]) => SagaIterator;
const sagaRegistry: Saga[] = [];

export function registerSagas(sagas: Saga[]): void {
  sagaRegistry.push(...sagas);
}

function* makeRestartable(saga: Saga) {
  while (true) {
    try {
      yield call(saga);
      console.error("Unexpected root saga termination", saga);
    } catch (e) {
      console.error("Saga error, the saga will be restarted", e);
    }
    yield delay(500);
  }
}

function* rootSaga() {
  yield sagaRegistry.map((saga) => spawn(makeRestartable, saga));
}

export function createStore(): EnhancedStore {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: reducerRegistry,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
}
