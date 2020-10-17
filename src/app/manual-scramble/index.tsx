import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";

import { ApplicationState } from "app/common/store";

import { getRobotServer } from "app/robot-widget/store/selectors";

import { fiveSideSolver } from "app/common/cube/solvers/five-side-solver";
import { CubePreview } from "app/cube-preview";
import {
  validateAlgorithm,
  invertAlgorithm,
} from "app/common/cube/libs/algorithms";
import { executeScramble } from "app/common/gan-robot";

interface ManualScrambleProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

const ContentContainer = styled.div.attrs({
  className: "flex flex-col m-med children:mt-lg children:first:mt-0",
})``;

const ContentGroup = styled.div.attrs({
  className: "flex flex-col children:mt-sm children:first:mt-0",
})``;

export function ManualScramble(props: ManualScrambleProps): JSX.Element {
  const [scramble, setScramble] = useState<string | null>(null);
  const [manualScramble, setManualScramble] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  return (
    <ContentContainer>
      <ContentGroup>
        <form noValidate autoComplete="off" className="container">
          <TextField
            id="manual-scramble"
            label="Manual Scramble"
            fullWidth
            error={hasError}
            helperText={hasError && "Invalid Scramble Code"}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
              const manualScrambleValue = event.target.value;
              if (manualScrambleValue.length > 0) {
                if (validateAlgorithm(manualScrambleValue)) {
                  setManualScramble(manualScrambleValue);
                } else {
                  setManualScramble("");
                  setHasError(true);
                }
              }
            }}
          />
        </form>
        <Button
          variant="contained"
          onClick={() => {
            if (manualScramble) {
              const fiveSideSolve = fiveSideSolver(manualScramble);
              if (fiveSideSolve) {
                const fiveSideScramble = invertAlgorithm(fiveSideSolve);
                setScramble(fiveSideScramble);
              }
            }
          }}
        >
          <FormattedMessage id="scramble.actions.generate" />
        </Button>
      </ContentGroup>
      {scramble && (
        <ContentGroup>
          <CubePreview scrambleCode={scramble} />
          <Button
            variant="contained"
            disabled={!Boolean(props.robotServer)}
            onClick={() => executeScramble(props.robotServer, scramble)}
          >
            <FormattedMessage id="scramble.actions.execute" />
          </Button>
        </ContentGroup>
      )}
    </ContentContainer>
  );
}

export const ConnectedManualScramble = connect((state: ApplicationState) => ({
  robotServer: getRobotServer(state),
}))(ManualScramble);
