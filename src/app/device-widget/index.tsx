import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "app/common/store";

import { unregisterRobot, registerRobot } from "app/device-widget/actions";
import { getRobotDevice } from "app/device-widget/selectors";
import { RobotState } from "app/device-widget/types";

import styles from "app/device-widget/styles.module.css";

const DEVICE_INFO_SERVICE_UUID = 0x180a;
const MODEL_NUMBER_SERVICE_UUID = 0x2a24;

interface DeviceWidgetProps {
  registerRobot: typeof registerRobot;
  unregisterRobot: typeof unregisterRobot;
  robot?: RobotState["device"];
}

export function DeviceWidget(props: DeviceWidgetProps): JSX.Element {
  const renderConnectButton = () => (
    <button
      onClick={async () => {
        try {
          const device = await navigator.bluetooth.requestDevice({
            filters: [
              { namePrefix: "GAN" },
              { services: [DEVICE_INFO_SERVICE_UUID] },
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
              //show error message
            }
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Connect
    </button>
  );

  const render = () => (
    <div className={styles.setupContainer}>
      <span>
        {"Device: "}
        {props.robot ? props.robot.name : renderConnectButton()}
      </span>
    </div>
  );

  return render();
}

export const DeviceWidgetContainer = connect(
  (state: ApplicationState) => ({
    robot: getRobotDevice(state),
  }),
  {
    registerRobot,
    unregisterRobot,
  }
)(DeviceWidget);
