import { useEffect, useRef, useState } from "react";
import { formatMoney } from "../../../shared/money/formatMoney";
import {
  calculateMonthlyAmountInCents,
  calculateYearlyAmountInCents,
  getBillingFrequencyLabel,
} from "../domain/subscriptionCalculations";
import { getActiveSubscriptions } from "../domain/subscriptionSelectors";
import type { NewSubscription, Subscription } from "../domain/types";
import AddSubscriptionForm from "./AddSubscriptionForm";
import "./SubscriptionOverview.css";

type SubscriptionOverviewProps = Readonly<{
  subscriptions: readonly Subscription[];
  onAddSubscription: (subscription: NewSubscription) => void;
}>;

function SubscriptionOverview({ subscriptions, onAddSubscription }: SubscriptionOverviewProps) {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const wasAddFormOpen = useRef(false);

  const activeSubscriptions = getActiveSubscriptions(subscriptions);

  useEffect(() => {
    if (wasAddFormOpen.current && !isAddFormOpen) {
      addButtonRef.current?.focus();
    }

    wasAddFormOpen.current = isAddFormOpen;
  }, [isAddFormOpen]);

  function handleAddSubscription(newSubscription: NewSubscription) {
    onAddSubscription(newSubscription);
    setIsAddFormOpen(false);
  }

  return (
    <section className="subscription-overview" aria-labelledby="subscriptions-heading">
      <header className="subscription-overview__header">
        <div className="subscription-overview__introduction">
          <p className="subscription-overview__eyebrow">Recurring expenses</p>

          <h1 id="subscriptions-heading">Active subscriptions</h1>

          <p>
            Review what you currently pay and see the monthly and yearly impact of each recurring
            expense.
          </p>
        </div>

        <div className="subscription-overview__tools">
          <button
            ref={addButtonRef}
            className="subscription-overview__add-button"
            type="button"
            aria-expanded={isAddFormOpen}
            aria-controls="add-subscription-panel"
            onClick={() => setIsAddFormOpen(true)}
          >
            Add subscription
          </button>

          <div className="subscription-overview__count" aria-live="polite">
            <strong>{activeSubscriptions.length}</strong>
            <span>
              active {activeSubscriptions.length === 1 ? "subscription" : "subscriptions"}
            </span>
          </div>
        </div>
      </header>

      {isAddFormOpen && (
        <AddSubscriptionForm
          onSubmit={handleAddSubscription}
          onCancel={() => setIsAddFormOpen(false)}
        />
      )}

      {activeSubscriptions.length === 0 ? (
        <SubscriptionsEmptyState />
      ) : (
        <ul className="subscription-list">
          {activeSubscriptions
            .sort(
              (a, b) =>
                calculateMonthlyAmountInCents(b.amountInCents, b.billingFrequency) -
                calculateMonthlyAmountInCents(a.amountInCents, a.billingFrequency),
            )
            .map((subscription) => (
              <SubscriptionListItem key={subscription.id} subscription={subscription} />
            ))}
        </ul>
      )}
    </section>
  );
}

type SubscriptionListItemProps = Readonly<{
  subscription: Subscription;
}>;

function SubscriptionListItem({ subscription }: SubscriptionListItemProps) {
  const headingId = `subscription-${subscription.id}`;

  const monthlyAmount = calculateMonthlyAmountInCents(
    subscription.amountInCents,
    subscription.billingFrequency,
  );

  const yearlyAmount = calculateYearlyAmountInCents(
    subscription.amountInCents,
    subscription.billingFrequency,
  );

  return (
    <li className="subscription-list__item">
      <article className="subscription-card" aria-labelledby={headingId}>
        <header className="subscription-card__header">
          <div>
            <span className="subscription-card__status">Active</span>
            <h2 id={headingId}>{subscription.name}</h2>
          </div>

          <div className="subscription-card__original-amount">
            <strong>{formatMoney(subscription.amountInCents)}</strong>
            <span>{getBillingFrequencyLabel(subscription.billingFrequency)}</span>
          </div>
        </header>

        <dl className="subscription-card__details">
          <div>
            <dt>Billing</dt>
            <dd>
              {formatMoney(subscription.amountInCents)}{" "}
              {getBillingFrequencyLabel(subscription.billingFrequency)}
            </dd>
          </div>

          <div>
            <dt>Monthly equivalent</dt>
            <dd>{formatMoney(monthlyAmount)}</dd>
          </div>

          <div>
            <dt>Yearly equivalent</dt>
            <dd>{formatMoney(yearlyAmount)}</dd>
          </div>
        </dl>
      </article>
    </li>
  );
}

function SubscriptionsEmptyState() {
  return (
    <div className="subscriptions-empty-state">
      <div className="subscriptions-empty-state__symbol" aria-hidden="true">
        0
      </div>

      <div>
        <h2>No active subscriptions</h2>
        <p>Your active subscriptions will appear here once they have been registered.</p>
      </div>
    </div>
  );
}

export default SubscriptionOverview;
