// React
import React from "react";
import { render, screen, act } from "@testing-library/react";

// Mocks
import { useStaticQuery } from "gatsby";
import mockAxios from "axios";

// Components
import Home from "../index";

beforeAll(() => {
  // Component uses env vars so we need to mock those too
  process.env = {
    GATSBY_GET_LOCAL_IP_ENDPOINT: "local_ip_endpoint",
    GATSBY_GET_IP_LOCATION_ENDPOINT: "location_endpoint",
  };

  // Mock for <Layout /> in page component
  useStaticQuery.mockImplementation(() => {
    return {
      site: {
        siteMetadata: {
          title: `Geo IP`,
        },
      },
    };
  });

  // Mock API responses
  mockAxios.get.mockImplementation((url) => {
    switch (url) {
      // First async api call mock response
      case process.env.GATSBY_GET_LOCAL_IP_ENDPOINT:
        return Promise.resolve({
          data: {
            success: true,
            req: "8.8.8.8",
          },
        });

      // Second call mock response uses ip from first as url
      case `${process.env.GATSBY_GET_IP_LOCATION_ENDPOINT}?host=8.8.8.8`:
        return Promise.resolve({
          data: {
            success: true,
            ip: "8.8.8.8",
            location: "Mountain View, California 94041",
            timezone: "UTC -8:00",
            isp: "Level 3 Communications",
            latlon: ["37.42290", "-122.08500"],
            timestamp: new Date().setHours(0, 0, 0, 0),
          },
        });

      default:
        return Promise.reject(new Error("NO MATCHING URL MOCK FOR:", url));
    }
  });
});

describe("App Page", () => {
  it(`contains proper header text`, async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByText("IP Address Locator")).toBeDefined();
  });

  it(`contains <SearchBox>`, async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByPlaceholderText(/ip address/i)).toBeDefined();
  });

  it(`contains <InfoPanel> with mock data from api`, async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByText("8.8.8.8")).toBeDefined();
    expect(screen.getByText("Mountain View, California 94041")).toBeDefined();
    expect(screen.getByText("UTC -8:00")).toBeDefined();
    expect(screen.getByText("Level 3 Communications")).toBeDefined();
  });

  it(`contains <MapBox>`, async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByText("Leaflet")).toBeDefined();
    expect(screen.getByText("OpenStreetMap")).toBeDefined();
  });
});
