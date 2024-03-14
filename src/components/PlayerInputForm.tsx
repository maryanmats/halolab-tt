import React, { useState } from "react";
import { Button, StepWrapper, WithInputLabel } from "./index.ts";
import { useAppDispatch } from "../hooks/redux.ts";
import {
  switchGameStep,
  updateComplexity,
  updatePlayerName,
} from "../store/gameSlice.ts";
import { GAME_SCREEN_STEP } from "../constants.ts";

export const PlayerInputForm = () => {
  const [title, setTitle] = useState("");
  const [complexity, setGameComplexity] = useState(0);

  const dispatch = useAppDispatch();

  const titleHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const complexityHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameComplexity(+e.target.value);
  };

  const formHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updatePlayerName(title));
    dispatch(updateComplexity(complexity));
    dispatch(switchGameStep(GAME_SCREEN_STEP));
  };

  return (
    <StepWrapper>
      <form className="flex flex-col items-center w-full" onSubmit={formHandle}>
        <WithInputLabel label="Username">
          <input
            className="bg-transparent text-s border border-white p-2 rounded-md outline-0 text-white"
            type="text"
            placeholder="Please write your name"
            onChange={titleHandle}
          />
        </WithInputLabel>
        <WithInputLabel label="Complexity">
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full">
              <span className="mr-1 text-sm text-white">0</span>
              <input
                className="w-full"
                type="range"
                min={0}
                max={10}
                value={complexity}
                step={1}
                onChange={complexityHandle}
              />
              <span className="ml-1 text-sm text-white">10</span>
            </div>
            <span className="text-sm text-white">
              Selected complexity: {complexity}
            </span>
          </div>
        </WithInputLabel>

        <Button
          label="Submit"
          type="submit"
          disable={title.length < 2 || title.length > 15}
        />
      </form>
    </StepWrapper>
  );
};
