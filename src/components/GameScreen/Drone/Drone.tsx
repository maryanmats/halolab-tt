import { useEffect, useRef } from "react";
import { LOSE_STATUS, START_STATUS, WIN_STATUS } from "../../../constants.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import {
  changeDronePosition,
  changeDroneSpeed,
  switchGameStatus,
} from "../../../store/gameSlice.ts";

export const Drone = () => {
  const dispatch = useAppDispatch();
  const { gameStatus, droneSpeed, dronePosition, cavePosition } =
    useAppSelector((state) => state.gameMatch);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, [gameStatus, droneSpeed]);

  useEffect(() => {
    if (gameStatus === START_STATUS) {
      const intervalId = setInterval(
        () => {
          dispatch(changeDronePosition(droneSpeed));
        },
        droneSpeed === 0 ? 100 : 100 / Math.abs(droneSpeed)
      );

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameStatus, droneSpeed]);

  useEffect(() => {
    const rects = document.querySelectorAll("rect");
    const cave = document.querySelector("#cave svg");

    rects.forEach((rect, index) => {
      const rectBox = rect.getBoundingClientRect();

      if (svgRef.current && cave) {
        const svgBox = svgRef.current.getBoundingClientRect();
        const caveBox = cave.getBoundingClientRect();

        const isHorizontalOverlap =
          (index % 2 === 0 && svgBox.left <= rectBox.right) ||
          (index % 2 !== 0 && svgBox.right >= rectBox.left);

        const isVerticalOverlap =
          svgBox.top <= rectBox.bottom && svgBox.bottom >= rectBox.top;

        if (isHorizontalOverlap && isVerticalOverlap) {
          dispatch(switchGameStatus(LOSE_STATUS));
        }

        if (Math.abs(caveBox.y) === caveBox.height) {
          dispatch(switchGameStatus(WIN_STATUS));
        }
      }
    });
  }, [dronePosition, cavePosition]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (gameStatus === START_STATUS) {
      if (event.key === "ArrowLeft" && droneSpeed >= -maxStepSize) {
        dispatch(changeDroneSpeed(droneSpeed - 1));
      }

      if (event.key === "ArrowRight" && droneSpeed <= maxStepSize) {
        dispatch(changeDroneSpeed(droneSpeed + 1));
      }
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <svg
        id="drone"
        className="drone"
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 100 100"
        transform={`translate(${dronePosition}) `}
      >
        <polygon points="0,0 50,100 100,0" fill="green" />
      </svg>
    </div>
  );
};

const maxStepSize = 4;
