import { describe, expect, it } from "vitest";
import { minorUnitsToMajorUnits } from "./minorUnitsToMajorUnits";

describe("minorUnitsToMajorUnits", () => {
  it("converts cents to euros", () => {
    expect(minorUnitsToMajorUnits(1399)).toBe(13.99);
  });

  it("preserves a zero amount", () => {
    expect(minorUnitsToMajorUnits(0)).toBe(0);
  });
});
