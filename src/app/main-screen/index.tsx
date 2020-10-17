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

import { RobotWidgetContainer } from "app/robot-widget";
import { ConnectedScrambleGenerator } from "app/scramble-generator";
import { fiveSideSearch } from "app/common/cube/solvers/five-side-solver";
import styled from "styled-components/macro";

const Screen = styled.div.attrs({ className: "flex flex-col h-screen" })``;

const IconContainer = styled.div.attrs({
  className: "flex flex-row ml-auto",
})``;

const TabWrapper = styled.div.attrs({
  className: "flex flex-column w-full mt-auto",
})``;

export function MainScreen(): JSX.Element {
  const [navigationValue, setNavigation] = React.useState(0);
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setNavigation(newValue);
  };

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

      <div className="flex flex-col h-full">
        <ConnectedScrambleGenerator />
        <TabWrapper>
          <BottomNavigation
            showLabels
            value={navigationValue}
            onChange={handleChange}
            className="w-full"
          >
            <BottomNavigationAction
              icon={<Shuffle />}
              label="RANDOM"
              aria-label="phone"
            />
            <BottomNavigationAction
              icon={<Layers />}
              label="CFOP"
              aria-label="favorite"
            />
            <BottomNavigationAction
              icon={<Edit />}
              label="MANUAL"
              aria-label="person"
            />
          </BottomNavigation>
        </TabWrapper>
      </div>
    </Screen>
  );
}
