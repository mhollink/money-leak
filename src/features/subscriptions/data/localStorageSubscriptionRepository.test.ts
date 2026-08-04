import { beforeEach, describe, expect, it } from "vitest";
import type { Subscription } from "../domain/types";
import {
  createLocalStorageSubscriptionRepository,
  SUBSCRIPTIONS_STORAGE_KEY,
} from "./localStorageSubscriptionRepository";

const subscription: Subscription = {
  id: "youtube-premium",
  name: "YouTube Premium",
  amountInCents: 1_399,
  billingFrequency: "monthly",
  status: "active",
};

describe("localStorageSubscriptionRepository", () => {
  const repository = createLocalStorageSubscriptionRepository(localStorage);

  beforeEach(() => {
    localStorage.clear();
  });

  it("reports empty storage when nothing has been saved", () => {
    expect(repository.load()).toEqual({
      status: "empty",
    });
  });

  it("saves and restores subscriptions", () => {
    expect(repository.save([subscription])).toBe(true);

    expect(repository.load()).toEqual({
      status: "loaded",
      subscriptions: [subscription],
    });
  });

  it("stores the current data version", () => {
    repository.save([subscription]);

    const storedValue = localStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY);

    expect(storedValue).not.toBeNull();

    expect(JSON.parse(storedValue ?? "")).toEqual({
      version: 1,
      subscriptions: [subscription],
    });
  });

  it("handles malformed JSON", () => {
    localStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, "{not-valid-json");

    expect(repository.load()).toEqual({
      status: "invalid",
    });
  });

  it("handles an invalid stored structure", () => {
    localStorage.setItem(
      SUBSCRIPTIONS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        subscriptions: "not-an-array",
      }),
    );

    expect(repository.load()).toEqual({
      status: "invalid",
    });
  });

  it("handles invalid subscriptions", () => {
    localStorage.setItem(
      SUBSCRIPTIONS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        subscriptions: [
          {
            id: "invalid",
            name: "",
            amountInCents: -10,
            billingFrequency: "sometimes",
            status: "unknown",
          },
        ],
      }),
    );

    expect(repository.load()).toEqual({
      status: "invalid",
    });
  });

  it("does not load unsupported storage versions", () => {
    localStorage.setItem(
      SUBSCRIPTIONS_STORAGE_KEY,
      JSON.stringify({
        version: 2,
        subscriptions: [subscription],
      }),
    );

    expect(repository.load()).toEqual({
      status: "unsupported",
    });
  });

  it("supports an intentionally empty subscription list", () => {
    localStorage.setItem(
      SUBSCRIPTIONS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        subscriptions: [],
      }),
    );

    expect(repository.load()).toEqual({
      status: "loaded",
      subscriptions: [],
    });
  });
});
