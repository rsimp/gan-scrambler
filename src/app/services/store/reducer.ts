import { createReducer } from "@reduxjs/toolkit";
import { ServicesState } from "app/services/store/types";
import { registryReducer, mergeReducer } from "app/common/store-reducers";
import { registerService, registerServices } from "app/services/store/actions";

export default createReducer<ServicesState>({}, (builder) => {
  builder.addCase(registerService, registryReducer);
  builder.addCase(registerServices, mergeReducer);
});
