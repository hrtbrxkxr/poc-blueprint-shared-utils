import { describe, expect, it } from "vitest";
import { round } from "./formatNumber";

describe("round", () => {
  it("rounds to two decimals by default", () => {
    expect(round(1.2345)).toBe(1.23);
  });
});
