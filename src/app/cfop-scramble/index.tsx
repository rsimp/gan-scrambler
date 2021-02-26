import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { ApplicationState } from "core/redux/store";
import { generateScramble } from "core/cube/scramblers/full";
import {
  generateOLLScramble,
  generateFirstLookOLLScramble,
  generateSecondLookOLLScramble,
  generatePLLScramble,
  generateFirstLookPLLScramble,
  generateSecondLookPLLScramble,
} from "core/cube/scramblers/cfop";
import { crossSolver } from "core/cube/solvers/cross-solver";
import { doAlgorithm, Edges, Corners } from "core/cube/libs/cube";
import { FaceletArrayFilter } from "core/cube/libs/cube-preview";
import {
  isF2LSolved,
  isCrossSolved,
} from "core/cube/scramblers/solve-criteria";
import { ButtonRow, ContentContainer } from "core/components/presentation";

import { getRobotServer } from "app/robot/store/selectors";
import { CubePreview } from "app/cube-preview";
import { executeScramble } from "app/robot/bluetooth-utils";

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

export function CFOPScramble(props: CFOPScrambleProps): JSX.Element {
  const [cfopPhase, setCFOPPhase] = useState<CFOPPhaseType>("cross");
  const [scramble, setScramble] = useState<string>("");

  const onSendBtnClick = () => {
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
  };

  const tooltipText = !Boolean(props.robotServer)
    ? "Robot not connected"
    : !scramble
    ? "Scramble required"
    : "";

  return (
    <ContentContainer>
      <FormControl component="fieldset">
        <Select
          className="computer:w-24"
          value={cfopPhase}
          onChange={(e) => {
            const phase = e.target.value as CFOPPhaseType;
            if (phase !== cfopPhase) {
              setScramble("");
            }
            setCFOPPhase(phase);
          }}
        >
          <MenuItem value="cross">Cross</MenuItem>
          <MenuItem value="f2l">F2L</MenuItem>
          <MenuItem value="firstLookOll">First look OLL</MenuItem>
          <MenuItem value="secondLookOll">Second look OLL</MenuItem>
          <MenuItem value="oll">Full OLL</MenuItem>
          <MenuItem value="firstLookPll">First look PLL</MenuItem>
          <MenuItem value="secondLookPll">Second look PLL</MenuItem>
          <MenuItem value="pll">Full PLL</MenuItem>
        </Select>
      </FormControl>
      <CubePreview
        scrambleCode={scramble}
        filter={filters[cfopPhase]}
        colorMap={invertedColorMap}
      />
      <ButtonRow>
        <Button variant="contained" onClick={onSendBtnClick}>
          <FormattedMessage id="scramble.actions.scramble" />
        </Button>

        <Tooltip arrow title={tooltipText}>
          <span>
            <Button
              variant="contained"
              disabled={!Boolean(scramble) || !Boolean(props.robotServer)}
              onClick={() => executeScramble(props.robotServer, scramble)}
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

export const ConnectedCFOPScramble = connect((state: ApplicationState) => ({
  robotServer: getRobotServer(state),
}))(CFOPScramble);
