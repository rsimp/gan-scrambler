import React, { useState, useCallback } from "react";
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
import { ButtonRow, ContentContainer } from "app/common/style-components";

interface ManualScrambleProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

export function ManualScramble(props: ManualScrambleProps): JSX.Element {
  const [scramble, setScramble] = useState<string>("");
  const [hasError, setHasError] = useState(false);

  const processScrambleInput = useCallback((scramble: string) => {
    if (scramble.length > 0) {
      if (validateAlgorithm(scramble)) {
        const fiveSideSolve = fiveSideSolver(scramble);
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
  }, []);

  const manualScrambleBlurHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) =>
      processScrambleInput(event.currentTarget.value),
    []
  );
  const manualScrambleKeyDownHandler = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processScrambleInput((e.target as HTMLInputElement).value);
    }
  }, []);
  const sendClickHandler = useCallback(
    () => executeScramble(props.robotServer, scramble),
    [scramble, props.robotServer]
  );
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
          onBlur={manualScrambleBlurHandler}
          onKeyDown={manualScrambleKeyDownHandler}
        />
      </form>
      <CubePreview scrambleCode={scramble} />
      <ButtonRow>
        <Button
          variant="contained"
          disabled={!Boolean(props.robotServer) || !Boolean(scramble)}
          onClick={sendClickHandler}
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
