import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, InputLabel, OutlinedInput } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { ApplicationState } from "core/redux/store";
import { generateScramble } from "core/cube/scramblers/full";
import { ButtonRow, ContentContainer } from "core/style-components";

import { getRobotServer } from "app/robot/store/selectors";
import { CubePreview } from "app/cube-preview";
import { executeScramble } from "app/robot/bluetooth-utils";

interface RandomScrambleProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

export function RandomScramble(props: RandomScrambleProps): JSX.Element {
  const [scramble, setScramble] = useState<string>("");
  return (
    <ContentContainer>
      <div className="flex flex-col w-full">
        <InputLabel htmlFor="scramble" className="text-xs">
          Scramble
        </InputLabel>
        <OutlinedInput
          id="scramble"
          value={scramble}
          className="text-on-surface py-med children:cursor-text"
          multiline
          fullWidth
          disabled
        />
      </div>

      <CubePreview scrambleCode={scramble} />

      <ButtonRow>
        <Button
          variant="contained"
          onClick={() => {
            setScramble(generateScramble());
          }}
        >
          <FormattedMessage id="scramble.actions.scramble" />
        </Button>
        <Button
          variant="contained"
          size="large"
          disabled={!scramble || !Boolean(props.robotServer)}
          onClick={() => executeScramble(props.robotServer, scramble)}
        >
          <FormattedMessage id="scramble.actions.send" />
        </Button>
      </ButtonRow>
    </ContentContainer>
  );
}

export const ConnectedRandomScramble = connect((state: ApplicationState) => ({
  robotServer: getRobotServer(state),
}))(RandomScramble);
