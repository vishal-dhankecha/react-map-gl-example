import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { DEFAULT_GEO_JSON } from "../const";

interface State {
  value: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
}

const initialState: State = {
  value: DEFAULT_GEO_JSON
};

export const geojsonSlice = createSlice({
  name: "geojson",
  initialState,
  reducers: {
    addFeature: (state, action) => {
      state.value.features.push(action.payload);
    }
  }
});

export const { addFeature } = geojsonSlice.actions;

export const selectGeojson = (state: RootState) => state.geojson.value;

export default geojsonSlice.reducer;
