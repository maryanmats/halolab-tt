# Cave Drone Game

![Cave Drone Game](https://maryanmats.github.io/halolab-tt/)

## Introduction

This repository contains the frontend implementation of a simple game where the player controls a drone navigating through a cave. The goal of the game is to reach the end of the cave without crashing into the walls.

## Gameplay

- The player controls the drone using arrow keys: left/right for horizontal movement and up/down for vertical movement.
- The drone's vertical movement is represented by the cave scrolling upward.
- The game ends when the drone either successfully reaches the end of the cave or crashes into a wall.
- Score is incremented each time the drone passes a wall segment, based on a formula considering the chosen difficulty level and drone speed.

## Features

- **SVG-Based Visualization:** The cave and drone visualization is implemented using SVG primitives.
- **Player Interaction:** Players can control the drone using arrow keys for movement.
- **Scoreboard:** Displays the player's name, difficulty level, and final score for completed games.
- **LocalStorage:** Game session data is stored locally and displayed on the scoreboard.

## Server Interaction

The game interacts with a server to generate the cave shape data. The server provides cave shape data through a WebSocket connection.

## Server Endpoints

- **POST /init:** Initializes the game session.
- **GET /token/:chunkNo:** Retrieves chunks of the player's token.
- **WebSocket /cave:** Receives cave shape data.

For more details about server interaction, refer to the [Server Documentation](https://cave-drone-server.shtoa.xyz).

## Technologies Used

- React
- Redux Toolkit
- TypeScript
- Vite
- Axios
- Socket.io

## How to Run

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Access the game at `http://localhost:3000`.

## Credits

This game is created as a test task for Halolab by [Maryan Mats](https://github.com/maryanmats).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
