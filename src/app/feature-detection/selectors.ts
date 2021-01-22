import { ApplicationState } from "app/libs/store";

const isFeatureEnabled = (feature: string) => (
  state: ApplicationState
): boolean => Boolean(state.featureDetection[feature]);

export const isBluetoothEnabledSelector = isFeatureEnabled("bluetooth");
