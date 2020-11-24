// React
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

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

  it(`Calls function with field value on submit`, () => {
    const mockIp = "8.8.8.8";
    const searchMock = jest.fn();

    render(<SearchBox initialValue={mockIp} search={searchMock} />);

    fireEvent.click(screen.getByLabelText("Submit"));

    expect(searchMock).toHaveBeenCalledWith(mockIp);
  });
});
