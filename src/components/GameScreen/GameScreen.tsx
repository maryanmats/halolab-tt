import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { resetAllInfo, updateScore } from "../../store/gameSlice.ts";
import {
  START_STATUS,
  WIN_STATUS,
  LOSE_STATUS,
  PLAYERS_DATA,
} from "../../constants.ts";
import useCaveData from "../../hooks/useGetCaves.ts";
import { Cave, Drone, InfoBar, Modal, Loader, Speedometer } from "../index.ts";

export const GameScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { caveSpeed, complexity, gameStatus, playerName, score } =
    useAppSelector((state) => state.gameMatch);
  const { caveData, error } = useCaveData(playerName, complexity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEnoughData(caveData.length)) {
      setIsLoading(false);
    }
  }, [caveData, error]);

  useEffect(() => {
    let scoreInterval: NodeJS.Timeout | undefined;

    if (gameStatus === START_STATUS) {
      scoreInterval = setInterval(() => {
        dispatch(updateScore(scoreHandle(5, caveSpeed, complexity)));
      }, 300);
    }

    return () => {
      if (scoreInterval) {
        clearInterval(scoreInterval);
      }
    };
  }, [gameStatus, caveSpeed]);

  const onGameFinishHandle = () => {
    if (gameStatus === WIN_STATUS) {
      const playerResultInfo = {
        name: playerName,
        difficultyLevel: complexity,
        finalScore: score,
      };
      const winners = JSON.parse(localStorage.getItem(PLAYERS_DATA) || "[]");

      winners.push(playerResultInfo);
      localStorage.setItem(PLAYERS_DATA, JSON.stringify(winners));
    }

    dispatch(resetAllInfo());
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div
        id="cave"
        style={{
          position: "relative",
          margin: "0 auto",
          minWidth: "500px",
          maxWidth: "500px",
        }}
      >
        <Cave walls={caveData} wallHeight={caveHeight} caveWidth={caveWidth} />
        <Drone />
      </div>
      <InfoBar />
      <Speedometer />
      <Modal
        className="bg-indigo-600 p-4 rounded-lg shadow-lg z-3 relative w-1/3 flex flex-col"
        isOpen={gameStatus === LOSE_STATUS}
        onClose={onGameFinishHandle}
      >
        <span className="text-center block text-white text-2xl">
          Don't worry! You can try again!
        </span>
      </Modal>
      <Modal
        className="bg-emerald-700 p-4 rounded-lg shadow-lg z-3 relative w-1/3 flex flex-col"
        isOpen={gameStatus === WIN_STATUS}
        onClose={onGameFinishHandle}
      >
        <span className="text-center block text-white text-xl">
          You are winner! Congratulations! :)
        </span>
      </Modal>
    </div>
  );
};

const caveWidth = 500;
const caveHeight = 10;

const scoreHandle = (
  scoreMultiplier: number,
  droneVerticalSpeed: number,
  complexity: number
) => scoreMultiplier * (droneVerticalSpeed + Number(complexity));

const isEnoughData = (caveDataLength: number) => {
  const windowHeight = window.innerHeight;

  return caveDataLength * caveHeight > windowHeight;
};
