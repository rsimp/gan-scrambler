import { registerReducer } from "app/common/store";

import { RobotState } from "app/robot/store/types";
import reducer from "app/robot/store/reducer";

declare module "app/common/store" {
  interface ApplicationState {
    robot: RobotState;
  }
}

registerReducer("robot", reducer);
