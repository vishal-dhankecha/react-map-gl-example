export const TOKEN =
  "pk.eyJ1Ijoib2tpZWJ1YmJhIiwiYSI6ImNpdHZscGs3ajAwNXYyb284bW4ydWUzbGsifQ.1PoNrSP0F65WolWgqKhV4g";

export const MAP_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        'Map tiles by <a target="_top" rel="noopener" href="https://tile.openstreetmap.org/">OpenStreetMap tile servers</a>, under the <a target="_top" rel="noopener" href="https://operations.osmfoundation.org/policies/tiles/">tile usage policy</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>'
    }
  },
  glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm"
    }
  ]
};

export const INITIAL_VIEW_STATE = {
  latitude: 12.982346810131318,
  longitude: 77.5646653483083,
  zoom: 10
};

export const DEFAULT_GEO_JSON: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
  type: "FeatureCollection",
  features: []
};

export const getPoint = (
  title: string,
  coordinates: number[]
): GeoJSON.Feature => {
  return {
    type: "Feature",
    properties: { title },
    geometry: {
      type: "Point",
      coordinates
    }
  };
};

export const getLineString = (coordinates: number[][]): GeoJSON.Feature => {
  return {
    type: "Feature",
    properties: {
      title: ""
    },
    geometry: {
      type: "LineString",
      coordinates
    }
  };
};

export const pointLayer = {
  id: "measure-points",
  type: "circle",
  source: "geojson",
  paint: {
    "circle-radius": 5,
    "circle-color": "#000"
  },
  filter: ["in", "$type", "Point"]
};

export const LINE_LAYER_CONFIG = {
  id: "measure-lines",
  type: "line",
  source: "geojson",
  layout: {
    "line-cap": "round",
    "line-join": "round"
  },
  paint: {
    "line-color": "#000",
    "line-width": 2.5
  },
  filter: ["in", "$type", "LineString"]
};

export const SYMBOL_LAYER_CONFIG = {
  id: "symbols",
  type: "symbol",
  source: "geojson",
  layout: {
    "symbol-placement": "line-center",
    "text-font": ["Open Sans Regular"],
    "text-field": ["get", "title"],
    "text-size": 14,
    "text-anchor": "bottom"
  },
  paint: {
    "text-color": "#ff0000",
    "text-halo-color": "#ffffff",
    "text-halo-width": 2
  }
};
