import React from "react";
import { render, screen } from "@testing-library/react";
import Hello from "./Hello";

describe("Hello", () => {
  it("renders greeting with the provided person name", () => {
    const personName = "World";
    render(<Hello person={personName} />);
    expect(screen.getByText(`Hello ${personName}`)).toBeInTheDocument();
  });
});
