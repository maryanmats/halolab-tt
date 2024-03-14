import { useAppSelector } from "../../hooks/redux.ts";

export const Speedometer = () => {
  const { caveSpeed, droneSpeed } = useAppSelector((state) => state.gameMatch);

  return (
    <div className="fixed flex items-center gap-4 right-4 top-4 bg-gray-800 text-white p-4 rounded-lg">
      <div className="p-4 bg-gray-600 rounded-xl ">
        <p>
          VerticalSpeed:
          <span className="block text-7xl text-center">{caveSpeed}</span>
        </p>
      </div>
      <div className="p-4 bg-gray-600 rounded-xl">
        <p>
          HorizontalSpeed:
          <span className="block text-7xl text-center">
            {droneSpeed > 0 && `${droneSpeed}>`}
            {droneSpeed < 0 && `<${Math.abs(droneSpeed)}`}
            {droneSpeed === 0 && droneSpeed}
          </span>
        </p>
      </div>
    </div>
  );
};
