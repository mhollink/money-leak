import { describe, expect, it } from "vitest";
import { formatMoney } from "./formatMoney";

describe("formatMoney", () => {
  it("converts the number to euros", () => {
    expect(formatMoney(2465)).toBe("€ 24,65");
  });
});
