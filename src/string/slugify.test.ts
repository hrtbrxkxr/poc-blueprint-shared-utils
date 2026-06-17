import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("converts spaces and symbols to hyphens", () => {
    expect(slugify("Module A: BMI Calculator!")).toBe("module-a-bmi-calculator");
  });
});
