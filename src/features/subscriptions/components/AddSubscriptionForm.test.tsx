import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AddSubscriptionForm from "./AddSubscriptionForm";

describe("AddSubscriptionForm", () => {
  it("submits a valid subscription", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<AddSubscriptionForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    await user.type(
      screen.getByRole("textbox", {
        name: "Subscription name",
      }),
      "YouTube Premium",
    );

    await user.type(
      screen.getByRole("textbox", {
        name: "Billing amount",
      }),
      "13,99",
    );

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "Billing frequency",
      }),
      "monthly",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Save subscription",
      }),
    );

    expect(onSubmit).toHaveBeenCalledWith({
      name: "YouTube Premium",
      amountInCents: 1_399,
      billingFrequency: "monthly",
    });
  });

  it("shows validation errors for incomplete input", async () => {
    const user = userEvent.setup();

    render(<AddSubscriptionForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    await user.click(
      screen.getByRole("button", {
        name: "Save subscription",
      }),
    );

    expect(screen.getByText("Enter a subscription name.")).toBeInTheDocument();

    expect(
      screen.getByText("Enter an amount greater than €0 with at most two decimals."),
    ).toBeInTheDocument();

    expect(screen.getByText("Choose a billing frequency.")).toBeInTheDocument();
  });

  it("does not submit invalid monetary input", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<AddSubscriptionForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    await user.type(
      screen.getByRole("textbox", {
        name: "Subscription name",
      }),
      "Example",
    );

    await user.type(
      screen.getByRole("textbox", {
        name: "Billing amount",
      }),
      "-12",
    );

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "Billing frequency",
      }),
      "monthly",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Save subscription",
      }),
    );

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("cancels without submitting", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(<AddSubscriptionForm onSubmit={onSubmit} onCancel={onCancel} />);

    await user.type(
      screen.getByRole("textbox", {
        name: "Subscription name",
      }),
      "Unfinished subscription",
    );

    await user.click(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(onCancel).toHaveBeenCalledOnce();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
