import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GAME_SCREEN_STEP,
  LOSE_STATUS,
  PLAYER_FORM_STEP,
  PREPARATION_STATUS,
  SCOREBOARD_STEP,
  SPEED_DOWN,
  SPEED_UP,
  START_STATUS,
  WIN_STATUS,
} from "../constants.ts";

interface InitialState {
  playerName: string;
  complexity: number;
  gameStep:
    | typeof SCOREBOARD_STEP
    | typeof PLAYER_FORM_STEP
    | typeof GAME_SCREEN_STEP;
  gameStatus:
    | typeof PREPARATION_STATUS
    | typeof START_STATUS
    | typeof LOSE_STATUS
    | typeof WIN_STATUS;
  score: number;
  caveSpeed: number;
  cavePosition: number;
  droneSpeed: number;
  dronePosition: number;
}

const initialState: InitialState = {
  playerName: "",
  complexity: 0,
  gameStep: SCOREBOARD_STEP,
  gameStatus: PREPARATION_STATUS,
  score: 0,
  caveSpeed: 0,
  cavePosition: 0,
  droneSpeed: 0,
  dronePosition: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    switchGameStep: (
      state,
      action: PayloadAction<
        | typeof SCOREBOARD_STEP
        | typeof PLAYER_FORM_STEP
        | typeof GAME_SCREEN_STEP
      >,
    ) => {
      state.gameStep = action.payload;
    },
    switchGameStatus: (
      state,
      action: PayloadAction<
        | typeof PREPARATION_STATUS
        | typeof START_STATUS
        | typeof LOSE_STATUS
        | typeof WIN_STATUS
      >,
    ) => {
      state.gameStatus = action.payload;
    },
    updatePlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
    updateComplexity: (state, action: PayloadAction<number>) => {
      state.complexity = action.payload;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    changeCaveSpeed: (
      state,
      action: PayloadAction<typeof SPEED_DOWN | typeof SPEED_UP>,
    ) => {
      if (action.payload === SPEED_UP) {
        state.caveSpeed += 1;
      }

      if (action.payload === SPEED_DOWN) {
        state.caveSpeed -= 1;
      }
    },
    changeCavePosition: (state) => {
      state.cavePosition -= 1;
    },
    changeDronePosition: (state, action: PayloadAction<number>) => {
      state.dronePosition += action.payload;
    },
    changeDroneSpeed: (state, action: PayloadAction<number>) => {
      state.droneSpeed = action.payload;
    },
    resetAllInfo: (state) => {
      state.playerName = "";
      state.complexity = 0;
      state.gameStep = SCOREBOARD_STEP;
      state.gameStatus = PREPARATION_STATUS;
      state.score = 0;
      state.caveSpeed = 0;
      state.cavePosition = 0;
      state.droneSpeed = 0;
      state.dronePosition = 0;
    },
  },
});

export const {
  switchGameStep,
  switchGameStatus,
  updateComplexity,
  updatePlayerName,
  updateScore,
  changeCaveSpeed,
  changeCavePosition,
  changeDronePosition,
  changeDroneSpeed,
  resetAllInfo,
} = gameSlice.actions;

export default gameSlice.reducer;
