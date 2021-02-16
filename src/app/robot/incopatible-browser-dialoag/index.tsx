import React from "react";

import { DialogProps } from "core/components/dialogs/types";

import { ErrorDialog } from "core/components/dialogs/error";

export const IncompatibleBrowserDialog = (props: DialogProps): JSX.Element => (
  <ErrorDialog {...props} title={"Incompatible Browser"}>
    <>
      This browser does not support connecting to bluetooth devices. Please
      check the list of supported browswers{" "}
      <a href="https://caniuse.com/web-bluetooth">here</a>
    </>
  </ErrorDialog>
);
