import type { Subscription } from "../domain/types";

export type LoadSubscriptionsResult =
  | Readonly<{
      status: "loaded";
      subscriptions: Subscription[];
    }>
  | Readonly<{
      status: "empty" | "invalid" | "unsupported";
    }>;

export type SubscriptionRepository = Readonly<{
  load: () => LoadSubscriptionsResult;
  save: (subscriptions: readonly Subscription[]) => boolean;
}>;
