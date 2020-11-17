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
  it(`contains header text`, () => {
    render(<Home />);

    expect(screen.getByText("IP Address Tracker")).toBeDefined();
  });
});
