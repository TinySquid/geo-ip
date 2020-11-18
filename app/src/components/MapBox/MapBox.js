// React
import React from "react";

// Leaflet
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

const isDomAvailable = typeof window !== "undefined" && window.document;

if (isDomAvailable) {
  // To get around an issue with the default icon not being set up right between using React
  // and importing the leaflet library, we need to reset the image imports
  // See https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
}

export default function MapBox({ options, children }) {
  if (!isDomAvailable) {
    return (
      <div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div>
      <MapContainer {...options}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  );
}
