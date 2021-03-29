import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputLabel, OutlinedInput, Tooltip } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { generateScramble } from "core/cube/scramblers/full";
import { ButtonRow, ContentContainer } from "core/components/presentation";

import { getRobotServer } from "app/robot/store/selectors";
import { CubePreview } from "app/cube-preview";
import { scrambleSubmitted } from "app/robot/store/actions";

export const RandomScramble = (): JSX.Element => {
  const [scramble, setScramble] = useState<string>("");
  const robotServer = useSelector(getRobotServer);
  const dispatch = useDispatch();

  const handleSendClick = useCallback(
    () => dispatch(scrambleSubmitted(scramble)),
    [scramble]
  );

  const handleScrambleClick = useCallback(
    () => setScramble(generateScramble()),
    []
  );

  const tooltipText = !Boolean(robotServer)
    ? "Robot not connected"
    : !scramble
    ? "Scramble required"
    : "";

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
        <Button variant="contained" onClick={handleScrambleClick}>
          <FormattedMessage id="scramble.actions.scramble" />
        </Button>

        <Tooltip arrow title={tooltipText}>
          <span>
            <Button
              variant="contained"
              size="large"
              disabled={!scramble || !Boolean(robotServer)}
              onClick={handleSendClick}
              className="flex flex-grow"
            >
              <FormattedMessage id="scramble.actions.send" />
            </Button>
          </span>
        </Tooltip>
      </ButtonRow>
    </ContentContainer>
  );
};
