import { createAction } from "@reduxjs/toolkit";

const actionPrefix = "bluetooth";

export const robotConnected = createAction<BluetoothDevice>(
  `${actionPrefix}/robot/connected`
);

export const robotDisconnected = createAction(
  `${actionPrefix}/robot/disconnected`
);

export const bluetoothDeviceSelected = createAction<BluetoothDevice>(
  `${actionPrefix}/device_selected`
);

export const scrambleSubmitted = createAction<string>(
  `${actionPrefix}/robot/scramble_submitted`
);
