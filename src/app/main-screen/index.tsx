import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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

      <div className="flex flex-row h-full w-full">
        <Paper className="w-48 hidden computer:block">
          <List>
            <ListItem
              button
              key="random"
              selected={navigationValue === "random"}
              onClick={() => setNavigation("random")}
            >
              <ListItemIcon>
                <Shuffle />
              </ListItemIcon>
              <ListItemText primary="RANDOM" />
            </ListItem>

            <ListItem
              button
              key="cfop"
              selected={navigationValue === "cfop"}
              onClick={() => setNavigation("cfop")}
            >
              <ListItemIcon>
                <Layers />
              </ListItemIcon>
              <ListItemText primary="CFOP" />
            </ListItem>

            <ListItem
              button
              key="manual"
              selected={navigationValue === "manual"}
              onClick={() => setNavigation("manual")}
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText primary="MANUAL" />
            </ListItem>
          </List>
        </Paper>

        <div className="flex flex-grow flex-col h-full">
          {navigationValue === "random" && <ConnectedRandomScramble />}
          {navigationValue === "cfop" && <ConnectedCFOPScramble />}
          {navigationValue === "manual" && <ConnectedManualScramble />}

          <div className="computer:hidden w-full mt-auto">
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
                aria-label="random"
              />
              <BottomNavigationAction
                icon={<Layers />}
                value="cfop"
                label="CFOP"
                aria-label="cfop"
              />
              <BottomNavigationAction
                icon={<Edit />}
                value="manual"
                label="MANUAL"
                aria-label="manual"
              />
            </BottomNavigation>
          </div>
        </div>
      </div>
    </Screen>
  );
}
