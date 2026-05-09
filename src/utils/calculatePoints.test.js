import { calculatePoints } from "./calculatePoints";

describe("calculatePoints utility", () => {
  it("returns 0 points for amounts at or below $50", () => {
    expect(calculatePoints(0)).toBe(0);
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(49.99)).toBe(0);
  });

  it("returns 0 points for negative values", () => {
    expect(calculatePoints(-1)).toBe(0);
    expect(calculatePoints(-50.5)).toBe(0);
    expect(calculatePoints(-100)).toBe(0);
  });

  it("calculates points correctly for whole-dollar amounts and positive scenarios", () => {
    expect(calculatePoints(51)).toBe(1);
    expect(calculatePoints(75)).toBe(25);
    expect(calculatePoints(120)).toBe(90);
  });

  it("calculates points correctly for fractional amounts by using whole dollars only", () => {
    expect(calculatePoints(100.75)).toBe(50);
    expect(calculatePoints(101.5)).toBe(52);
    expect(calculatePoints(120.99)).toBe(90);
  });

  it("handles thresholds and mixed reward tiers accurately", () => {
    expect(calculatePoints(100)).toBe(50);
    expect(calculatePoints(150)).toBe(150);
    expect(calculatePoints(100.01)).toBe(50);
  });
});
