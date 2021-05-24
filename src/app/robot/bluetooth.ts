import {
  ExperimentalBluetooth,
  ExperimentalBluetoothDevice,
} from "app/robot/types";

export const PRIMARY_SERVICE = 0xfff0;
export const SCRAMBLE_CHARACTERISTIC = 0xfff3;
export const ROBOT_STATUS_CHARACTERISTIC = 0xfff2;

export const DEVICE_INFO_SERVICE = 0x180a;
export const MODEL_NUMBER_SERVICE = 0x2a24;

// These are needed as chrome will not allow the saga to call directly
export function getDevices(
  bluetooth: ExperimentalBluetooth
): Promise<ExperimentalBluetoothDevice[]> {
  return bluetooth.getDevices ? bluetooth.getDevices() : Promise.resolve([]);
}

export function connect(
  device: ExperimentalBluetoothDevice
): Promise<BluetoothRemoteGATTServer | undefined> {
  return device.gatt ? device.gatt.connect() : Promise.resolve(undefined);
}

export function getPrimaryService(
  server: BluetoothRemoteGATTServer,
  serviceId: number
): Promise<BluetoothRemoteGATTService> {
  return server.getPrimaryService(serviceId);
}

export function getCharacteristic(
  service: BluetoothRemoteGATTService,
  characteristicId: number
): Promise<BluetoothRemoteGATTCharacteristic> {
  return service.getCharacteristic(characteristicId);
}

export function readValue(
  characteristic: BluetoothRemoteGATTCharacteristic
): Promise<DataView> {
  return characteristic.readValue();
}

export function writeValue(
  characteristic: BluetoothRemoteGATTCharacteristic,
  value: BufferSource
): Promise<void> {
  return characteristic.writeValue(value);
}
