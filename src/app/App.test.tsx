import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SUBSCRIPTIONS_STORAGE_KEY } from "../features/subscriptions/data/localStorageSubscriptionRepository";
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

    expect(
      screen.getByRole("article", {
        name: "Discord Nitro",
      }),
    ).toBeInTheDocument();
  });

  it("adds a subscription to the overview", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: "Add subscription" }));
    await user.type(screen.getByRole("textbox", { name: "Subscription name" }), "YouTube Premium");
    await user.type(screen.getByRole("textbox", { name: "Billing amount" }), "120");
    await user.selectOptions(screen.getByRole("combobox", { name: "Billing frequency" }), "yearly");
    await user.click(screen.getByRole("button", { name: "Save subscription" }));

    const addedSubscription = screen.getByRole("article", { name: "YouTube Premium" });

    expect(addedSubscription).toBeInTheDocument();
    expect(within(addedSubscription).getByText("€ 10,00")).toBeInTheDocument();
    expect(within(addedSubscription).getAllByText("€ 120,00")).toHaveLength(2);
    expect(within(addedSubscription).getByText("€ 120,00 per year")).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Add a subscription",
      }),
    ).not.toBeInTheDocument();
  });

  it("restores an added subscription after remounting", async () => {
    const user = userEvent.setup();

    const firstRender = render(<App />);

    await user.click(screen.getByRole("button", { name: "Add subscription" }));
    await user.type(screen.getByRole("textbox", { name: "Subscription name" }), "GitHub Copilot");
    await user.type(screen.getByRole("textbox", { name: "Billing amount" }), "10");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Billing frequency" }),
      "monthly",
    );
    await user.click(screen.getByRole("button", { name: "Save subscription" }));

    await waitFor(() => {
      expect(localStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY)).not.toBeNull();
    });

    firstRender.unmount();

    render(<App />);

    expect(screen.getByRole("article", { name: "GitHub Copilot" })).toBeInTheDocument();
  });

  it("continues with fallback data when stored data is invalid", () => {
    localStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, "{invalid-json");

    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Active subscriptions" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("article", { name: "Discord Nitro" })).toBeInTheDocument();
  });

  it("loads stored subscriptions when the application starts", () => {
    localStorage.setItem(
      SUBSCRIPTIONS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        subscriptions: [
          {
            id: "stored-subscription",
            name: "Stored subscription",
            amountInCents: 2_500,
            billingFrequency: "quarterly",
            status: "active",
          },
        ],
      }),
    );

    render(<App />);

    expect(screen.getByRole("article", { name: "Stored subscription" })).toBeInTheDocument();

    expect(screen.queryByRole("article", { name: "Discord Nitro" })).not.toBeInTheDocument();
  });
});
