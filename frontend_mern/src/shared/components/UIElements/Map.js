import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";

const Map = (props) => {
  const { lat, lng } = props.coordinates;
  const zoom = props.zoom;

  return (
    <MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[lat, lng]}>
        <Popup>
          Coordenadas <br /> {lat} , {lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
