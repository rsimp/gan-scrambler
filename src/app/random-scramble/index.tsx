import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, InputLabel, Input } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { ApplicationState } from "app/common/store";

import { getRobotServer } from "app/robot-widget/store/selectors";

import { generateScramble } from "app/common/cube/scramblers/full";
import { CubePreview } from "app/cube-preview";
import { executeScramble } from "app/common/gan-robot";
import { ButtonRow, ContentContainer } from "app/common/styled-components";

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
        <Input id="scramble" value={scramble} readOnly multiline fullWidth />
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
