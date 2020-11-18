// React
import React from "react";
import { render, screen } from "@testing-library/react";

// Mocks
import { useStaticQuery } from "gatsby";

// Components
import Home from "../index";

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      site: {
        siteMetadata: {
          title: `Geo IP`,
        },
      },
    };
  });
});

describe("App Page", () => {
  it(`contains proper header text`, () => {
    render(<Home />);

    expect(screen.getByText("IP Address Tracker")).toBeDefined();
  });

  it(`contains SearchBox`, () => {
    render(<Home />);

    // PLACEHOLDER text - so its specific to inputs in this page
    expect(screen.getByPlaceholderText(/ip address/i)).toBeDefined();
  });

  it(`contains InfoPanel`, () => {
    render(<Home />);

    // IP section
    expect(screen.getByText("192.212.174.101")).toBeDefined();

    // Location
    expect(screen.getByText("Brooklyn, NY 10001")).toBeDefined();

    // Timezone
    expect(screen.getByText("UTC -05:00")).toBeDefined();

    // ISP
    expect(screen.getByText("SpaceX Starlink")).toBeDefined();
  });

  it(`contains MapBox`, () => {
    render(<Home />);

    expect(screen.getByText("Leaflet")).toBeDefined();
    expect(screen.getByText("OpenStreetMap")).toBeDefined();
  });
});
