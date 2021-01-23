import { ApplicationState } from "core/redux/store";

const isFeatureEnabled = (feature: string) => (
  state: ApplicationState
): boolean => Boolean(state.featureDetection[feature]);

export const isBluetoothEnabledSelector = isFeatureEnabled("bluetooth");
