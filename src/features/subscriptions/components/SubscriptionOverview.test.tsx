import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Subscription } from "../domain/types";
import SubscriptionOverview from "./SubscriptionOverview";

const activeSubscription: Subscription = {
  id: "spotify",
  name: "Spotify",
  amountInCents: 1_199,
  billingFrequency: "monthly",
  status: "active",
};

const yearlySubscription: Subscription = {
  id: "runescape",
  name: "RuneScape membership",
  amountInCents: 7_999,
  billingFrequency: "yearly",
  status: "active",
};

const cancelledSubscription: Subscription = {
  id: "minecraft",
  name: "Minecraft server",
  amountInCents: 800,
  billingFrequency: "monthly",
  status: "cancelled",
};

describe("SubscriptionOverview", () => {
  it("shows active subscriptions", () => {
    renderOverview([activeSubscription, yearlySubscription, cancelledSubscription]);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Active subscriptions",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("article", {
        name: "Spotify",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("article", {
        name: "RuneScape membership",
      }),
    ).toBeInTheDocument();
  });

  it("excludes cancelled subscriptions", () => {
    renderOverview([activeSubscription, cancelledSubscription]);

    expect(screen.getByText("Spotify")).toBeInTheDocument();
    expect(screen.queryByText("Minecraft server")).not.toBeInTheDocument();
  });

  it("shows the original, monthly, and yearly amounts", () => {
    renderOverview([activeSubscription]);

    const subscription = screen.getByRole("article", {
      name: "Spotify",
    });

    expect(within(subscription).getAllByText("€ 11,99")).toHaveLength(2);
    expect(within(subscription).getByText("€ 143,88")).toBeInTheDocument();
    expect(within(subscription).getByText("per month")).toBeInTheDocument();
  });

  it("shows an empty state when no active subscriptions exist", () => {
    renderOverview([cancelledSubscription]);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "No active subscriptions",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/your active subscriptions will appear here/i)).toBeInTheDocument();
  });

  it("starts and cancels the add-subscription flow", async () => {
    const user = userEvent.setup();

    renderOverview([activeSubscription]);

    await user.click(
      screen.getByRole("button", {
        name: "Add subscription",
      }),
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Add a subscription",
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Add a subscription",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Add subscription",
      }),
    ).toHaveFocus();
  });

  it("renders the subscription overview consistently", () => {
    const { asFragment } = renderOverview([activeSubscription, yearlySubscription]);

    expect(asFragment()).toMatchSnapshot();
  });
});

function renderOverview(subscriptions: readonly Subscription[]) {
  const onAddSubscription = vi.fn();

  const component = render(
    <SubscriptionOverview subscriptions={subscriptions} onAddSubscription={onAddSubscription} />,
  );

  return {
    onAddSubscription,
    ...component,
  };
}
