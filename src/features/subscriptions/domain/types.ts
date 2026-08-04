export const BILLING_FREQUENCIES = ["weekly", "monthly", "quarterly", "yearly"] as const;

export type BillingFrequency = (typeof BILLING_FREQUENCIES)[number];

export type SubscriptionStatus = "active" | "cancelled";

export type Subscription = Readonly<{
  id: string;
  name: string;
  amountInCents: number;
  billingFrequency: BillingFrequency;
  status: SubscriptionStatus;
}>;
