import React from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: require("../assets/images/marker.png"),
  iconSize: [35, 35],
  iconAnchor: [18, 35],
  popupAnchor: [0, -35],
});

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const Map = ({ coords }) => {
  return (
    <MapContainer center={coords} zoom={13}>
      {coords && <SetViewOnClick coords={coords} />}
      <TileLayer
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.TILE_KEY}`}
      />
      <Marker icon={icon} position={coords}></Marker>
    </MapContainer>
  );
};

export default Map;
