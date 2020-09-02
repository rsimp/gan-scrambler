import { registerReducer } from "app/common/store";

import { RobotState } from "app/robot-widget/store/types";
import reducer from "app/robot-widget/store/reducer";

declare module "app/common/store" {
  interface ApplicationState {
    robot: RobotState;
  }
}

registerReducer("robot", reducer);
