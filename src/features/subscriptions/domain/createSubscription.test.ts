import { describe, expect, it } from "vitest";
import { createSubscription } from "./createSubscription";

describe("createSubscription", () => {
  it("creates an active subscription", () => {
    expect(
      createSubscription(
        {
          name: "YouTube Premium",
          amountInCents: 1_399,
          billingFrequency: "monthly",
        },
        "1e2078ff-bf33-4f03-804f-07d7a9a456a3",
      ),
    ).toEqual({
      id: "1e2078ff-bf33-4f03-804f-07d7a9a456a3",
      name: "YouTube Premium",
      amountInCents: 1_399,
      billingFrequency: "monthly",
      status: "active",
    });
  });
});
