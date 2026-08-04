import { describe, expect, it } from "vitest";
import {
  calculateMonthlyAmountInCents,
  calculateYearlyAmountInCents,
  getBillingFrequencyLabel,
} from "./subscriptionCalculations";
import type { BillingFrequency } from "./types";

describe("calculateYearlyAmountInCents", () => {
  it.each<{
    billingFrequency: BillingFrequency;
    amountInCents: number;
    expectedAmountInCents: number;
  }>([
    {
      billingFrequency: "weekly",
      amountInCents: 500,
      expectedAmountInCents: 26_000,
    },
    {
      billingFrequency: "monthly",
      amountInCents: 1_000,
      expectedAmountInCents: 12_000,
    },
    {
      billingFrequency: "quarterly",
      amountInCents: 3_000,
      expectedAmountInCents: 12_000,
    },
    {
      billingFrequency: "yearly",
      amountInCents: 12_000,
      expectedAmountInCents: 12_000,
    },
  ])(
    "converts a $billingFrequency amount to its yearly equivalent",
    ({ amountInCents, billingFrequency, expectedAmountInCents }) => {
      expect(calculateYearlyAmountInCents(amountInCents, billingFrequency)).toBe(
        expectedAmountInCents,
      );
    },
  );
});

describe("calculateMonthlyAmountInCents", () => {
  it("preserves monthly amounts", () => {
    expect(calculateMonthlyAmountInCents(1_399, "monthly")).toBe(1_399);
  });

  it("divides yearly amounts over twelve months", () => {
    expect(calculateMonthlyAmountInCents(12_000, "yearly")).toBe(1_000);
  });

  it("supports fractional cents for derived weekly amounts", () => {
    expect(calculateMonthlyAmountInCents(500, "weekly")).toBeCloseTo(2_166.67, 2);
  });
});

describe("getBillingFrequencyLabel", () => {
  it.each<{
    billingFrequency: BillingFrequency;
    expectedLabel: string;
  }>([
    {
      billingFrequency: "weekly",
      expectedLabel: "per week",
    },
    {
      billingFrequency: "monthly",
      expectedLabel: "per month",
    },
    {
      billingFrequency: "quarterly",
      expectedLabel: "per quarter",
    },
    {
      billingFrequency: "yearly",
      expectedLabel: "per year",
    },
  ])(
    "returns $expectedLabel for $billingFrequency billing",
    ({ billingFrequency, expectedLabel }) => {
      expect(getBillingFrequencyLabel(billingFrequency)).toBe(expectedLabel);
    },
  );
});
