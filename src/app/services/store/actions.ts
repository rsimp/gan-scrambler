import { createAction } from "@reduxjs/toolkit";
import { ServicesState } from "app/services/store/types";

const actionPrefix = "services";

interface ServiceRegistration<T extends keyof ServicesState> {
  key: T;
  value: ServicesState[T];
}

export const registerServices = createAction<Partial<ServicesState>>(
  `${actionPrefix}/register_services`
);

// the builtin createAction has poor typings for custom payload creators
// TODO submit PR to github or create util, this is pretty ugly
export const registerService = (<T extends keyof ServicesState>() => {
  const _actionCreator = createAction<ServiceRegistration<T>>(
    `${actionPrefix}/register_service`
  );
  const actionCreator = (key: T, value: ServicesState[T]) =>
    _actionCreator({ key, value });
  actionCreator.type = _actionCreator.type;
  actionCreator.match = _actionCreator.match;
  return actionCreator;
})();
