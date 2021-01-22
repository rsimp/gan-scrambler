import { Reducer } from "redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import createSagaMiddleware, { Saga, Task, SagaIterator } from "redux-saga";
import { call, spawn, delay, all } from "redux-saga/effects";

// ApplicationState will be dynamically populated from on-startup.ts scripts
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApplicationState {}
const reducerRegistry: Record<string, Reducer> = {};

export function registerReducer<TKey extends keyof ApplicationState>(
  key: TKey,
  reducer: Reducer<ApplicationState[TKey]>
): void {
  reducerRegistry[key] = reducer;
}

const sagaRegistry: Saga[] = [];

export function registerSagas(sagas: Saga[]): void {
  sagaRegistry.push(...sagas);
}

function* makeRestartable(saga: Saga): SagaIterator {
  try {
    yield call(saga);
  } catch (e) {
    console.error("Saga error, the saga will be restarted", e);
    yield delay(500);
    yield call(makeRestartable, saga);
  }
}

function* rootSaga() {
  yield all(sagaRegistry.map((saga) => spawn(makeRestartable, saga)));
}

interface AsyncStore extends EnhancedStore {
  runSaga: <S extends Saga>(saga: S, ...args: Parameters<S>) => Task;
}

export function createStore(): AsyncStore {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: reducerRegistry,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return {
    ...store,
    runSaga: sagaMiddleware.run,
  };
}
