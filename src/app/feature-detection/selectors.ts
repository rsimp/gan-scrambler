import { ApplicationState } from "app/common/store";

const isFeatureEnabled = (feature: string) => (
  state: ApplicationState
): boolean => Boolean(state.featureDetection[feature]);

export const isBluetoothEnabledSelector = isFeatureEnabled("bluetooth");
