import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface PointProperty {
  title: string;
}

interface PointGeometry {
  type: string;
  coordinates: number[];
}

interface Point {
  type: string;
  properties: PointProperty;
  geometry: PointGeometry;
}

interface State {
  value: Point[];
}

const initialState: State = {
  value: []
};

export const pointSlice = createSlice({
  name: "point",
  initialState,
  reducers: {
    createPoint: (state, action) => {
      const { payload } = action;
      state.value.push(payload);
    }
  }
});

export const { createPoint } = pointSlice.actions;

export const selectPoints = (state: RootState) => state.point.value;
export const lastPoint = (state: RootState) => state.point.value.at(-1);

export default pointSlice.reducer;
