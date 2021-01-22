import { registerReducer } from "app/libs/store";

import reducer from "app/feature-detection/reducer";

declare module "app/common/store" {
  interface ApplicationState {
    featureDetection: Record<string, boolean>;
  }
}

registerReducer("featureDetection", reducer);
