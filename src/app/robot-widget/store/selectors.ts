import { ApplicationState } from "app/common/store";
import { RobotState } from "app/robot-widget/store/types";

export const getRobotDevice = (state: ApplicationState): RobotState["device"] =>
  state.robot.device;

export const getRobotServer = (
  state: ApplicationState
): BluetoothRemoteGATTServer | null => {
  const robotDevice = getRobotDevice(state);
  return robotDevice && robotDevice.gatt?.connected ? robotDevice.gatt : null;
};
