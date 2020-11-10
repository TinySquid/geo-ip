// React
import React from "react";

// Leaflet
import { MapContainer, TileLayer } from "react-leaflet";

export default function MapBox({ options, children }) {
  return (
    <div>
      {typeof window !== "undefined" ? (
        <MapContainer {...options}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {children}
        </MapContainer>
      ) : null}
    </div>
  );
}
