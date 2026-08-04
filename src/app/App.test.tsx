import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("introduces Money Leak", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Money Leak",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/understand which recurring payments are leaving your account/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Explore the approach",
      }),
    ).toHaveAttribute("href", "#principles");
  });

  it("renders the landing page consistently", () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
