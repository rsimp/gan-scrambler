import { createAction } from "@reduxjs/toolkit";

const actionPrefix = "setup";

export const registerRobot = createAction<BluetoothDevice>(
  `${actionPrefix}/register_robot`
);

export const unregisterRobot = createAction(`${actionPrefix}/unregister_robot`);
