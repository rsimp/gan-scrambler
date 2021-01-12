import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import {
  BluetoothConnected,
  Bluetooth,
  BluetoothDisabled,
} from "@material-ui/icons";

import { bluetoothDeviceSelected } from "app/robot/store/actions";
import { getRobotDevice } from "app/robot/store/selectors";
import { isBluetoothEnabledSelector } from "app/feature-detection/selectors";
import {
  PRIMARY_SERVICE,
  DEVICE_INFO_SERVICE,
} from "app/robot/bluetooth-utils";

export function RobotWidget(): JSX.Element {
  const dispatch = useDispatch();
  const robotDevice = useSelector(getRobotDevice);
  const isBluetoothEnabled = useSelector(isBluetoothEnabledSelector);

  const handleBluetoothClick = useCallback(async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: "GAN-" }],
        optionalServices: [PRIMARY_SERVICE, DEVICE_INFO_SERVICE],
      });
      dispatch(bluetoothDeviceSelected(device));
    } catch (e) {
      // throws DOMException if user cancels device request
      if (!(e instanceof DOMException)) console.error(e);
    }
  }, []);

  return isBluetoothEnabled ? (
    <IconButton color="inherit" onClick={handleBluetoothClick}>
      {robotDevice ? <BluetoothConnected /> : <Bluetooth />}
    </IconButton>
  ) : (
    <IconButton className="text-error">
      <BluetoothDisabled />
    </IconButton>
  );
}
