import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { StylesProvider } from "@material-ui/core/styles";

import { MainScreen } from "app/main-screen";
import { createStore } from "app/common/store";
import { messages, locale } from "translations";
import { importAll } from "app/common/webpack";
import { SnackbarProvider } from "notistack";

import * as serviceWorker from "./serviceWorker";

// import fonts
import "fontsource-roboto/300.css";
import "fontsource-roboto/400.css";
import "fontsource-roboto/500.css";
import "fontsource-roboto/700.css";

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
        <SnackbarProvider>
          <MainScreen />
        </SnackbarProvider>
      </StylesProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);

//register service worker
serviceWorker.register();
