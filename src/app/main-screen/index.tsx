import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { RobotWidgetContainer } from "app/robot-widget";
import { ConnectedScrambleGenerator } from "app/scramble-generator";
import { fiveSideSearch } from "app/common/cube/solvers/five-side-solver";
import styled from "styled-components/macro";

const Screen = styled.div.attrs({ className: "flex flex-col" })``;

const IconContainer = styled.div.attrs({
  className: "flex flex-row ml-auto",
})``;

export function MainScreen(): JSX.Element {
  useEffect(() => {
    fiveSideSearch.initialize();
  }, []);

  return (
    <Screen>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            <FormattedMessage id="appTitle" />
          </Typography>
          <IconContainer>
            <RobotWidgetContainer />
          </IconContainer>
        </Toolbar>
      </AppBar>

      <ConnectedScrambleGenerator />
    </Screen>
  );
}
