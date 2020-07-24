import { createReducer } from "@reduxjs/toolkit";
import { registerRobot } from "app/setup/actions";
import { RobotState } from "app/setup/types";

const initialState: RobotState = {
  device: undefined,
};

export default createReducer(initialState, (builder) => {
  builder.addCase(registerRobot, (state, action) => {
    state.device = action.payload;
  });
});
