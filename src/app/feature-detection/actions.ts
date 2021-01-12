import { createAction } from "@reduxjs/toolkit";

export const enableFeature = createAction(
  "feature/enable-feature",
  (feature: string) => ({
    payload: {
      key: feature,
      value: true,
    },
  })
);
