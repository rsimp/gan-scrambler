import { createAction } from "@reduxjs/toolkit";

const actionPrefix = "robot";

export const registerRobot = createAction<BluetoothDevice>(
  `${actionPrefix}/register_robot`
);

export const unregisterRobot = createAction(`${actionPrefix}/unregister_robot`);

export const bluetoothDeviceSelected = createAction<BluetoothDevice>(
  `${actionPrefix}/bluetooth_device_selected`
);
