import React, { useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import * as turf from "@turf/turf";
import MapGL, { Source, Layer } from "react-map-gl";
import { Provider } from "react-redux";
import {
  MAP_STYLE,
  TOKEN,
  pointLayer,
  LINE_LAYER_CONFIG,
  SYMBOL_LAYER_CONFIG,
  getPoint,
  getLineString,
  INITIAL_VIEW_STATE
} from "./const";
import { store } from "./app/store";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  createPoint,
  selectPoints,
  lastPoint as selectLastPoint
} from "./features/pointSlice";
import { selectGeojson, addFeature } from "./features/geojsonSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const geojson = useAppSelector(selectGeojson);
  const statPoints = useAppSelector(selectPoints);
  const lastPoint = useAppSelector(selectLastPoint);

  const onClick = useCallback(
    e => {
      const point = getPoint(`Point ${statPoints.length + 1}`, [
        e.lngLat.lng,
        e.lngLat.lat
      ]);
      dispatch(createPoint(point));
      dispatch(addFeature(point));
    },
    [geojson, statPoints]
  );

  useEffect(() => {
    if (statPoints.length > 1) {
      const secondLastPoint = statPoints[statPoints.length - 2];
      const coordinates = [
        secondLastPoint.geometry.coordinates,
        lastPoint.geometry.coordinates
      ];
      const newLine = getLineString(coordinates);
      const distance = turf.length(newLine);
      newLine.properties.title = `${distance.toLocaleString()}km`;
      dispatch(addFeature(newLine));
    }
  }, [statPoints]);

  return (
    <>
      <MapGL
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={TOKEN}
        onClick={onClick}
      >
        <Source id="lines" type="geojson" data={geojson}>
          <Layer {...pointLayer} />
          <Layer {...LINE_LAYER_CONFIG} />
          <Layer {...SYMBOL_LAYER_CONFIG} />
        </Source>
      </MapGL>
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
