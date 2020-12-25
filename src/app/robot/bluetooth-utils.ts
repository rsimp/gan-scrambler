import { chunkReducer } from "app/common/array-reducers";

const SCRAMBLE_SERVICE_UUID = 0xfff0;
const SCRAMBLE_CHARACTERISTIC_UUID = 0xfff3;

const DEVICE_INFO_SERVICE_UUID = 0x180a;
const MODEL_NUMBER_SERVICE_UUID = 0x2a24;

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

export const executeScramble = async (
  robotServer: BluetoothRemoteGATTServer | null,
  scramble: string
): Promise<void> => {
  try {
    if (robotServer) {
      const scrambleService = await robotServer.getPrimaryService(
        SCRAMBLE_SERVICE_UUID
      );
      const scrambleExecuteCharacteristic = await scrambleService.getCharacteristic(
        SCRAMBLE_CHARACTERISTIC_UUID
      );

      const chunkedValues = getGANEncoding(scramble);
      console.log(chunkedValues);
      await scrambleExecuteCharacteristic.writeValue(chunkedValues[0]);
      if (chunkedValues[1]) {
        // FIXME this is a dirty hack, really we need to be polling robot
        // every 50 ms to see if the last chunk has finished
        setTimeout(
          () => scrambleExecuteCharacteristic.writeValue(chunkedValues[1]),
          5000
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export class GANDeviceTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GANDeviceTypeError";
  }
}

export const requestBluetoothDevice = async (): Promise<BluetoothDevice> => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: "GAN-" }],
    optionalServices: [SCRAMBLE_SERVICE_UUID, DEVICE_INFO_SERVICE_UUID],
  });
  await connectToGANRobot(device);
  return device;
};

const connectToGANRobot = async (
  device: ExperimentalBluetoothDevice
): Promise<void> => {
  const server = await device.gatt?.connect();
  if (!server) {
    throw new Error("Could not connect to Bluetooth Server");
  }
  const deviceInfoService = await server.getPrimaryService(
    DEVICE_INFO_SERVICE_UUID
  );
  const modelCharacteristic = await deviceInfoService.getCharacteristic(
    MODEL_NUMBER_SERVICE_UUID
  );
  const modelNumberValue = await modelCharacteristic.readValue();
  const modelNumber = new TextDecoder().decode(modelNumberValue);
  if (modelNumber.toUpperCase() !== "GAN ROBOTCUBE") {
    throw new GANDeviceTypeError("Requested device is not a GAN Robot");
  }
};

interface ExperimentalBluetoothDevice
  extends Omit<BluetoothDevice, "addEventListener"> {
  watchAdvertisements: (options?: { signal: AbortSignal }) => Promise<void>;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    useCapture?: boolean | { once: boolean }
  ): void;
}

interface ExperimentalBluetooth extends Bluetooth {
  getDevices?: () => ExperimentalBluetoothDevice[];
}

export class ExperimentalFeatureNotSupported extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExperimentalFeatureNotSupported";
  }
}

export const connectToKnownGANRobots = (): Promise<
  ExperimentalBluetoothDevice
> => {
  return new Promise(async (resolve) => {
    const experimentalBluetooth = navigator.bluetooth as ExperimentalBluetooth;
    if (!experimentalBluetooth.getDevices) {
      throw new ExperimentalFeatureNotSupported("getDevices not supported");
    }
    const devices = await experimentalBluetooth.getDevices();
    for (const device of devices) {
      const abortController = new AbortController();
      device.addEventListener(
        "advertisementreceived",
        async () => {
          abortController.abort();
          await connectToGANRobot(device);
          resolve(device);
        },
        { once: true }
      );
      await device.watchAdvertisements({ signal: abortController.signal });
    }
  });
};
