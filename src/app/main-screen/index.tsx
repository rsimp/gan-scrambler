import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { Shuffle, Layers, Edit } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";

import { ConnectedRobotWidget } from "app/robot-widget";
import { ConnectedCFOPScramble } from "app/cfop-scramble";
import { fiveSideSearch } from "app/common/cube/solvers/five-side-solver";
import { ConnectedRandomScramble } from "app/random-scramble";
import { ConnectedManualScramble } from "app/manual-scramble";

const Screen = styled.div.attrs({ className: "flex flex-col h-screen" })``;

const IconContainer = styled.div.attrs({
  className: "flex flex-row ml-auto",
})``;

export function MainScreen(): JSX.Element {
  const [navigationValue, setNavigation] = React.useState("random");
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: string
  ) => {
    setNavigation(newValue);
  };

  useEffect(() => {
    window.screen.orientation.lock("portrait");
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
            <ConnectedRobotWidget />
          </IconContainer>
        </Toolbar>
      </AppBar>

      <div className="flex flex-col h-full">
        {navigationValue === "random" && <ConnectedRandomScramble />}
        {navigationValue === "cfop" && <ConnectedCFOPScramble />}
        {navigationValue === "manual" && <ConnectedManualScramble />}

        <div className="w-full mt-auto">
          <BottomNavigation
            showLabels
            value={navigationValue}
            onChange={handleChange}
            className="w-full"
          >
            <BottomNavigationAction
              icon={<Shuffle />}
              value="random"
              label="RANDOM"
              aria-label="phone"
            />
            <BottomNavigationAction
              icon={<Layers />}
              value="cfop"
              label="CFOP"
              aria-label="favorite"
            />
            <BottomNavigationAction
              icon={<Edit />}
              value="manual"
              label="MANUAL"
              aria-label="person"
            />
          </BottomNavigation>
        </div>
      </div>
    </Screen>
  );
}
