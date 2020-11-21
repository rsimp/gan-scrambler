import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";

import { ApplicationState } from "app/common/store";

import { getRobotServer } from "app/robot-widget/store/selectors";

import { generateScramble } from "app/common/cube/scramblers/full";
import { generateOLLScramble } from "app/common/cube/scramblers/oll";
import { crossSolver } from "app/common/cube/solvers/cross-solver";
import { CubePreview } from "app/cube-preview";
import { generatePLLScramble } from "app/common/cube/scramblers/pll";
import { executeScramble } from "app/common/gan-robot";

interface CFOPScrambleProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

type ScrambleType = "cross" | "f2l" | "oll" | "pll";

const invertedColorMap: Record<string, string> = {
  U: "yellow",
  R: "red",
  F: "blue",
  D: "white",
  L: "orange",
  B: "green",
  G: "gray",
};

const ContentContainer = styled.div.attrs({
  className: "flex flex-col m-med children:mt-lg children:first:mt-0",
})``;

const ContentGroup = styled.div.attrs({
  className: "flex flex-col children:mt-sm children:first:mt-0",
})``;

export function CFOPScramble(props: CFOPScrambleProps): JSX.Element {
  const [scrambleType, setScrambleType] = useState<ScrambleType>("cross");
  const [scramble, setScramble] = useState<string>("");
  return (
    <ContentContainer>
      <ContentGroup>
        <FormControl component="fieldset">
          <FormLabel component="legend">Scramble Type</FormLabel>
          <RadioGroup
            row
            aria-label="Scramble Type"
            name="scrambleType"
            value={scrambleType}
            onChange={(e) => {
              if (e.currentTarget.value !== scrambleType) {
                setScramble("");
              }
              setScrambleType(e.currentTarget.value as ScrambleType);
            }}
          >
            <FormControlLabel value="cross" control={<Radio />} label="Cross" />
            <FormControlLabel value="f2l" control={<Radio />} label="F2L" />
            <FormControlLabel value="oll" control={<Radio />} label="OLL" />
            <FormControlLabel value="pll" control={<Radio />} label="PLL" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          onClick={() => {
            switch (scrambleType) {
              case "cross":
                setScramble(generateScramble());
                break;
              case "f2l":
                // faster to do a simple cross solve than a full solve
                const scramble = generateScramble(19);
                const solveCode = crossSolver(scramble);
                if (solveCode) {
                  setScramble(`${scramble} ${solveCode}`);
                }
                break;
              case "oll":
                const ollScramble = generateOLLScramble();
                if (ollScramble) {
                  setScramble(ollScramble);
                }
                break;
              case "pll":
                const pllScramble = generatePLLScramble();
                if (pllScramble) {
                  setScramble(pllScramble);
                }
                break;
            }
          }}
        >
          <FormattedMessage id="scramble.actions.scramble" />
        </Button>
      </ContentGroup>

      <ContentGroup>
        <CubePreview
          scrambleCode={scramble}
          type={scrambleType}
          colorMap={invertedColorMap}
        />
        <Button
          variant="contained"
          disabled={!Boolean(scramble) || !Boolean(props.robotServer)}
          onClick={() => executeScramble(props.robotServer, scramble)}
        >
          <FormattedMessage id="scramble.actions.send" />
        </Button>
      </ContentGroup>
    </ContentContainer>
  );
}

export const ConnectedCFOPScramble = connect((state: ApplicationState) => ({
  robotServer: getRobotServer(state),
}))(CFOPScramble);
