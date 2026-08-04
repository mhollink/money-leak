import type { Subscription } from "../domain/types";

export const subscriptions: readonly Subscription[] = [
  {
    id: "discord",
    name: "Discord Nitro",
    amountInCents: 9_99,
    billingFrequency: "monthly",
    status: "active",
  },
  {
    id: "chat-gpt",
    name: "ChatGPT Plus",
    amountInCents: 21_99,
    billingFrequency: "monthly",
    status: "active",
  },
  {
    id: "nest-aware",
    name: "Nest Aware Plus",
    amountInCents: 18_00,
    billingFrequency: "monthly",
    status: "active",
  },
  {
    id: "pokemon-home",
    name: "Pokemon Home",
    amountInCents: 17_99,
    billingFrequency: "yearly",
    status: "active",
  },
  {
    id: "flitsmeister",
    name: "Flitsmeister PRO",
    amountInCents: 2_99,
    billingFrequency: "monthly",
    status: "active",
  },
  {
    id: "runescape-membership",
    name: "RuneScape membership",
    amountInCents: 25_99,
    billingFrequency: "quarterly",
    status: "active",
  },
  {
    id: "stack",
    name: "Stack",
    amountInCents: 21_17,
    billingFrequency: "monthly",
    status: "active",
  },
  {
    id: "hosting",
    name: "Web Hosting @ Vimexx",
    amountInCents: 123_42,
    billingFrequency: "yearly",
    status: "active",
  },
  {
    id: "list-builder",
    name: "MESBG List Builder Domain",
    amountInCents: 29_03 + 72_09,
    billingFrequency: "yearly",
    status: "active",
  },
  {
    id: "hollink-dev",
    name: "Online Portfolio",
    amountInCents: 14_99 + 7_95,
    billingFrequency: "yearly",
    status: "active",
  },
];
