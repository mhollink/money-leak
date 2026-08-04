const MONEY_PATTERN = /^\d+(?:[.,]\d{1,2})?$/;

export function parseAmountToCents(value: string): number | null {
  const trimmedValue = value.trim();

  if (!MONEY_PATTERN.test(trimmedValue)) {
    return null;
  }

  const normalizedValue = trimmedValue.replace(",", ".");
  const amountInCents = Math.round(Number(normalizedValue) * 100);

  return amountInCents > 0 ? amountInCents : null;
}
