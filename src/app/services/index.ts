import React from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { registerService } from "app/services/store/actions";

export const RegisterServices = (): null => {
  const dispatch = useDispatch();
  const snackbarService = useSnackbar();

  React.useEffect(() => {
    dispatch(registerService("snackbar", snackbarService));
  }, []);

  return null;
};
