import { ProviderContext } from "notistack";
import { takeEvery } from "typed-redux-saga";
import { SagaIterator } from "redux-saga";

import { enqueueSnackbar, closeSnackbar } from "app/common/snackbar/actions";

type enqueueAction = ReturnType<typeof enqueueSnackbar>;
type closeAction = ReturnType<typeof closeSnackbar>;
function* processSnackbarActions(
  snackbar: React.RefObject<ProviderContext>,
  action: enqueueAction | closeAction
) {
  if (isEnqueueAction(action)) {
    snackbar.current?.enqueueSnackbar(
      action.payload.message,
      action.payload.options
    );
  } else {
    snackbar.current?.closeSnackbar(action.payload.key);
  }
}

function isEnqueueAction(
  action: enqueueAction | closeAction
): action is enqueueAction {
  return action.type === enqueueSnackbar.type;
}

export function* watchSnackbarActions(
  snackbar: React.RefObject<ProviderContext>
): SagaIterator {
  return yield* takeEvery(
    [enqueueSnackbar, closeSnackbar],
    processSnackbarActions,
    snackbar
  );
}
