import * as L from "../../../_snowpack/pkg/leaflet.js";
import React from "../../../_snowpack/pkg/react.js";
import {point, featureCollection} from "../../../_snowpack/pkg/@turf/helpers.js";
import {MapContainer, TileLayer, Marker, Popup} from "../../../_snowpack/pkg/react-leaflet.js";
const TOTAL_SENSORS = "Total Sensors";
function sanitiseSensorsToGeoJsonFeature(data) {
  const dataByBoxId = {};
  data?.forEach((sensor) => {
    const boxKey = sensor.box_id;
    const sensorKey = sensor.id;
    if (dataByBoxId.hasOwnProperty(boxKey)) {
      const hasSensor = dataByBoxId[boxKey].properties.sensors.hasOwnProperty(sensorKey);
      if (hasSensor) {
        dataByBoxId[boxKey].properties.sensors[sensorKey].push(sensor);
      } else {
        dataByBoxId[boxKey].properties.sensors[sensorKey] = [sensor];
      }
    } else {
      const coords = [sensor.longitude, sensor.latitude];
      const properties = {
        id: boxKey,
        sensors: {
          [sensorKey]: [sensor]
        }
      };
      dataByBoxId[boxKey] = point(coords, properties);
    }
  });
  return Object.values(dataByBoxId);
}
function Map({data}) {
  const sensorBoxes = React.useMemo(() => data ? sanitiseSensorsToGeoJsonFeature(data) : [], [data]);
  return data ? /* @__PURE__ */ React.createElement(MapContainer, {
    bounds: L.geoJSON(featureCollection(sensorBoxes)).getBounds(),
    style: {position: "absolute", top: 0, bottom: 0, width: "100%"},
    zoom: 13
  }, /* @__PURE__ */ React.createElement(TileLayer, {
    attribution: '\xA9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }), sensorBoxes.map((box) => /* @__PURE__ */ React.createElement(Marker, {
    key: box.properties.id,
    position: [box.geometry.coordinates[1], box.geometry.coordinates[0]]
  }, /* @__PURE__ */ React.createElement(Popup, null, box.properties.id, /* @__PURE__ */ React.createElement("br", null), " ", TOTAL_SENSORS, ": ", Object.keys(box.properties.sensors).length)))) : null;
}
export default Map;
