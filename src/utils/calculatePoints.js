/**
 * calculatePoints.js
 * ------------------
 * Pure utility function for the rewards point calculation logic.
 *
 * Rules:
 *  - 0 points  for every dollar up to $50
 *  - 1 point   for every dollar between $50 and $100  (i.e. amount - 50, capped at 50)
 *  - 2 points  for every dollar over $100
 *
 * Example: $120  →  2×(120-100) + 1×50  =  40 + 50  =  90 points
 */

/**
 * Returns the reward points earned for a single transaction amount.
 * @param {number} amount - Purchase amount in dollars
 * @returns {number} Points earned (always a non-negative integer)
 */
export function calculatePoints(amount) {
  if (amount <= 0) return 0;

  let points = 0;

  // Tier 2: 2 points per dollar over $100
  if (amount > 100) {
    points += Math.floor(amount - 100) * 2;
    // The full $50–$100 band always contributes 50 points when amount > $100
    points += 50;
  } else if (amount > 50) {
    // Tier 1: 1 pt per dollar between $50 and $100
    points += Math.floor(amount - 50);
  }
  // Tier 0: nothing below $50

  return points;
}

/**
 * Returns a human-readable label for the month+year portion of a date string.
 * @param {string} dateStr - ISO date string e.g. "2025-01-15"
 * @returns {string} e.g. "January 2025"
 */
export function formatMonth(dateStr) {
  const date = new Date(dateStr + "T00:00:00"); // force local midnight
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

/**
 * Returns "YYYY-MM" key used to group transactions by month.
 * @param {string} dateStr - ISO date string
 * @returns {string} e.g. "2025-01"
 */
export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7); // "YYYY-MM"
}
