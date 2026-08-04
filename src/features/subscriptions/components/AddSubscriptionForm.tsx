import { type FormEvent, useEffect, useRef, useState } from "react";
import { parseAmountToCents } from "../domain/parseAmountToCents";
import { BILLING_FREQUENCIES, type BillingFrequency, type NewSubscription } from "../domain/types";
import "./AddSubscriptionForm.css";

type AddSubscriptionFormProps = Readonly<{
  onSubmit: (subscription: NewSubscription) => void;
  onCancel: () => void;
}>;

type FormErrors = Readonly<{
  name?: string;
  amount?: string;
  billingFrequency?: string;
}>;

const billingFrequencyLabels: Record<BillingFrequency, string> = {
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
};

function AddSubscriptionForm({ onSubmit, onCancel }: AddSubscriptionFormProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [billingFrequency, setBillingFrequency] = useState<BillingFrequency | "">("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = name.trim();
    const amountInCents = parseAmountToCents(amount);

    const nextErrors: FormErrors = {
      name: normalizedName ? undefined : "Enter a subscription name.",
      amount:
        amountInCents === null
          ? "Enter an amount greater than €0 with at most two decimals."
          : undefined,
      billingFrequency: billingFrequency ? undefined : "Choose a billing frequency.",
    };

    setErrors(nextErrors);

    if (!normalizedName || amountInCents === null || !billingFrequency) {
      return;
    }

    onSubmit({
      name: normalizedName,
      amountInCents,
      billingFrequency,
    });
  }

  function clearError(field: keyof FormErrors) {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  return (
    <section
      className="add-subscription-panel"
      id="add-subscription-panel"
      aria-labelledby="add-subscription-heading"
    >
      <header className="add-subscription-panel__header">
        <div>
          <p className="add-subscription-panel__eyebrow">New recurring expense</p>

          <h2 id="add-subscription-heading">Add a subscription</h2>
        </div>

        <p>Add the basic billing information. More details can be introduced later.</p>
      </header>

      <form className="add-subscription-form" onSubmit={handleSubmit} noValidate>
        <div className="add-subscription-form__field">
          <label htmlFor="subscription-name">Subscription name</label>

          <input
            ref={nameInputRef}
            id="subscription-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearError("name");
            }}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "subscription-name-error" : undefined}
          />

          {errors.name && (
            <span
              className="add-subscription-form__error"
              id="subscription-name-error"
              role="alert"
            >
              {errors.name}
            </span>
          )}
        </div>

        <div className="add-subscription-form__field">
          <label htmlFor="subscription-amount">Billing amount</label>

          <div className="add-subscription-form__amount">
            <span aria-hidden="true">€</span>

            <input
              id="subscription-amount"
              name="amount"
              type="text"
              inputMode="decimal"
              value={amount}
              placeholder="12,99"
              onChange={(event) => {
                setAmount(event.target.value);
                clearError("amount");
              }}
              aria-invalid={errors.amount ? true : undefined}
              aria-describedby={[
                "subscription-amount-hint",
                errors.amount ? "subscription-amount-error" : undefined,
              ]
                .filter(Boolean)
                .join(" ")}
            />
          </div>

          <span className="add-subscription-form__hint" id="subscription-amount-hint">
            Enter the amount charged for each billing period.
          </span>

          {errors.amount && (
            <span
              className="add-subscription-form__error"
              id="subscription-amount-error"
              role="alert"
            >
              {errors.amount}
            </span>
          )}
        </div>

        <div className="add-subscription-form__field">
          <label htmlFor="subscription-frequency">Billing frequency</label>

          <select
            id="subscription-frequency"
            name="billingFrequency"
            value={billingFrequency}
            onChange={(event) => {
              setBillingFrequency(event.target.value as BillingFrequency | "");
              clearError("billingFrequency");
            }}
            aria-invalid={errors.billingFrequency ? true : undefined}
            aria-describedby={errors.billingFrequency ? "subscription-frequency-error" : undefined}
          >
            <option value="">Choose a frequency</option>

            {BILLING_FREQUENCIES.map((frequency) => (
              <option key={frequency} value={frequency}>
                {billingFrequencyLabels[frequency]}
              </option>
            ))}
          </select>

          {errors.billingFrequency && (
            <span
              className="add-subscription-form__error"
              id="subscription-frequency-error"
              role="alert"
            >
              {errors.billingFrequency}
            </span>
          )}
        </div>

        <div className="add-subscription-form__actions">
          <button className="add-subscription-form__cancel" type="button" onClick={onCancel}>
            Cancel
          </button>

          <button className="add-subscription-form__submit" type="submit">
            Save subscription
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddSubscriptionForm;
