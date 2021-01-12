import { createReducer } from "@reduxjs/toolkit";
import { setReducer } from "app/common/store-reducers";
import { enableFeature } from "app/feature-detection/actions";

export default createReducer<Record<string, boolean>>({}, (builder) => {
  builder.addCase(enableFeature, setReducer);
});
