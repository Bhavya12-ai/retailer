import { calculatePoints } from "./calculatePoints";

describe("calculatePoints utility", () => {
  it("returns 0 points for amounts at or below $50", () => {
    expect(calculatePoints(0)).toBe(0);
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(49.99)).toBe(0);
  });

  it("calculates 1 point per whole dollar between $50 and $100", () => {
    expect(calculatePoints(51)).toBe(1);
    expect(calculatePoints(60)).toBe(10);
    expect(calculatePoints(99.99)).toBe(49);
  });

  it("calculates 2 points per whole dollar over $100 plus the $50–$100 band", () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(150)).toBe(150);
    expect(calculatePoints(101.5)).toBe(52);
  });

  it("handles fractional dollar amounts by using whole dollars only", () => {
    expect(calculatePoints(100.75)).toBe(50);
    expect(calculatePoints(100.01)).toBe(50);
  });

  it("returns 0 points for negative amounts", () => {
    expect(calculatePoints(-10)).toBe(0);
    expect(calculatePoints(-0.5)).toBe(0);
  });

  it("handles edge cases around the threshold values", () => {
    expect(calculatePoints(50.99)).toBe(0);
    expect(calculatePoints(100)).toBe(50);
    expect(calculatePoints(100.99)).toBe(50);
  });
});
