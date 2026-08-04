import {
  BILLING_FREQUENCIES,
  type BillingFrequency,
  type Subscription,
  type SubscriptionStatus,
} from "../domain/types";
import type { LoadSubscriptionsResult, SubscriptionRepository } from "./subscriptionRepository";

export const SUBSCRIPTIONS_STORAGE_KEY = "money-leak.subscriptions";

const CURRENT_STORAGE_VERSION = 1;

type StoredSubscriptions = Readonly<{
  version: number;
  subscriptions: readonly Subscription[];
}>;

export function createLocalStorageSubscriptionRepository(storage: Storage): SubscriptionRepository {
  return {
    load(): LoadSubscriptionsResult {
      try {
        const storedValue = storage.getItem(SUBSCRIPTIONS_STORAGE_KEY);

        if (storedValue === null) {
          return {
            status: "empty",
          };
        }

        const parsedValue: unknown = JSON.parse(storedValue);

        if (!isRecord(parsedValue)) {
          return {
            status: "invalid",
          };
        }

        if (typeof parsedValue.version !== "number") {
          return {
            status: "invalid",
          };
        }

        if (parsedValue.version !== CURRENT_STORAGE_VERSION) {
          return {
            status: "unsupported",
          };
        }

        const storedSubscriptions = parsedValue.subscriptions;

        if (!Array.isArray(storedSubscriptions) || !storedSubscriptions.every(isSubscription)) {
          return {
            status: "invalid",
          };
        }

        return {
          status: "loaded",
          subscriptions: storedSubscriptions,
        };
      } catch {
        return {
          status: "invalid",
        };
      }
    },

    save(subscriptions: readonly Subscription[]): boolean {
      try {
        const storedSubscriptions: StoredSubscriptions = {
          version: CURRENT_STORAGE_VERSION,
          subscriptions,
        };

        storage.setItem(SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify(storedSubscriptions));

        return true;
      } catch {
        return false;
      }
    },
  };
}

function isSubscription(value: unknown): value is Subscription {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    typeof value.amountInCents === "number" &&
    Number.isInteger(value.amountInCents) &&
    value.amountInCents > 0 &&
    isBillingFrequency(value.billingFrequency) &&
    isSubscriptionStatus(value.status)
  );
}

function isBillingFrequency(value: unknown): value is BillingFrequency {
  return (
    typeof value === "string" &&
    BILLING_FREQUENCIES.some((billingFrequency) => billingFrequency === value)
  );
}

function isSubscriptionStatus(value: unknown): value is SubscriptionStatus {
  return value === "active" || value === "cancelled";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export const localStorageSubscriptionRepository = createLocalStorageSubscriptionRepository(
  window.localStorage,
);
