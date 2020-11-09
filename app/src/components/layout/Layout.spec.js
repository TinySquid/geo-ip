// React
import React from "react";
import { render, screen } from "@testing-library/react";

// Mocks
import { useStaticQuery } from "gatsby";

// Components
import Layout from "./Layout";

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

describe("Layout", () => {
  it(`Renders children`, () => {
    render(
      <Layout>
        <p data-testid="child">Hello World</p>
      </Layout>
    );

    expect(screen.getByTestId("child")).toBeDefined();
  });
});
