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

describe("Index", () => {
  it(`contains 'Hello World!' text`, () => {
    render(<Home />);

    expect(screen.getByText("Hello World!")).toBeDefined();
  });
});
