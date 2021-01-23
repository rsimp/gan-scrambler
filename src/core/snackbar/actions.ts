import { createAction } from "@reduxjs/toolkit";
import { SnackbarMessage, OptionsObject, SnackbarKey } from "notistack";

const prefix = "notisnackbar";

export const enqueueSnackbar = createAction(
  `${prefix}/enqueue-snackbar`,
  (message: SnackbarMessage, options?: OptionsObject) => ({
    payload: { message, options },
  })
);

export const closeSnackbar = createAction(
  `${prefix}/close-snackbar`,
  (key?: SnackbarKey) => ({
    payload: { key },
  })
);
