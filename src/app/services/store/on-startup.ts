import { registerReducer } from "app/common/store";

import { ServicesState } from "app/services/store/types";
import reducer from "app/services/store/reducer";

declare module "app/common/store" {
  interface ApplicationState {
    services: ServicesState;
  }
}

registerReducer("services", reducer);
