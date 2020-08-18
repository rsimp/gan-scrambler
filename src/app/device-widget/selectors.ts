import { ApplicationState } from "app/common/store";
import { RobotState } from "app/device-widget/types";

export const getRobotDevice = (state: ApplicationState): RobotState["device"] =>
  state.robot.device;
