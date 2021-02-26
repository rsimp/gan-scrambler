import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Button, TextField, Tooltip } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { ApplicationState } from "core/redux/store";
import { fiveSideSolver } from "core/cube/solvers/five-side-solver";
import { validateAlgorithm, invertAlgorithm } from "core/cube/libs/algorithms";
import { ButtonRow, ContentContainer } from "core/components/presentation";

import { getRobotServer } from "app/robot/store/selectors";
import { CubePreview } from "app/cube-preview";
import { executeScramble } from "app/robot/bluetooth-utils";

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
  const tooltipText = !Boolean(props.robotServer)
    ? "Robot not connected"
    : !scramble
    ? "Scramble required"
    : "";

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
        <Tooltip arrow title={tooltipText}>
          <span>
            <Button
              variant="contained"
              disabled={!Boolean(props.robotServer) || !Boolean(scramble)}
              onClick={sendClickHandler}
              className="flex flex-grow"
            >
              <FormattedMessage id="scramble.actions.send" />
            </Button>
          </span>
        </Tooltip>
      </ButtonRow>
    </ContentContainer>
  );
}

export const ConnectedManualScramble = connect((state: ApplicationState) => ({
  robotServer: getRobotServer(state),
}))(ManualScramble);
