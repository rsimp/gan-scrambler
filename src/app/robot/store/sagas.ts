import {
  call,
  put,
  take,
  takeEvery,
  select,
  race,
  delay,
} from "typed-redux-saga/macro";
import { eventChannel } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";

import { SagaIterator } from "core/redux/types";
import { enqueueSnackbar } from "core/snackbar/actions";
import { translate } from "core/utils/translation";
import { chunkReducer } from "core/utils/arrays";

import {
  robotDisconnected,
  robotConnected,
  bluetoothDeviceSelected,
  scrambleSubmitted,
} from "app/robot/store/actions";
import { appInitialized } from "app/main-screen/actions";
import { getRobotServer } from "app/robot/store/selectors";
import {
  ExperimentalBluetoothDevice,
  ExperimentalBluetooth,
} from "app/robot/types";

export const PRIMARY_SERVICE = 0xfff0;
const SCRAMBLE_CHARACTERISTIC = 0xfff3;
const ROBOT_STATUS_CHARACTERISTIC = 0xfff2;

export const DEVICE_INFO_SERVICE = 0x180a;
const MODEL_NUMBER_SERVICE = 0x2a24;

const moveMap: Record<string, number> = {
  R: 0,
  R2: 1,
  "R'": 2,
  F: 3,
  F2: 4,
  "F'": 5,
  D: 6,
  D2: 7,
  "D'": 8,
  L: 9,
  L2: 10,
  "L'": 11,
  B: 12,
  B2: 13,
  "B'": 14,
};

export class GANDeviceTypeError extends Error {
  modelNumber: string;
  constructor(message: string, modelNumber: string) {
    super(message);
    this.name = "GANDeviceTypeError";
    this.modelNumber = modelNumber;
  }
}

export function getGANEncoding(scramble: string): Uint8Array[] {
  return scramble
    .replace(/(\w)2/gi, "$1 $1") // for some reason the gan robot sometimes fails on double turns, just convert to singles
    .split(" ")
    .map((move) => moveMap[move])
    .reduce(chunkReducer(2), [])
    .map((moves) => moves[0] * 16 + (moves[1] ?? 15)) // encode every 2 moves to decimal representation of a hex value
    .reduce(chunkReducer(16), []) // robot can only take in 18 hex characters, so chunk on this value and do multiple writes if necessary
    .map((chunkedArr) => new Uint8Array(chunkedArr));
}

function* executeScramble({ payload: scramble }: PayloadAction<string>) {
  try {
    const robotServer = yield* select(getRobotServer);
    if (robotServer) {
      for (const scrambleChunk of getGANEncoding(scramble)) {
        yield* call(executeChunk, robotServer, scrambleChunk);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function* executeChunk(
  robotServer: BluetoothRemoteGATTServer,
  chunk: Uint8Array
) {
  const primaryService = yield* call(
    robotServer.getPrimaryService,
    PRIMARY_SERVICE
  );
  const scrambleExecuteCharacteristic = yield* call(
    primaryService.getCharacteristic,
    SCRAMBLE_CHARACTERISTIC
  );
  yield* call(scrambleExecuteCharacteristic.writeValue, chunk);
  const statusCharacteristic = yield* call(
    primaryService.getCharacteristic,
    ROBOT_STATUS_CHARACTERISTIC
  );

  let hasHadNonZeroValue = false;
  while (true) {
    const robotStatus = (yield* call(statusCharacteristic.readValue)).getUint8(
      0
    );
    if (hasHadNonZeroValue && robotStatus === 0) {
      break;
    }

    if (!hasHadNonZeroValue && robotStatus !== 0) {
      hasHadNonZeroValue = true;
    }
    yield* delay(10);
  }
}

export function* watchForScrambleSubmitted(): SagaIterator {
  yield* takeEvery(scrambleSubmitted, executeScramble);
}

function* handleBluetoothDeviceSelected({
  payload: device,
}: PayloadAction<BluetoothDevice>) {
  try {
    yield* call(connectToGANRobot, device);
    yield* put(robotConnected(device));
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
      console.log("bluetooth device couldn't connect");
    }
  }
}

function* connectToGANRobot(device: ExperimentalBluetoothDevice) {
  const server = device.gatt ? yield* call(device.gatt.connect) : null;
  if (!server) {
    throw new Error("Could not connect to Bluetooth Server");
  }
  const deviceInfoService = yield* call(
    server.getPrimaryService,
    DEVICE_INFO_SERVICE
  );
  const modelCharacteristic = yield* call(
    deviceInfoService.getCharacteristic,
    MODEL_NUMBER_SERVICE
  );
  const modelNumberValue = yield* call(modelCharacteristic.readValue);
  const modelNumber = new TextDecoder().decode(modelNumberValue);
  if (modelNumber.toUpperCase() !== "GAN ROBOTCUBE") {
    throw new GANDeviceTypeError(
      "Requested device is not a GAN Robot",
      modelNumber
    );
  }
}

export function* watchForBluetoothDeviceSelected(): SagaIterator {
  yield* takeEvery(bluetoothDeviceSelected, handleBluetoothDeviceSelected);
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
    robotConnectedAction: take(robotConnected),
  });

  if (result.disconnectEvent) {
    yield* put(robotDisconnected());
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

export function* watchForRobotConnected(): SagaIterator {
  yield* takeEvery(robotConnected, listenForDisconnect);
}

function* connectToKnownGANRobots(): SagaIterator<
  ExperimentalBluetoothDevice | false
> {
  const experimentalBluetooth = navigator?.bluetooth as ExperimentalBluetooth;
  if (!experimentalBluetooth || !experimentalBluetooth.getDevices) {
    return false;
  }

  const devices = yield* call(experimentalBluetooth.getDevices);
  const deviceChannel = eventChannel<ExperimentalBluetoothDevice>((emitter) => {
    for (const device of devices) {
      const abortController = new AbortController();
      device.addEventListener(
        "advertisementreceived",
        () => {
          abortController.abort();
          emitter(device);
        },
        { once: true }
      );
      device.watchAdvertisements({ signal: abortController.signal });
    }
    return () => {}; //eslint-disable-line
  });

  while (true) {
    const result = yield* race({
      connectableDevice: take(deviceChannel),
      registerAction: take(robotConnected),
    });

    if (result.registerAction) {
      deviceChannel.close();
      return false;
    } else if (result.connectableDevice) {
      try {
        yield* call(connectToGANRobot, result.connectableDevice);
        deviceChannel.close();
        return result.connectableDevice;
      } catch (e) {}
    }
  }
}

function* handleAppInitialized() {
  try {
    const device = yield* call(connectToKnownGANRobots);
    if (device) {
      yield* put(robotConnected(device));
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
  yield* call(handleAppInitialized);
}

export default [
  watchForScrambleSubmitted,
  watchForBluetoothDeviceSelected,
  watchForRobotConnected,
  watchForAppInitialized,
];
