import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("shows the Money Leak subscription overview", () => {
    render(<App />);

    expect(
      screen.getByRole("link", {
        name: "Money Leak",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Active subscriptions",
      }),
    ).toBeInTheDocument();
  });
});
