// React
import React from "react";
import { render, screen } from "@testing-library/react";

// Components
import InfoPanel from "./InfoPanel";

describe("InfoPanel", () => {
  it(`Renders sections from props`, () => {
    render(
      <InfoPanel
        data={[
          { header: "ip address", text: "192.212.174.101" },
          { header: "location", text: "Brooklyn, NY 10001" },
          { header: "timezone", text: "UTC -05:00" },
          { header: "isp", text: "SpaceX Starlink" },
        ]}
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
