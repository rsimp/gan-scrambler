import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Box, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { ApplicationState } from "app/common/store";

import { getRobotDevice } from "app/robot-widget/store/selectors";
import { RobotState } from "app/robot-widget/store/types";

import { generateScramble, Scramble } from "app/common/cube/scramble";
import { CubePreview } from "app/cube-preview";

const SCRAMBLE_SERVICE_UUID = 0x180a;
const MODEL_NUMBER_SERVICE_UUID = 0x2a24;

interface ScrambleGeneratorProps {
  robotDevice?: RobotState["device"];
}

export function ScrambleGenerator(props: ScrambleGeneratorProps): JSX.Element {
  const [scramble, setScramble] = useState<Scramble | null>(null);
  const robotServer = props?.robotDevice?.gatt;
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Button
        variant="contained"
        onClick={() => {
          setScramble(generateScramble());
        }}
      >
        <FormattedMessage id="scrambleGenerator.actions.generate" />
      </Button>
      {scramble && (
        <>
          <Typography variant="body1">{scramble.code}</Typography>
          <CubePreview scramble={scramble} />
          <Button
            variant="contained"
            disabled={robotServer}
            onClick={() => {
              if (robotServer) {
                const;
              }
            }}
          >
            <FormattedMessage id="scrambleGenerator.actions.execute" />
          </Button>
        </>
      )}
    </Box>
  );
}

export const ScrambleGeneratorContainer = connect(
  (state: ApplicationState) => ({
    robotDevice: getRobotDevice(state),
  })
)(ScrambleGenerator);
