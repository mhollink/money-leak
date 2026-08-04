import { minorUnitsToMajorUnits } from "./minorUnitsToMajorUnits";

const euroFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export function formatMoney(amountInCents: number): string {
  return euroFormatter.format(minorUnitsToMajorUnits(amountInCents));
}
