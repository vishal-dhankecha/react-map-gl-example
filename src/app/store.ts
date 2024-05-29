import { configureStore } from "@reduxjs/toolkit";
import pointSlice from "../features/pointSlice";
import geojsonSlice from "../features/geojsonSlice";

export const store = configureStore({
  reducer: {
    point: pointSlice,
    geojson: geojsonSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
