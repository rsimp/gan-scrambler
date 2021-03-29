import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { robotConnected, robotDisconnected } from "app/robot/store/actions";
import { RobotState } from "app/robot/store/types";
import { payloadReducer, valueReducer } from "core/redux/reducer-helpers";

export default combineReducers<RobotState>({
  device: createReducer<RobotState["device"]>(null, (builder) => {
    builder.addCase(robotConnected, payloadReducer);
    builder.addCase(robotDisconnected, valueReducer(null));
  }),
});
