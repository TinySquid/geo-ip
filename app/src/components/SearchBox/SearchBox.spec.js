// React
import React from "react";
import { render, screen } from "@testing-library/react";

// Components
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it(`Renders input`, () => {
    render(<SearchBox />);

    expect(screen.getByPlaceholderText(/ip address/i)).toBeDefined();
  });

  it(`Renders submit button`, () => {
    render(<SearchBox />);

    expect(screen.getByLabelText("Submit")).toBeDefined();
  });
});
