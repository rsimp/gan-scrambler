import React from "react";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import { BluetoothConnected, Bluetooth } from "@material-ui/icons";

import { ApplicationState } from "app/common/store";

import { unregisterRobot, registerRobot } from "app/robot-widget/store/actions";
import { getRobotDevice } from "app/robot-widget/store/selectors";
import { RobotState } from "app/robot-widget/store/types";

const DEVICE_INFO_SERVICE_UUID = 0x180a;
const MODEL_NUMBER_SERVICE_UUID = 0x2a24;

const SCRAMBLE_SERVICE_UUID = 0xfff0;

interface RobotWidgetProps {
  registerRobot: typeof registerRobot;
  unregisterRobot: typeof unregisterRobot;
  robotDevice?: RobotState["device"];
}

export function RobotWidget(props: RobotWidgetProps): JSX.Element {
  // TODO pull callback into useCallback hook
  // TODO pull async with dispatch into a saga
  return (
    <div className="flex-row">
      <IconButton
        color="inherit"
        onClick={async () => {
          try {
            const device = await navigator.bluetooth.requestDevice({
              filters: [{ namePrefix: "GAN" }],
              optionalServices: [
                SCRAMBLE_SERVICE_UUID,
                DEVICE_INFO_SERVICE_UUID,
              ],
            });
            const server = await device.gatt?.connect();
            if (server) {
              const deviceInfoService = await server.getPrimaryService(
                DEVICE_INFO_SERVICE_UUID
              );
              const modelCharacteristic = await deviceInfoService.getCharacteristic(
                MODEL_NUMBER_SERVICE_UUID
              );
              const modelNumberValue = await modelCharacteristic.readValue();
              const modelNumber = new TextDecoder().decode(modelNumberValue);
              if (modelNumber.toUpperCase() === "GAN ROBOTCUBE") {
                device.addEventListener("gattserverdisconnected", () =>
                  props.unregisterRobot()
                );
                props.registerRobot(device);
              } else {
                //TODO show error message for connecting to wrong type of GAN device
              }
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {props.robotDevice ? <BluetoothConnected /> : <Bluetooth />}
      </IconButton>
    </div>
  );
}

export const RobotWidgetContainer = connect(
  (state: ApplicationState) => ({
    robotDevice: getRobotDevice(state),
  }),
  {
    registerRobot,
    unregisterRobot,
  }
)(RobotWidget);
