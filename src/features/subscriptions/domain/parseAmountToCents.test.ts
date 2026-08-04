import { describe, expect, it } from "vitest";
import { parseAmountToCents } from "./parseAmountToCents";

describe("parseAmountToCents", () => {
  it.each([
    ["12", 1_200],
    ["12,99", 1_299],
    ["12.99", 1_299],
    ["0,01", 1],
    [" 21,50 ", 2_150],
  ])("parses %s as %i cents", (value, expectedAmount) => {
    expect(parseAmountToCents(value)).toBe(expectedAmount);
  });

  it.each(["", "0", "-10", "12,999", "twelve"])("rejects %s", (value) => {
    expect(parseAmountToCents(value)).toBeNull();
  });
});
