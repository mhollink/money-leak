import type { BillingFrequency } from "./types";

const paymentsPerYear: Record<BillingFrequency, number> = {
  weekly: 52,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
};

const billingFrequencyLabels: Record<BillingFrequency, string> = {
  weekly: "per week",
  monthly: "per month",
  quarterly: "per quarter",
  yearly: "per year",
};

export function calculateYearlyAmountInCents(
  amountInCents: number,
  billingFrequency: BillingFrequency,
): number {
  return amountInCents * paymentsPerYear[billingFrequency];
}

export function calculateMonthlyAmountInCents(
  amountInCents: number,
  billingFrequency: BillingFrequency,
): number {
  return calculateYearlyAmountInCents(amountInCents, billingFrequency) / 12;
}

export function getBillingFrequencyLabel(billingFrequency: BillingFrequency): string {
  return billingFrequencyLabels[billingFrequency];
}
