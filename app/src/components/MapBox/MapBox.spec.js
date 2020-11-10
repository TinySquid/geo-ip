// React
import React from "react";
import { render, screen } from "@testing-library/react";

// Components
import MapBox from "./MapBox";

describe("MapBox", () => {
  it(`Renders map with given props`, () => {
    render(
      <MapBox
        options={{
          style: { height: "640px", width: "100vw" },
          center: [51.505, -0.09],
          zoom: 15,
          scrollWheelZoom: false,
        }}
      />
    );

    // Component renders when we have zoom controls and the attribution footer visible
    expect(screen.getByLabelText("Zoom in")).toBeDefined();
    expect(screen.getByLabelText("Zoom out")).toBeDefined();

    expect(screen.getByText("Leaflet")).toBeDefined();
    expect(screen.getByText("OpenStreetMap")).toBeDefined();
  });
});
