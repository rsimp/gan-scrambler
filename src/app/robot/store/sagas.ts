import { call, put, take, race, takeEvery } from "typed-redux-saga/macro";
import { eventChannel, SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";

import { enqueueSnackbar } from "core/snackbar/actions";
import { translate } from "core/utils/translation";
import {
  unregisterRobot,
  registerRobot,
  bluetoothDeviceSelected,
} from "app/robot/store/actions";
import { appInitialized } from "app/main-screen/actions";
import {
  connectToGANRobot,
  connectToKnownGANRobots,
  GANDeviceTypeError,
} from "app/robot/bluetooth-utils";

function* bluetoothDeviceSelectedHandler({
  payload: device,
}: PayloadAction<BluetoothDevice>) {
  try {
    yield* call(connectToGANRobot, device);
    yield* put(registerRobot(device));
    yield* put(
      enqueueSnackbar(
        translate("robot.snackbar.connected", {
          deviceName: device.name as string,
        }),
        { variant: "success" }
      )
    );
  } catch (e) {
    if (e instanceof GANDeviceTypeError) {
      yield* put(
        enqueueSnackbar(
          translate("robot.snackbar.wrongDevice", {
            deviceName: device.name as string,
            modelNumber: e.modelNumber,
          }),
          {
            variant: "error",
          }
        )
      );
    } else {
      console.log("couldn't connect");
    }
  }
}

export function* watchForBluetoothDeviceSelected(): SagaIterator {
  yield* takeEvery(bluetoothDeviceSelected, bluetoothDeviceSelectedHandler);
}

function* listenForDisconnect({
  payload: device,
}: PayloadAction<BluetoothDevice>) {
  const disconnectChannel = eventChannel((emitter) => {
    device.addEventListener("gattserverdisconnected", emitter);
    return () => {
      device.removeEventListener("gattserverdisconnected", emitter);
    };
  });

  const result = yield* race({
    disconnectEvent: take(disconnectChannel),
    registerAction: take(registerRobot),
    unregisterAction: take(unregisterRobot),
  });

  if (result.disconnectEvent) {
    yield* put(unregisterRobot());
    yield* put(
      enqueueSnackbar(
        translate("robot.snackbar.disconnected", {
          deviceName: device.name as string,
        }),
        {
          variant: "error",
        }
      )
    );
  }
  disconnectChannel.close();
}

export function* watchForRegisterRobot(): SagaIterator {
  yield* takeEvery(registerRobot, listenForDisconnect);
}

function* appInitializedHandler() {
  try {
    const device = yield* call(connectToKnownGANRobots);
    if (device) {
      yield* put(registerRobot(device));
      yield* put(
        enqueueSnackbar(
          translate("robot.snackbar.connected", {
            deviceName: device.name as string,
          }),
          { variant: "success" }
        )
      );
    }
  } catch (e) {
    console.error(e);
  }
}

export function* watchForAppInitialized(): SagaIterator {
  yield* take(appInitialized);
  yield* call(appInitializedHandler);
}

export default [
  watchForBluetoothDeviceSelected,
  watchForRegisterRobot,
  watchForAppInitialized,
];
