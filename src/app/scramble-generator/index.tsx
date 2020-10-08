import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
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

import { generateScramble } from "app/common/cube/scramblers/full";
import { generateOLLScramble } from "app/common/cube/scramblers/oll";
import { getGANEncoding } from "app/common/cube/libs/gan-encoder";
import { crossSolver } from "app/common/cube/solvers/cross-solver";
import { CubePreview } from "app/cube-preview";
import { generatePLLScramble } from "app/common/cube/scramblers/pll";

const SCRAMBLE_SERVICE_UUID = 0xfff0;
const SCRAMBLE_CHARACTERISTIC_UUID = 0xfff3;

interface ScrambleGeneratorProps {
  robotServer: BluetoothRemoteGATTServer | null;
}

type ScrambleType = "full" | "f2l" | "oll" | "pll";

export function ScrambleGenerator(props: ScrambleGeneratorProps): JSX.Element {
  const [scrambleType, setScrambleType] = useState<ScrambleType>("full");
  const [scramble, setScramble] = useState<string | null>(null);
  return (
    <div className="flex-col items-start">
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
          <FormControlLabel value="f2l" control={<Radio />} label="F2L" />
          <FormControlLabel value="oll" control={<Radio />} label="OLL" />
          <FormControlLabel value="pll" control={<Radio />} label="PLL" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        onClick={() => {
          switch (scrambleType) {
            case "full":
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
        <FormattedMessage id="scrambleGenerator.actions.generate" />
      </Button>
      {scramble && (
        <>
          <Typography variant="body1">{scramble}</Typography>
          <CubePreview scrambleCode={scramble} />
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
                    getGANEncoding(scramble)
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
    </div>
  );
}

export const ScrambleGeneratorContainer = connect(
  (state: ApplicationState) => ({
    robotServer: getRobotServer(state),
  })
)(ScrambleGenerator);
