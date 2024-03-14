import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  changeCavePosition,
  changeCaveSpeed,
  switchGameStatus,
} from "../../store/gameSlice.ts";
import {
  PREPARATION_STATUS,
  SPEED_DOWN,
  SPEED_UP,
  START_STATUS,
} from "../../constants.ts";

interface Props {
  walls: number[][];
  wallHeight: number;
  caveWidth: number;
}

export const Cave = ({ walls, wallHeight, caveWidth }: Props) => {
  const { gameStatus, caveSpeed, cavePosition } = useAppSelector(
    (state) => state.gameMatch
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStatus, caveSpeed]);

  useEffect(() => {
    if (gameStatus === START_STATUS) {
      const intervalId = setInterval(
        () => {
          dispatch(changeCavePosition());
        },
        caveSpeed === 0 ? 100 : 100 / caveSpeed
      );

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameStatus, caveSpeed]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      if (gameStatus === PREPARATION_STATUS) {
        dispatch(switchGameStatus(START_STATUS));
        dispatch(changeCaveSpeed(SPEED_UP));
      }

      if (gameStatus === START_STATUS && caveSpeed < maxSpeed) {
        dispatch(changeCaveSpeed(SPEED_UP));
      }
    }

    if (event.key === "ArrowUp") {
      if (gameStatus === START_STATUS && caveSpeed > minSpeed) {
        dispatch(changeCaveSpeed(SPEED_DOWN));
      }
    }
  };

  return (
    <svg
      width="100%"
      height={wallHeight * walls.length}
      style={{ transform: `translateY(${cavePosition}px)` }}
    >
      {walls.map((wall, index) => {
        const leftWidth = caveWidth / 2 + wall[0];
        const rightWidth = caveWidth / 2 - wall[1];
        const wallY = index * wallHeight;

        if (isNaN(leftWidth) || isNaN(rightWidth)) {
          return null;
        }

        return (
          <React.Fragment key={index}>
            <rect
              x={0}
              y={wallY}
              width={leftWidth}
              height={wallHeight}
              fill="rgba(31, 41, 53, 1)"
            />
            <rect
              x={caveWidth - rightWidth}
              y={wallY}
              width={rightWidth}
              height={wallHeight}
              fill="rgba(31, 41, 53, 1)"
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
};

const maxSpeed = 7;
const minSpeed = 1;
