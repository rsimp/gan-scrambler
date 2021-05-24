export interface ExperimentalBluetoothDevice
  extends Omit<BluetoothDevice, "addEventListener"> {
  watchAdvertisements: (options?: { signal: AbortSignal }) => Promise<void>;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    useCapture?: boolean | { once: boolean }
  ): void;
}

export interface ExperimentalBluetooth extends Bluetooth {
  getDevices?: () => Promise<ExperimentalBluetoothDevice[]>;
}
