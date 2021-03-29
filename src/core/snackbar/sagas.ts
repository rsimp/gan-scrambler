import { ProviderContext } from "notistack";
import { takeEvery } from "typed-redux-saga/macro";
import { Action } from "@reduxjs/toolkit";

import { SagaIterator } from "core/redux/types";
import { enqueueSnackbar, closeSnackbar } from "core/snackbar/actions";

function* processSnackbarActions(
  snackbar: React.RefObject<ProviderContext>,
  action: Action
) {
  if (enqueueSnackbar.match(action)) {
    snackbar.current?.enqueueSnackbar(
      action.payload.message,
      action.payload.options
    );
  } else if (closeSnackbar.match(action)) {
    snackbar.current?.closeSnackbar(action.payload.key);
  }
}

export function* watchSnackbarActions(
  snackbar: React.RefObject<ProviderContext>
): SagaIterator {
  return yield* takeEvery(
    [enqueueSnackbar.type, closeSnackbar.type],
    processSnackbarActions,
    snackbar
  );
}
