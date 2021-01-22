import { registerReducer, registerSagas } from "app/libs/store";
import { RobotState } from "app/robot/store/types";

import reducer from "app/robot/store/reducer";
import sagas from "app/robot/store/sagas";

declare module "app/libs/store" {
  interface ApplicationState {
    robot: RobotState;
  }
}

registerReducer("robot", reducer);
registerSagas(sagas);
