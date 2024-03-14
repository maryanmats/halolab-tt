import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux.ts";
import { switchGameStep } from "../../store/gameSlice.ts";
import { PLAYER_FORM_STEP, PLAYERS_DATA } from "../../constants.ts";
import { Button, ScoreboardTable, StepWrapper } from "../index.ts";

export const Scoreboard = () => {
  const [winners, setWinners] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const winnersString = localStorage.getItem(PLAYERS_DATA);
    const winners = JSON.parse(winnersString || "[]");

    setWinners(winners);
  }, []);

  const onClickHandle = () => {
    dispatch(switchGameStep(PLAYER_FORM_STEP));
  };

  return (
    <StepWrapper>
      <div className="mb-6 w-full">
        {winners.length > 0 ? (
          <ScoreboardTable winners={winners} />
        ) : (
          <span className="text-xl text-white text-center block">
            You will be first, so let's start
          </span>
        )}
      </div>
      <Button label="Play" onClick={onClickHandle} />
    </StepWrapper>
  );
};
