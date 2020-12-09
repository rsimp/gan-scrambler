import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import styled from "styled-components/macro";

import { ApplicationState } from "app/common/store";

import { getRobotServer } from "app/robot-widget/store/selectors";

import { generateScramble } from "app/common/cube/scramblers/full";
import {
  generateOLLScramble,
  generateFirstLookOLLScramble,
  generateSecondLookOLLScramble,
  generatePLLScramble,
  generateFirstLookPLLScramble,
  generateSecondLookPLLScramble,
} from "app/common/cube/scramblers/cfop";
import { crossSolver } from "app/common/cube/solvers/cross-solver";
import { CubePreview } from "app/cube-preview";
import { executeScramble } from "app/common/gan-robot";
import { doAlgorithm, Edges, Corners } from "app/common/cube/libs/cube";
import { FaceletArrayFilter } from "app/common/cube/libs/cube-preview";
import {
  isF2LSolved,
  isCrossSolved,
} from "app/common/cube/scramblers/solve-criteria";

interface CFOPScrambleProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

type CFOPPhaseType =
  | "cross"
  | "f2l"
  | "oll"
  | "firstLookOll"
  | "secondLookOll"
  | "pll"
  | "firstLookPll"
  | "secondLookPll";

const invertedColorMap: Record<string, string> = {
  U: "yellow",
  R: "red",
  F: "blue",
  D: "white",
  L: "orange",
  B: "green",
  G: "gray",
};

type CFOPLevelType = "beginner" | "advanced";

const crossFilter = {
  edges: [Edges.DB, Edges.DF, Edges.DR, Edges.DL],
};

const f2lFilter = {
  edges: [
    Edges.DB,
    Edges.DF,
    Edges.DR,
    Edges.DL,
    Edges.BL,
    Edges.BR,
    Edges.FL,
    Edges.FR,
  ],
  corners: [Corners.DBR, Corners.DLF, Corners.DBL, Corners.DFR],
};

const ollFilter = {
  ...f2lFilter,
  facelets: ["U"],
};

const filters: Record<string, FaceletArrayFilter> = {
  cross: crossFilter,
  f2l: f2lFilter,
  firstLookOll: ollFilter,
  secondLookOll: ollFilter,
  oll: ollFilter,
};

const ContentContainer = styled.div.attrs({
  className: "flex flex-col m-med children:mt-lg children:first:mt-0",
})``;

const ContentGroup = styled.div.attrs({
  className:
    "flex flex-col children:mt-sm children:first:mt-0 computer:items-start",
})``;

export function CFOPScramble(props: CFOPScrambleProps): JSX.Element {
  const [cfopLevel, setCFOPLevel] = useState<CFOPLevelType>("beginner");
  const [cfopPhase, setCFOPPhase] = useState<CFOPPhaseType>("cross");
  const [scramble, setScramble] = useState<string>("");

  return (
    <ContentContainer>
      <ContentGroup>
        <FormControl component="fieldset">
          <Select
            value={cfopLevel}
            onChange={(e) => {
              const level = e.target.value as CFOPLevelType;
              if (level !== cfopLevel) {
                setScramble("");
              }
              setCFOPLevel(level);
              setCFOPPhase("cross");
            }}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
          <RadioGroup
            row
            aria-label="Scramble Type"
            name="scrambleType"
            value={cfopPhase}
            onChange={(e) => {
              if (e.currentTarget.value !== cfopPhase) {
                setScramble("");
              }
              setCFOPPhase(e.currentTarget.value as CFOPPhaseType);
            }}
          >
            {cfopLevel === "beginner" && (
              <>
                <FormControlLabel
                  value="cross"
                  control={<Radio />}
                  label="Cross"
                />
                <FormControlLabel value="f2l" control={<Radio />} label="F2L" />
                <FormControlLabel
                  value="firstLookOll"
                  control={<Radio />}
                  label="First-look OLL"
                />
                <FormControlLabel
                  value="secondLookOll"
                  control={<Radio />}
                  label="Second-look OLL"
                />
                <FormControlLabel
                  value="firstLookPll"
                  control={<Radio />}
                  label="First-Look PLL"
                />
                <FormControlLabel
                  value="secondLookPll"
                  control={<Radio />}
                  label="Second-Look PLL"
                />
              </>
            )}
            {cfopLevel === "advanced" && (
              <>
                <FormControlLabel
                  value="cross"
                  control={<Radio />}
                  label="Cross"
                />
                <FormControlLabel value="f2l" control={<Radio />} label="F2L" />
                <FormControlLabel value="oll" control={<Radio />} label="OLL" />
                <FormControlLabel value="pll" control={<Radio />} label="PLL" />
              </>
            )}
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          onClick={() => {
            let scramble: string | false;
            switch (cfopPhase) {
              case "cross":
                setScramble(generateScramble(26, isCrossSolved));
                break;
              case "f2l":
                // faster to do cross solve than scrambling all pieces but the cross
                // and completing a full solve
                while (true) {
                  scramble = generateScramble();
                  const solveCode = crossSolver(scramble);
                  if (solveCode) {
                    if (!isF2LSolved(doAlgorithm(solveCode))) {
                      setScramble(`${scramble} ${solveCode}`);
                      break;
                    }
                  }
                }
                break;
              case "oll":
                scramble = generateOLLScramble();
                if (scramble) {
                  setScramble(scramble);
                }
                break;
              case "firstLookOll":
                scramble = generateFirstLookOLLScramble();
                if (scramble) {
                  setScramble(scramble);
                }
                break;
              case "secondLookOll":
                scramble = generateSecondLookOLLScramble();
                if (scramble) {
                  setScramble(scramble);
                }
                break;
              case "pll":
                scramble = generatePLLScramble();
                if (scramble) {
                  setScramble(scramble);
                }
                break;
              case "firstLookPll":
                scramble = generateFirstLookPLLScramble();
                if (scramble) {
                  setScramble(scramble);
                }
                break;
              case "secondLookPll":
                scramble = generateSecondLookPLLScramble();
                if (scramble) {
                  setScramble(scramble);
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
          filter={filters[cfopPhase]}
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
