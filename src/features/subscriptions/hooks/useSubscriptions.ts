import { useEffect, useRef, useState } from "react";
import { localStorageSubscriptionRepository } from "../data/localStorageSubscriptionRepository";
import type { SubscriptionRepository } from "../data/subscriptionRepository";
import { subscriptions as defaultSubscriptions } from "../data/subscriptions";
import { createSubscription } from "../domain/createSubscription";
import type { NewSubscription, Subscription } from "../domain/types";

type UseSubscriptionsOptions = Readonly<{
  repository?: SubscriptionRepository;
  fallbackSubscriptions?: readonly Subscription[];
}>;

type UseSubscriptionsResult = Readonly<{
  subscriptions: readonly Subscription[];
  addSubscription: (subscription: NewSubscription) => void;
}>;

export function useSubscriptions({
  repository = localStorageSubscriptionRepository,
  fallbackSubscriptions = defaultSubscriptions,
}: UseSubscriptionsOptions = {}): UseSubscriptionsResult {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() =>
    loadInitialSubscriptions(repository, fallbackSubscriptions),
  );

  const initialSubscriptions = useRef(subscriptions);

  useEffect(() => {
    if (subscriptions === initialSubscriptions.current) {
      return;
    }

    repository.save(subscriptions);
  }, [repository, subscriptions]);

  function addSubscription(newSubscription: NewSubscription) {
    setSubscriptions((currentSubscriptions) => [
      ...currentSubscriptions,
      createSubscription(newSubscription),
    ]);
  }

  return {
    subscriptions,
    addSubscription,
  };
}

function loadInitialSubscriptions(
  repository: SubscriptionRepository,
  fallbackSubscriptions: readonly Subscription[],
): Subscription[] {
  const result = repository.load();

  if (result.status === "loaded") {
    return result.subscriptions;
  }

  return [...fallbackSubscriptions];
}
