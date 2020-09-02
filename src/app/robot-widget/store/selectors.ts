import { ApplicationState } from "app/common/store";
import { RobotState } from "app/robot-widget/store/types";

export const getRobotDevice = (state: ApplicationState): RobotState["device"] =>
  state.robot.device;
