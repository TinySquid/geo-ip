// React
import React, { useEffect } from "react";

// Leaflet
import { Marker, Popup, useMap } from "react-leaflet";

export default function LiveMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (map && position) {
      map.setView(position, map.getZoom());
    }
  }, [position]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        ~LAT {position[0]} | ~LON {position[1]}
      </Popup>
    </Marker>
  );
}
