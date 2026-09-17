import type { CodeMapResponse } from "@/lib/types/codemap";

const exhaustive: CodeMapResponse = {
  title: "CUSTOMER-ORDER-PROCESSOR",
  summary:
    "Processes incoming customer orders, validates account and inventory data, " +
    "calculates totals, handles payment decisions, and produces the final order output.",

  mermaid: "",

  nodes: [
    {
      id: "start",
      label: "START",
      type: "start",
      description: "Entry point for the order processing program.",
    },
    {
      id: "read-order",
      label: "READ ORDER",
      type: "input",
      description:
        "Reads the incoming order record from the transaction input file.",
    },
    {
      id: "validate-customer",
      label: "VALIDATE CUSTOMER",
      type: "process",
      description:
        "Retrieves the customer record and validates account status, " +
        "credit eligibility, and required customer information.",
    },
    {
      id: "customer-valid",
      label: "CUSTOMER VALID?",
      type: "decision",
      description:
        "Determines whether the customer exists and is eligible to place an order.",
    },
    {
      id: "reject-customer",
      label: "REJECT ORDER",
      type: "output",
      description:
        "Writes a rejected order response with the customer validation failure reason.",
    },
    {
      id: "check-inventory",
      label: "CHECK INVENTORY",
      type: "process",
      description:
        "Checks inventory levels for every item in the requested order.",
    },
    {
      id: "inventory-available",
      label: "INVENTORY AVAILABLE?",
      type: "decision",
      description:
        "Determines whether all requested items can be fulfilled immediately.",
    },
    {
      id: "backorder",
      label: "CREATE BACKORDER",
      type: "process",
      description:
        "Creates a backorder record for unavailable items and continues processing.",
    },
    {
      id: "calculate-total",
      label: "CALCULATE TOTAL",
      type: "process",
      description:
        "Calculates item totals, discounts, taxes, shipping, and the final order amount.",
    },
    {
      id: "payment",
      label: "PROCESS PAYMENT",
      type: "process",
      description:
        "Submits the calculated order amount to the configured payment processor.",
    },
    {
      id: "payment-success",
      label: "PAYMENT SUCCESSFUL?",
      type: "decision",
      description:
        "Checks the payment processor response before committing the order.",
    },
    {
      id: "payment-failed",
      label: "PAYMENT FAILED",
      type: "output",
      description:
        "Returns a payment failure response and records the failed transaction.",
    },
    {
      id: "save-order",
      label: "SAVE ORDER",
      type: "process",
      description:
        "Persists the completed order, payment reference, and fulfillment status.",
    },
    {
      id: "generate-confirmation",
      label: "GENERATE CONFIRMATION",
      type: "output",
      description:
        "Generates the final customer order confirmation and fulfillment message.",
    },
    {
      id: "end",
      label: "END",
      type: "end",
      description: "Order processing is complete.",
    },
  ],

  edges: [
    {
      from_id: "start",
      to_id: "read-order",
      label: "",
    },
    {
      from_id: "read-order",
      to_id: "validate-customer",
      label: "ORDER RECEIVED",
    },
    {
      from_id: "validate-customer",
      to_id: "customer-valid",
      label: "",
    },
    {
      from_id: "customer-valid",
      to_id: "reject-customer",
      label: "NO",
    },
    {
      from_id: "customer-valid",
      to_id: "check-inventory",
      label: "YES",
    },
    {
      from_id: "check-inventory",
      to_id: "inventory-available",
      label: "",
    },
    {
      from_id: "inventory-available",
      to_id: "backorder",
      label: "NO",
    },
    {
      from_id: "inventory-available",
      to_id: "calculate-total",
      label: "YES",
    },
    {
      from_id: "backorder",
      to_id: "calculate-total",
      label: "CONTINUE",
    },
    {
      from_id: "calculate-total",
      to_id: "payment",
      label: "TOTAL READY",
    },
    {
      from_id: "payment",
      to_id: "payment-success",
      label: "",
    },
    {
      from_id: "payment-success",
      to_id: "payment-failed",
      label: "NO",
    },
    {
      from_id: "payment-success",
      to_id: "save-order",
      label: "YES",
    },
    {
      from_id: "save-order",
      to_id: "generate-confirmation",
      label: "SAVED",
    },
    {
      from_id: "generate-confirmation",
      to_id: "end",
      label: "COMPLETE",
    },
    {
      from_id: "reject-customer",
      to_id: "end",
      label: "REJECTED",
    },
    {
      from_id: "payment-failed",
      to_id: "end",
      label: "FAILED",
    },
  ],
};

