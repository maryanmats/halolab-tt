import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice.ts";

export const store = configureStore({
  reducer: {
    gameMatch: gameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
