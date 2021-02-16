export function detectBluetoothSupport(): boolean {
  return Boolean(navigator.bluetooth && navigator.bluetooth.requestDevice);
}
