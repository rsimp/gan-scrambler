import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { StylesProvider } from "@material-ui/core/styles";

import { MainScreen } from "app/main-screen";
import { createStore } from "app/common/store";
import { messages, locale } from "translations";
import { importAll } from "app/common/webpack";

import * as serviceWorker from "./serviceWorker";

// execute any init scripts
importAll(require.context("./", true, /\/on-startup\.(ts|tsx)$/));

// include all global stylesheets
importAll(require.context("./", true, /\.css$/));

// create store
const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <StylesProvider injectFirst>
        <MainScreen />
      </StylesProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