const simple: CodeMapResponse = {
  title: "ACCOUNT-BALANCE",
  summary: "Reads an account, validates it, and returns the current balance.",
  mermaid: "",
  nodes: [
    {
      id: "start",
      label: "START",
      type: "start",
      description: "Program entry point.",
    },
    {
      id: "read",
      label: "READ ACCOUNT",
      type: "input",
      description: "Reads the account record.",
    },
    {
      id: "lookup",
      label: "LOOK UP BALANCE",
      type: "process",
      description: "Retrieves the current account balance.",
    },
    {
      id: "output",
      label: "RETURN BALANCE",
      type: "output",
      description: "Returns the account balance to the caller.",
    },
    {
      id: "end",
      label: "END",
      type: "end",
      description: "Processing complete.",
    },
  ],
  edges: [
    { from_id: "start", to_id: "read", label: "" },
    { from_id: "read", to_id: "lookup", label: "" },
    { from_id: "lookup", to_id: "output", label: "SUCCESS" },
    { from_id: "output", to_id: "end", label: "" },
  ],
};

const decisionHeavy: CodeMapResponse = {
  title: "PAYMENT-VALIDATION",
  summary:
    "Validates payment information through multiple decision points before approval.",
  mermaid: "",
  nodes: [
    {
      id: "start",
      label: "START",
      type: "start",
      description: "Payment validation entry point.",
    },
    {
      id: "input",
      label: "READ PAYMENT",
      type: "input",
      description: "Reads payment details from the transaction.",
    },
    {
      id: "valid",
      label: "DATA VALID?",
      type: "decision",
      description: "Checks required payment fields.",
    },
    {
      id: "fraud",
      label: "FRAUD CHECK",
      type: "process",
      description: "Runs configured fraud detection rules.",
    },
    {
      id: "approved",
      label: "APPROVED?",
      type: "decision",
      description: "Determines whether the payment can proceed.",
    },
    {
      id: "success",
      label: "PAYMENT APPROVED",
      type: "output",
      description: "Returns a successful payment response.",
    },
    {
      id: "failure",
      label: "PAYMENT DECLINED",
      type: "output",
      description: "Returns a declined payment response.",
    },
    {
      id: "end",
      label: "END",
      type: "end",
      description: "Payment validation complete.",
    },
  ],
  edges: [
    { from_id: "start", to_id: "input", label: "" },
    { from_id: "input", to_id: "valid", label: "" },
    { from_id: "valid", to_id: "fraud", label: "YES" },
    { from_id: "valid", to_id: "failure", label: "NO" },
    { from_id: "fraud", to_id: "approved", label: "CHECKED" },
    { from_id: "approved", to_id: "success", label: "YES" },
    { from_id: "approved", to_id: "failure", label: "NO" },
    { from_id: "success", to_id: "end", label: "APPROVED" },
    { from_id: "failure", to_id: "end", label: "DECLINED" },
  ],
};

export const codeMapMocks: Record<string, CodeMapResponse> = {
  exhaustive,
  simple,
  decisions: decisionHeavy,
};

export function getCodeMapMock(analysisId: string): CodeMapResponse {
  return codeMapMocks[analysisId] ?? exhaustive;
}
