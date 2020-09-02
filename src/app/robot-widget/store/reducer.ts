import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { registerRobot, unregisterRobot } from "app/robot-widget/store/actions";
import { RobotState } from "app/robot-widget/store/types";
import { payloadReducer, valueReducer } from "app/common/store-reducers";

export default combineReducers<RobotState>({
  device: createReducer<RobotState["device"]>(null, (builder) => {
    builder.addCase(registerRobot, payloadReducer);
    builder.addCase(unregisterRobot, valueReducer(null));
  }),
});
