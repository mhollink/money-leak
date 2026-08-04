import SubscriptionOverview from "../features/subscriptions/components/SubscriptionOverview";
import { subscriptions } from "../features/subscriptions/data/subscriptions";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="app-header__brand" href="/">
          Money Leak
        </a>

        <span className="app-header__status">Subscription inventory</span>
      </header>

      <main className="app-content">
        <SubscriptionOverview subscriptions={subscriptions} />
      </main>

      <footer className="app-footer">
        <p>Money Leak is currently in early development.</p>
      </footer>
    </div>
  );
}

export default App;
