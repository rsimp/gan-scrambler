import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { ApplicationState } from "app/common/store";

import { getRobotServer } from "app/robot-widget/store/selectors";

import { generateScramble, Scramble } from "app/common/cube/scramble";
import { CubePreview } from "app/cube-preview";

const SCRAMBLE_SERVICE_UUID = 0xfff0;
const SCRAMBLE_CHARACTERISTIC_UUID = 0xfff3;

interface ScrambleGeneratorProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

type ScrambleType = "full" | "cross" | "f2l" | "oll" | "pll";

export function ScrambleGenerator(props: ScrambleGeneratorProps): JSX.Element {
  const [scrambleType, setScrambleType] = useState<ScrambleType>("full");
  const [scramble, setScramble] = useState<Scramble | null>(null);
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <FormControl component="fieldset">
        <FormLabel component="legend">Scramble Type</FormLabel>
        <RadioGroup
          row
          aria-label="Scramble Type"
          name="scrambleType"
          value={scrambleType}
          onChange={(e) =>
            setScrambleType(e.currentTarget.value as ScrambleType)
          }
        >
          <FormControlLabel value="full" control={<Radio />} label="Full" />
        </RadioGroup>
      </FormControl>
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
            disabled={!Boolean(props.robotServer)}
            onClick={async () => {
              try {
                if (props.robotServer) {
                  const scrambleService = await props.robotServer.getPrimaryService(
                    SCRAMBLE_SERVICE_UUID
                  );
                  const scrambleExecuteCharacteristic = await scrambleService.getCharacteristic(
                    SCRAMBLE_CHARACTERISTIC_UUID
                  );

                  await scrambleExecuteCharacteristic.writeValue(
                    new Uint8Array(scramble.GANEncoding)
                  );
                }
              } catch (error) {
                console.log(error);
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
    robotServer: getRobotServer(state),
  })
)(ScrambleGenerator);
