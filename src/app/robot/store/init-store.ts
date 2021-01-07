import { registerReducer, registerSagas } from "app/common/store";
import { RobotState } from "app/robot/store/types";

import reducer from "app/robot/store/reducer";
import sagas from "app/robot/store/sagas";

declare module "app/common/store" {
  interface ApplicationState {
    robot: RobotState;
  }
}

registerReducer("robot", reducer);
registerSagas(sagas);
