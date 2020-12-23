import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { ApplicationState } from "app/common/store";

import { getRobotServer } from "app/robot/store/selectors";

import { fiveSideSolver } from "app/common/cube/solvers/five-side-solver";
import { CubePreview } from "app/cube-preview";
import {
  validateAlgorithm,
  invertAlgorithm,
} from "app/common/cube/libs/algorithms";
import { executeScramble } from "app/robot/bluetooth-utils";
import { ButtonRow, ContentContainer } from "app/common/styled-components";

interface ManualScrambleProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

export function ManualScramble(props: ManualScrambleProps): JSX.Element {
  const [scramble, setScramble] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  return (
    <ContentContainer>
      <form noValidate autoComplete="off" className="container">
        <TextField
          id="manual-scramble"
          label="Manual Scramble"
          multiline
          rowsMax={4}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          error={hasError}
          helperText={hasError && "Invalid Scramble Code"}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            const manualScrambleValue = event.target.value;
            if (manualScrambleValue.length > 0) {
              if (validateAlgorithm(manualScrambleValue)) {
                const fiveSideSolve = fiveSideSolver(manualScrambleValue);
                if (fiveSideSolve) {
                  const fiveSideScramble = invertAlgorithm(fiveSideSolve);
                  setScramble(fiveSideScramble);
                }
              } else {
                setHasError(true);
                setScramble("");
              }
            } else {
              setHasError(false);
              setScramble("");
            }
          }}
        />
      </form>
      <CubePreview scrambleCode={scramble} />
      <ButtonRow>
        <Button
          variant="contained"
          disabled={!Boolean(props.robotServer) && Boolean(scramble)}
          onClick={() => executeScramble(props.robotServer, scramble)}
        >
          <FormattedMessage id="scramble.actions.send" />
        </Button>
      </ButtonRow>
    </ContentContainer>
  );
}

export const ConnectedManualScramble = connect((state: ApplicationState) => ({
  robotServer: getRobotServer(state),
}))(ManualScramble);
