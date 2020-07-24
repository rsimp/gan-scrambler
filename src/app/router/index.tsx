import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Setup } from "app/setup";

export const Router = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/setup">
        <Setup />
      </Route>
      <Route path="/">{null}</Route>
    </Switch>
  </BrowserRouter>
);
