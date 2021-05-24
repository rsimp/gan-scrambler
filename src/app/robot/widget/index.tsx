import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import {
  BluetoothConnected,
  Bluetooth,
  BluetoothDisabled,
} from "@material-ui/icons";

import { detectBluetoothSupport } from "core/utils/feature-detection";

import { bluetoothDeviceSelected } from "app/robot/store/actions";
import { getRobotDevice } from "app/robot/store/selectors";
import { PRIMARY_SERVICE, DEVICE_INFO_SERVICE } from "app/robot/bluetooth";
import { IncompatibleBrowserDialog } from "app/incompatible-browser-dialoag";

export function RobotWidget(): JSX.Element {
  const dispatch = useDispatch();
  const robotDevice = useSelector(getRobotDevice);
  const isBluetoothSupported = detectBluetoothSupport();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  return (
    <>
      {isBluetoothSupported ? (
        <IconButton color="inherit" onClick={handleBluetoothClick}>
          {robotDevice ? <BluetoothConnected /> : <Bluetooth />}
        </IconButton>
      ) : (
        <IconButton className="text-error" onClick={openDialog}>
          <BluetoothDisabled />
        </IconButton>
      )}
      <IncompatibleBrowserDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </>
  );
}
