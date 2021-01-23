import { registerReducer } from "core/redux/store";

import reducer from "app/feature-detection/reducer";

declare module "core/redux/store" {
  interface ApplicationState {
    featureDetection: Record<string, boolean>;
  }
}

registerReducer("featureDetection", reducer);
