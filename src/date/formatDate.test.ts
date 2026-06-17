import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate("2026-01-15")).toMatch(/Jan/);
  });
});
