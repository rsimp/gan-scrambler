import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { RobotWidgetContainer } from "app/robot-widget";
import { ConnectedScrambleGenerator } from "app/scramble-generator";
import { fiveSideSearch } from "app/common/cube/solvers/five-side-solver";

export function MainScreen(): JSX.Element {
  useEffect(() => {
    fiveSideSearch.initialize();
  }, []);

  return (
    <div className="flex-grow-1">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            <FormattedMessage id="appTitle" />
          </Typography>
          <div className="flex-row flex-grow-1 justify-end">
            <RobotWidgetContainer />
          </div>
        </Toolbar>
      </AppBar>

      <ConnectedScrambleGenerator />
    </div>
  );
}
