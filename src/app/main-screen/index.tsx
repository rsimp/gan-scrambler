import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { RobotWidgetContainer } from "app/robot-widget";
import { ScrambleGenerator } from "app/scramble-generator";

export function MainScreen(): JSX.Element {
  return (
    <Box flexGrow={1}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            <FormattedMessage id="appTitle" />
          </Typography>
          <RobotWidgetContainer />
        </Toolbar>
      </AppBar>

      <ScrambleGenerator />
    </Box>
  );
}
