import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { DeviceWidgetContainer } from "app/device-widget";

export const Router = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/setup">
        <DeviceWidgetContainer />
      </Route>
      <Route path="/">{null}</Route>
    </Switch>
  </BrowserRouter>
);
