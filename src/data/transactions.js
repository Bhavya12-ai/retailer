/**
 * Mock transaction dataset.
 * Covers 3 months (Jan–Mar 2025) for 5 customers with varying purchase amounts
 * to demonstrate all point-tier scenarios ($0-$50, $50-$100, >$100).
 */
const transactions = [
  // ── Alice Johnson ──────────────────────────────────────────────────────────
  { id: 1,  customerId: "C001", customerName: "Alice Johnson",  amount: 120,  date: "2025-01-05" },
  { id: 2,  customerId: "C001", customerName: "Alice Johnson",  amount: 85,   date: "2025-01-18" },
  { id: 3,  customerId: "C001", customerName: "Alice Johnson",  amount: 200,  date: "2025-01-28" },
  { id: 4,  customerId: "C001", customerName: "Alice Johnson",  amount: 45,   date: "2025-02-10" },
  { id: 5,  customerId: "C001", customerName: "Alice Johnson",  amount: 150,  date: "2025-02-20" },
  { id: 6,  customerId: "C001", customerName: "Alice Johnson",  amount: 110,  date: "2025-03-03" },
  { id: 7,  customerId: "C001", customerName: "Alice Johnson",  amount: 75,   date: "2025-03-15" },
  { id: 8,  customerId: "C001", customerName: "Alice Johnson",  amount: 300,  date: "2025-03-28" },

  // ── Bob Smith ──────────────────────────────────────────────────────────────
  { id: 9,  customerId: "C002", customerName: "Bob Smith",      amount: 60,   date: "2025-01-07" },
  { id: 10, customerId: "C002", customerName: "Bob Smith",      amount: 130,  date: "2025-01-20" },
  { id: 11, customerId: "C002", customerName: "Bob Smith",      amount: 95,   date: "2025-02-05" },
  { id: 12, customerId: "C002", customerName: "Bob Smith",      amount: 250,  date: "2025-02-14" },
  { id: 13, customerId: "C002", customerName: "Bob Smith",      amount: 40,   date: "2025-02-25" },
  { id: 14, customerId: "C002", customerName: "Bob Smith",      amount: 180,  date: "2025-03-10" },
  { id: 15, customerId: "C002", customerName: "Bob Smith",      amount: 55,   date: "2025-03-22" },

  // ── Carol Davis ────────────────────────────────────────────────────────────
  { id: 16, customerId: "C003", customerName: "Carol Davis",    amount: 175,  date: "2025-01-09" },
  { id: 17, customerId: "C003", customerName: "Carol Davis",    amount: 90,   date: "2025-01-25" },
  { id: 18, customerId: "C003", customerName: "Carol Davis",    amount: 30,   date: "2025-02-08" },
  { id: 19, customerId: "C003", customerName: "Carol Davis",    amount: 220,  date: "2025-02-18" },
  { id: 20, customerId: "C003", customerName: "Carol Davis",    amount: 115,  date: "2025-02-28" },
  { id: 21, customerId: "C003", customerName: "Carol Davis",    amount: 68,   date: "2025-03-05" },
  { id: 22, customerId: "C003", customerName: "Carol Davis",    amount: 340,  date: "2025-03-19" },

  // ── David Wilson ───────────────────────────────────────────────────────────
  { id: 23, customerId: "C004", customerName: "David Wilson",   amount: 50,   date: "2025-01-12" },
  { id: 24, customerId: "C004", customerName: "David Wilson",   amount: 100,  date: "2025-01-29" },
  { id: 25, customerId: "C004", customerName: "David Wilson",   amount: 165,  date: "2025-02-06" },
  { id: 26, customerId: "C004", customerName: "David Wilson",   amount: 72,   date: "2025-02-19" },
  { id: 27, customerId: "C004", customerName: "David Wilson",   amount: 190,  date: "2025-03-01" },
  { id: 28, customerId: "C004", customerName: "David Wilson",   amount: 88,   date: "2025-03-13" },
  { id: 29, customerId: "C004", customerName: "David Wilson",   amount: 25,   date: "2025-03-27" },

  // ── Emma Martinez ──────────────────────────────────────────────────────────
  { id: 30, customerId: "C005", customerName: "Emma Martinez",  amount: 310,  date: "2025-01-03" },
  { id: 31, customerId: "C005", customerName: "Emma Martinez",  amount: 78,   date: "2025-01-17" },
  { id: 32, customerId: "C005", customerName: "Emma Martinez",  amount: 140,  date: "2025-02-02" },
  { id: 33, customerId: "C005", customerName: "Emma Martinez",  amount: 55,   date: "2025-02-22" },
  { id: 34, customerId: "C005", customerName: "Emma Martinez",  amount: 420,  date: "2025-03-08" },
  { id: 35, customerId: "C005", customerName: "Emma Martinez",  amount: 95,   date: "2025-03-20" },
  { id: 36, customerId: "C005", customerName: "Emma Martinez",  amount: 33,   date: "2025-03-30" },
];

export default transactions;
