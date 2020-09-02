import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Box, Typography } from "@material-ui/core";
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

export function ScrambleGenerator(props: ScrambleGeneratorProps): JSX.Element {
  const [scramble, setScramble] = useState<Scramble | null>(null);
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

                  for (const GANEncodingChunk of scramble.GANEncoding) {
                    await scrambleExecuteCharacteristic.writeValue(
                      new TextEncoder().encode(GANEncodingChunk)
                    );
                  }
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
