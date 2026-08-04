import { useState } from "react";
import SubscriptionOverview from "../features/subscriptions/components/SubscriptionOverview";
import { subscriptions as initialSubscriptions } from "../features/subscriptions/data/subscriptions";
import { createSubscription } from "../features/subscriptions/domain/createSubscription";
import type { NewSubscription, Subscription } from "../features/subscriptions/domain/types";
import "./App.css";

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => [
    ...initialSubscriptions,
  ]);

  function handleAddSubscription(newSubscription: NewSubscription) {
    setSubscriptions((currentSubscriptions) => [
      ...currentSubscriptions,
      createSubscription(newSubscription),
    ]);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="app-header__brand" href="/">
          Money Leak
        </a>

        <span className="app-header__status">Subscription inventory</span>
      </header>

      <main className="app-content">
        <SubscriptionOverview
          subscriptions={subscriptions}
          onAddSubscription={handleAddSubscription}
        />
      </main>

      <footer className="app-footer">
        <p>Money Leak is currently in early development.</p>
      </footer>
    </div>
  );
}

export default App;
