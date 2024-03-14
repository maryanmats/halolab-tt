import { useAppSelector } from "./hooks/redux.ts";
import { Scoreboard, PlayerInputForm, GameScreen } from "./components/index.ts";

import {
  SCOREBOARD_STEP,
  PLAYER_FORM_STEP,
  GAME_SCREEN_STEP,
} from "./constants.ts";
import { RootState } from "./store/store.ts";

function App() {
  const { gameStep } = useAppSelector((state: RootState) => state.gameMatch);

  const gameStepsComponents: Record<string, JSX.Element> = {
    [SCOREBOARD_STEP]: <Scoreboard />,
    [PLAYER_FORM_STEP]: <PlayerInputForm />,
    [GAME_SCREEN_STEP]: <GameScreen />,
  };

  return (
    <div className={"w-screen min-h-screen bg-amber-200 px-2"}>
      {gameStepsComponents[gameStep]}
    </div>
  );
}

export default App;
