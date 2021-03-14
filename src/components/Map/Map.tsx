import * as L from 'leaflet';
import React, { ReactElement } from 'react';
import { point, featureCollection } from '@turf/helpers';
import type { Feature, Point } from '@turf/helpers';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { SensorReading } from '../../services/useSensorReadingsQuery';

type Properties = {
  id: string;
  sensors: Record<string, SensorReading[]>;
};

type SensorPointFeature = Feature<Point, Properties>;

const TOTAL_SENSORS = 'Total Sensors';

function sanitiseSensorsToGeoJsonFeature(
  data: SensorReading[],
): SensorPointFeature[] {
  const dataByBoxId: Record<string, SensorPointFeature> = {};

  data?.forEach((sensor) => {
    const boxKey = sensor.box_id;
    const sensorKey = sensor.id;
    if (dataByBoxId.hasOwnProperty(boxKey)) {
      const hasSensor = dataByBoxId[boxKey].properties.sensors.hasOwnProperty(
        sensorKey,
      );

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
          [sensorKey]: [sensor],
        },
      };
      dataByBoxId[boxKey] = point(coords, properties);
    }
  });

  return Object.values(dataByBoxId);
}

type Props = {
  data?: SensorReading[];
};

function Map({ data }: Props): ReactElement | null {
  // note: Memoise because there could be 8000 rows - SFR 2021-03-14
  const sensorBoxes = React.useMemo(
    () => (data ? sanitiseSensorsToGeoJsonFeature(data) : []),
    [data],
  );

  return data ? (
    <MapContainer
      bounds={L.geoJSON(featureCollection(sensorBoxes)).getBounds()}
      style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sensorBoxes.map((box) => (
        <Marker
          key={box.properties.id}
          position={
            // note: leaflet uses lng/lat. Geojson is lat/lng - SFR 2021-03-14
            [box.geometry.coordinates[1], box.geometry.coordinates[0]] as [
              number,
              number,
            ]
          }
        >
          <Popup>
            {box.properties.id}
            <br /> {TOTAL_SENSORS}: {Object.keys(box.properties.sensors).length}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : null;
}

export default Map;
