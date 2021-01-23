import { chunkReducer } from "core/array-helpers";

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
      for (const scrambleChunk of getGANEncoding(scramble)) {
        await executeChunk(robotServer, scrambleChunk);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const executeChunk = (
  robotServer: BluetoothRemoteGATTServer,
  chunk: Uint8Array
): Promise<void> => {
  return new Promise(async (resolve) => {
    const primaryService = await robotServer.getPrimaryService(PRIMARY_SERVICE);
    const scrambleExecuteCharacteristic = await primaryService.getCharacteristic(
      SCRAMBLE_CHARACTERISTIC
    );
    await scrambleExecuteCharacteristic.writeValue(chunk);
    const statusCharacteristic = await primaryService.getCharacteristic(
      ROBOT_STATUS_CHARACTERISTIC
    );

    const waitUntilSequenceFinished = async (hasHadNonZeroValue = false) => {
      setTimeout(async () => {
        const robotStatus = (await statusCharacteristic.readValue()).getUint8(
          0
        );
        if (hasHadNonZeroValue && robotStatus === 0) {
          resolve();
          return;
        }

        if (!hasHadNonZeroValue && robotStatus !== 0) {
          hasHadNonZeroValue = true;
        }

        waitUntilSequenceFinished(hasHadNonZeroValue);
      }, 10);
    };
    waitUntilSequenceFinished(false);
  });
};

export class GANDeviceTypeError extends Error {
  modelNumber: string;
  constructor(message: string, modelNumber: string) {
    super(message);
    this.name = "GANDeviceTypeError";
    this.modelNumber = modelNumber;
  }
}

export const requestBluetoothDevice = async (): Promise<BluetoothDevice> => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: "GAN-" }],
    optionalServices: [PRIMARY_SERVICE, DEVICE_INFO_SERVICE],
  });
  await connectToGANRobot(device);
  return device;
};

export const connectToGANRobot = async (
  device: ExperimentalBluetoothDevice
): Promise<void> => {
  const server = await device.gatt?.connect();
  if (!server) {
    throw new Error("Could not connect to Bluetooth Server");
  }
  const deviceInfoService = await server.getPrimaryService(DEVICE_INFO_SERVICE);
  const modelCharacteristic = await deviceInfoService.getCharacteristic(
    MODEL_NUMBER_SERVICE
  );
  const modelNumberValue = await modelCharacteristic.readValue();
  const modelNumber = new TextDecoder().decode(modelNumberValue);
  if (modelNumber.toUpperCase() !== "GAN ROBOTCUBE") {
    throw new GANDeviceTypeError(
      "Requested device is not a GAN Robot",
      modelNumber
    );
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

export const connectToKnownGANRobots = (): Promise<
  ExperimentalBluetoothDevice | false
> => {
  return new Promise(async (resolve) => {
    const experimentalBluetooth = navigator?.bluetooth as ExperimentalBluetooth;
    if (!experimentalBluetooth || !experimentalBluetooth.getDevices) {
      resolve(false);
      return;
    }
    const devices = await experimentalBluetooth.getDevices();
    for (const device of devices) {
      const abortController = new AbortController();
      device.addEventListener(
        "advertisementreceived",
        async () => {
          abortController.abort();
          try {
            await connectToGANRobot(device);
            resolve(device);
          } catch (e) {}
        },
        { once: true }
      );
      await device.watchAdvertisements({ signal: abortController.signal });
    }
  });
};
