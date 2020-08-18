import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { registerRobot, unregisterRobot } from "app/device-widget/actions";
import { RobotState } from "app/device-widget/types";
import { payloadReducer, valueReducer } from "app/common/reducers";

export default combineReducers<RobotState>({
  device: createReducer<RobotState["device"]>(null, (builder) => {
    builder.addCase(registerRobot, payloadReducer);
    builder.addCase(unregisterRobot, valueReducer(null));
  }),
});
