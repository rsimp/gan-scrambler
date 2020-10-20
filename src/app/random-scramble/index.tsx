import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";

import { ApplicationState } from "app/common/store";

import { getRobotServer } from "app/robot-widget/store/selectors";

import { generateScramble } from "app/common/cube/scramblers/full";
import { CubePreview } from "app/cube-preview";
import { executeScramble } from "app/common/gan-robot";

interface RandomScrambleProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

const ContentContainer = styled.div.attrs({
  className: "flex flex-col m-med children:mt-lg children:first:mt-0",
})``;

const ContentGroup = styled.div.attrs({
  className: "flex flex-col children:mt-sm children:first:mt-0",
})``;

export function RandomScramble(props: RandomScrambleProps): JSX.Element {
  const [scramble, setScramble] = useState<string>("");
  return (
    <ContentContainer>
      <ContentGroup>
        <Button
          variant="contained"
          onClick={() => {
            setScramble(generateScramble());
          }}
        >
          <FormattedMessage id="scramble.actions.scramble" />
        </Button>
      </ContentGroup>

      <ContentGroup>
        <Typography variant="body1">{scramble}</Typography>
        <CubePreview scrambleCode={scramble} />
        <Button
          variant="contained"
          disabled={!Boolean(props.robotServer)}
          onClick={() => executeScramble(props.robotServer, scramble)}
        >
          <FormattedMessage id="scramble.actions.send" />
        </Button>
      </ContentGroup>
    </ContentContainer>
  );
}

export const ConnectedRandomScramble = connect((state: ApplicationState) => ({
  robotServer: getRobotServer(state),
}))(RandomScramble);
