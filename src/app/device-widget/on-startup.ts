import { registerReducer } from "app/common/store";

import { RobotState } from "app/device-widget/types";
import reducer from "app/device-widget/reducers";

declare module "app/common/store" {
  interface ApplicationState {
    robot: RobotState;
  }
}

registerReducer("robot", reducer);
