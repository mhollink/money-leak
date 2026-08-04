import type { Subscription } from "./types";

export function getActiveSubscriptions(subscriptions: readonly Subscription[]): Subscription[] {
  return subscriptions.filter((subscription) => subscription.status === "active");
}
