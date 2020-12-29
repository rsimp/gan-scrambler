import { ApplicationState } from "app/common/store";
import { ServicesState } from "app/services/store/types";

export const getService = <T extends keyof ServicesState>(
  state: ApplicationState,
  serviceName: T
): ServicesState[T] => state.services[serviceName];
