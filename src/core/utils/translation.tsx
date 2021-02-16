import React from "react";
import { FormattedMessage } from "react-intl";

export function translate(
  id: string,
  values?: Record<string, string>
): JSX.Element {
  return <FormattedMessage id={id} values={values} />;
}
