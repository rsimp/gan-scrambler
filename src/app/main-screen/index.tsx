import React, { useEffect, useCallback } from "react";
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
import { useDispatch } from "react-redux";
import tag from "classed.macro";

import { detectBluetoothSupport } from "core/utils/feature-detection";
import { useSessionStorage } from "core/hooks/useSessionStorage";

import { RobotWidget } from "app/robot/widget";
import { CFOPScramble } from "app/cfop-scramble";
import { RandomScramble } from "app/random-scramble";
import { ManualScramble } from "app/manual-scramble";
import { appInitialized } from "app/main-screen/actions";
import { IncompatibleBrowserDialog } from "app/incompatible-browser-dialoag";

const Screen = tag.div`flex flex-col h-screen`;

const MenuItemContent = tag.div`computer:flex hidden flex-row items-center`;

const CompactMenuItemContent = tag.div`
  hidden landscape:inline-flex flex-col items-center justify-center text-on-background w-full
`;

const IconContainer = tag.div`flex flex-row ml-auto`;

const IconWrapper = tag.div`text-icon-on-background`;

export const MainScreen = (): JSX.Element => {
  const [navigationValue, setNavigation] = React.useState("random");
  const dispatch = useDispatch();
  const handleChange = (_: React.ChangeEvent<unknown>, newValue: string) => {
    setNavigation(newValue);
  };

  const [showIncompatibleDialog, setShowIncompatibleDialog] = useSessionStorage(
    "showIncompatibleBrowserDialog",
    true
  );
  const isBluetoothSupported = detectBluetoothSupport();
  const handleIncompatibleDialogClose = useCallback(() => {
    setShowIncompatibleDialog(false);
  }, []);

  useEffect(() => {
    dispatch(appInitialized());
  }, []);

  return (
    <Screen>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            <FormattedMessage id="appTitle" />
          </Typography>
          <IconContainer>
            <RobotWidget />
          </IconContainer>
        </Toolbar>
      </AppBar>

      <div className="flex flex-row h-full w-full">
        <Paper className="hidden landscape:block computer:block w-6 computer:w-12">
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
          {navigationValue === "random" && <RandomScramble />}
          {navigationValue === "cfop" && <CFOPScramble />}
          {navigationValue === "manual" && <ManualScramble />}

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
      {!isBluetoothSupported && showIncompatibleDialog && (
        <IncompatibleBrowserDialog
          isOpen={true}
          onClose={handleIncompatibleDialogClose}
        />
      )}
    </Screen>
  );
};
