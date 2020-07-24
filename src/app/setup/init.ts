import { registerReducer } from "app/common/store";

import { RobotState } from "app/setup/types";
import reducer from "app/setup/reducers";

declare module "app/common/store" {
  interface ApplicationState {
    robot: RobotState;
  }
}

registerReducer("robot", reducer);
