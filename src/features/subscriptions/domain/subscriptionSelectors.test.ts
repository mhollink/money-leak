import { describe, expect, it } from "vitest";
import { getActiveSubscriptions } from "./subscriptionSelectors";
import type { Subscription } from "./types";

const activeSubscription: Subscription = {
  id: "active",
  name: "Active subscription",
  amountInCents: 1_000,
  billingFrequency: "monthly",
  status: "active",
};

const cancelledSubscription: Subscription = {
  id: "cancelled",
  name: "Cancelled subscription",
  amountInCents: 1_000,
  billingFrequency: "monthly",
  status: "cancelled",
};

describe("getActiveSubscriptions", () => {
  it("returns active subscriptions", () => {
    expect(getActiveSubscriptions([activeSubscription, cancelledSubscription])).toEqual([
      activeSubscription,
    ]);
  });

  it("returns an empty array when no active subscriptions exist", () => {
    expect(getActiveSubscriptions([cancelledSubscription])).toEqual([]);
  });

  it("does not modify the supplied array", () => {
    const subscriptions = [cancelledSubscription, activeSubscription];

    getActiveSubscriptions(subscriptions);

    expect(subscriptions).toEqual([cancelledSubscription, activeSubscription]);
  });
});
