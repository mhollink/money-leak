import type { NewSubscription, Subscription } from "./types";

export function createSubscription(
  newSubscription: NewSubscription,
  id = crypto.randomUUID(),
): Subscription {
  return {
    ...newSubscription,
    id,
    status: "active",
  };
}
