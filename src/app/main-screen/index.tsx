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
import { useDispatch } from "react-redux";

import { ConnectedRobotWidget } from "app/robot/widget";
import { ConnectedCFOPScramble } from "app/cfop-scramble";
import { fiveSideSearch } from "app/common/cube/solvers/five-side-solver";
import { ConnectedRandomScramble } from "app/random-scramble";
import { ConnectedManualScramble } from "app/manual-scramble";
import {
  connectToKnownGANRobots,
  ExperimentalFeatureNotSupported,
} from "app/robot/bluetooth-utils";
import { registerRobot, unregisterRobot } from "app/robot/store/actions";

const Screen = styled.div.attrs({ className: "flex flex-col h-screen" })``;

const MenuItemContent = styled.div.attrs({
  className: "computer:flex hidden flex-row items-center",
})``;

const CompactMenuItemContent = styled.div.attrs({
  className:
    "hidden landscape:inline-flex flex-col items-center justify-center text-bg-txt w-full",
})``;

const IconContainer = styled.div.attrs({
  className: "flex flex-row ml-auto",
})``;

const IconWrapper = styled.div.attrs({
  className: "text-bg-icon",
})``;

export const MainScreen = (): JSX.Element => {
  const [navigationValue, setNavigation] = React.useState("random");
  const dispatch = useDispatch();
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: string
  ) => {
    setNavigation(newValue);
  };

  useEffect(() => {
    fiveSideSearch.initialize();
    (async () => {
      try {
        const device = await connectToKnownGANRobots();
        dispatch(registerRobot(device));
        device.addEventListener("gattserverdisconnected", () => {
          dispatch(unregisterRobot());
        });
      } catch (e) {
        if (!(e instanceof ExperimentalFeatureNotSupported)) {
          console.error(e);
        }
      }
    })();
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
        <Paper className="hidden landscape:block computer:block w-24 computer:w-48">
          <List>
            <ListItem
              button
              key="random"
              selected={navigationValue === "random"}
              onClick={() => setNavigation("random")}
            >
              <MenuItemContent>
                <ListItemIcon>
                  <Shuffle />
                </ListItemIcon>
                <ListItemText primary="RANDOM" />
              </MenuItemContent>

              <CompactMenuItemContent>
                <IconWrapper>
                  <Shuffle />
                </IconWrapper>
                <span>RANDOM</span>
              </CompactMenuItemContent>
            </ListItem>

            <ListItem
              button
              key="cfop"
              selected={navigationValue === "cfop"}
              onClick={() => setNavigation("cfop")}
            >
              <MenuItemContent>
                <ListItemIcon>
                  <Layers />
                </ListItemIcon>
                <ListItemText primary="CFOP" />
              </MenuItemContent>

              <CompactMenuItemContent>
                <IconWrapper>
                  <Layers />
                </IconWrapper>
                <span>CFOP</span>
              </CompactMenuItemContent>
            </ListItem>

            <ListItem
              button
              key="manual"
              selected={navigationValue === "manual"}
              onClick={() => setNavigation("manual")}
            >
              <MenuItemContent>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="MANUAL" />
              </MenuItemContent>

              <CompactMenuItemContent>
                <IconWrapper>
                  <Edit />
                </IconWrapper>
                <span>MANUAL</span>
              </CompactMenuItemContent>
            </ListItem>
          </List>
        </Paper>

        <div className="flex flex-grow flex-col h-full">
          {navigationValue === "random" && <ConnectedRandomScramble />}
          {navigationValue === "cfop" && <ConnectedCFOPScramble />}
          {navigationValue === "manual" && <ConnectedManualScramble />}

          <div className="landscape:hidden computer:hidden w-full mt-auto">
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
};
