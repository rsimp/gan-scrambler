import React from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { BluetoothConnected, Bluetooth } from "@material-ui/icons";

import { ApplicationState } from "app/common/store";

import { unregisterRobot, registerRobot } from "app/robot/store/actions";
import { getRobotDevice } from "app/robot/store/selectors";
import { RobotState } from "app/robot/store/types";
import {
  requestBluetoothDevice,
  GANDeviceTypeError,
} from "app/robot/bluetooth-utils";

interface RobotWidgetProps {
  registerRobot: typeof registerRobot;
  unregisterRobot: typeof unregisterRobot;
  robotDevice?: RobotState["device"];
}

export function RobotWidget(props: RobotWidgetProps): JSX.Element {
  // TODO pull callback into useCallback hook
  // TODO pull async with dispatch into a saga
  return (
    <IconButton
      color="inherit"
      onClick={async () => {
        try {
          const device = await requestBluetoothDevice();
          props.registerRobot(device);
          device.addEventListener("gattserverdisconnected", () =>
            props.unregisterRobot()
          );
        } catch (error) {
          if (error instanceof GANDeviceTypeError) {
            // TODO show toast for trying to connect to incorrect GAN device
          } else {
            // TODO show toast for other errors
          }
          console.log(error);
        }
      }}
    >
      {props.robotDevice ? <BluetoothConnected /> : <Bluetooth />}
    </IconButton>
  );
}

export const ConnectedRobotWidget = connect(
  (state: ApplicationState) => ({
    robotDevice: getRobotDevice(state),
  }),
  {
    registerRobot,
    unregisterRobot,
  }
)(RobotWidget);
