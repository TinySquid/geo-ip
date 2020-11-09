// React
import React from "react";
import { render, screen } from "@testing-library/react";

// Components
import InfoPanel from "./InfoPanel";

describe("InfoPanel", () => {
  it(`Renders the 4 sections`, () => {
    render(<InfoPanel />);

    expect(screen.getByText(/^IP ADDRESS$/i)).toBeDefined();
    expect(screen.getByText(/^LOCATION$/i)).toBeDefined();
    expect(screen.getByText(/^TIMEZONE$/i)).toBeDefined();
    expect(screen.getByText(/^ISP$/i)).toBeDefined();
  });

  it(`Renders data from props`, () => {
    render(
      <InfoPanel
        data={{
          ip: "192.212.174.101",
          location: "Brooklyn, NY 10001",
          timezone: "UTC -05:00",
          isp: "SpaceX Starlink",
        }}
      />
    );

    // Data from props should be displayed by component
    // IP section
    expect(screen.getByText("192.212.174.101")).toBeDefined();

    // Location
    expect(screen.getByText("Brooklyn, NY 10001")).toBeDefined();

    // Timezone
    expect(screen.getByText("UTC -05:00")).toBeDefined();

    // ISP
    expect(screen.getByText("SpaceX Starlink")).toBeDefined();
  });
});
