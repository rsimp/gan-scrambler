import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { StylesProvider } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { SnackbarProvider } from "notistack";

import { watchSnackbarActions } from "core/snackbar/sagas";
import { createStore } from "core/redux/store";
import { importAll } from "core/utils/webpack";

import { fiveSideSearch } from "core/cube/solvers/five-side-solver";
import { MainScreen } from "app/main-screen";

import { messages, locale } from "./translations";

import * as serviceWorker from "./serviceWorker";

// import fonts
import "fontsource-roboto/300.css";
import "fontsource-roboto/400.css";
import "fontsource-roboto/500.css";
import "fontsource-roboto/700.css";

// global css
import "./styles/tailwind.css";
import "./styles/main.css";

// import store init scripts
importAll(require.context("./", true, /\/init-store\.(ts|tsx)$/));

function renderApp() {
  fiveSideSearch.initialize();
  const snackbar = React.createRef<SnackbarProvider>();
  const store = createStore();
  store.runSaga(watchSnackbarActions, snackbar);

  const onClickDismiss = (key: React.ReactText) => () => {
    snackbar.current?.closeSnackbar(key);
  };
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <StylesProvider injectFirst>
          <SnackbarProvider
            ref={snackbar}
            maxSnack={1}
            className="mb-3 landscape:mb-0 computer:mb-0"
            action={(key) => (
              <IconButton
                size="small"
                color="inherit"
                onClick={onClickDismiss(key)}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          >
            <MainScreen />
          </SnackbarProvider>
        </StylesProvider>
      </IntlProvider>
    </Provider>,
    document.getElementById("root")
  );
}
renderApp();

//register service worker
serviceWorker.register();
