import { useState, useEffect } from "react";
import { INIT_GAME_URL, CAVE_URL } from "../constants.ts";
import axios from "axios";

type PlayerData = {
  idPlayer: string;
  token: string;
};

type CaveData = {
  caveData: number[][];
  error: Error | null;
};

async function fetchPlayerData(
  title: string,
  complexity: number,
): Promise<PlayerData> {
  try {
    const { data } = await axios.post(`${INIT_GAME_URL}/init`, {
      name: title,
      complexity: complexity,
    });

    const idPlayer = data.id;
    const tokenParts: string[] = [];

    for (let i = 1; i <= 4; i++) {
      const response = await axios.get(
        `${INIT_GAME_URL}/token/${i}?id=${idPlayer}`,
      );

      const chunk: string = response.data.chunk;

      tokenParts.push(chunk);
    }

    const token: string = tokenParts.join("");

    return { idPlayer, token };
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export default function useCaveData(
  title: string,
  complexity: number,
): CaveData {
  const [caveData, setCaveData] = useState<number[][]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    (async function () {
      if (socket) {
        return;
      }

      try {
        const { idPlayer, token } = await fetchPlayerData(title, complexity);

        const newSocket = new WebSocket(`${CAVE_URL}/cave`);
        setSocket(newSocket);

        newSocket.onopen = () => {
          newSocket!.send(`player:${idPlayer}-${token}`);
        };

        newSocket.onmessage = (event: MessageEvent) => {
          const data = event.data;
          const [leftWall, rightWall = NaN] = data.split(",").map(Number);

          setCaveData((prevState) => [...prevState, [leftWall, rightWall]]);
        };
      } catch (error) {
        setError(error as Error);
      }
    })();

    return () => {
      socket?.close();
    };
  }, [socket]);

  return { caveData, error };
}
