import type { Subscription } from "../domain/types";

export const subscriptions: readonly Subscription[] = [
  {
    id: "spotify",
    name: "Spotify",
    amountInCents: 1_199,
    billingFrequency: "monthly",
    status: "active",
  },
  {
    id: "runescape-membership",
    name: "RuneScape membership",
    amountInCents: 7_999,
    billingFrequency: "yearly",
    status: "active",
  },
  {
    id: "domain-registration",
    name: "Domain registration",
    amountInCents: 1_499,
    billingFrequency: "yearly",
    status: "active",
  },
  {
    id: "minecraft-server",
    name: "Minecraft server",
    amountInCents: 800,
    billingFrequency: "monthly",
    status: "cancelled",
  },
];
