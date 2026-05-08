export const rewardRules = [
  { range: "$0 – $50",    pointsDescription: "0 points",           color: "#94a3b8" },
  { range: "$50 – $100",  pointsDescription: "+1 point / $1",      color: "#fbbf24" },
  { range: "Over $100",   pointsDescription: "+2 points / $1",     color: "#818cf8" },
  { range: "Example $120", pointsDescription: "2×$20 + 1×$50 = 90 points", color: "#34d399" },
];

export const leaderboardMedals = ["🥇", "🥈", "🥉"];

export const leaderboardAccents = [
  { border: "#fbbf24", glow: "rgba(251,191,36,0.25)" },
  { border: "#94a3b8", glow: "rgba(148,163,184,0.2)" },
  { border: "#cd7c2e", glow: "rgba(205,124,46,0.2)" },
  { border: "#818cf8", glow: "rgba(129,140,248,0.15)" },
  { border: "#34d399", glow: "rgba(52,211,153,0.15)" },
];

export const transactionTableColumnsMeta = [
  { field: "transactionId", headerName: "Txn ID" },
  { field: "customerName", headerName: "Customer" },
  { field: "customerId", headerName: "ID" },
  { field: "date", headerName: "Date" },
  { field: "monthLabel", headerName: "Month" },
  { field: "amount", headerName: "Amount ($)" },
  { field: "points", headerName: "Points" },
];

export const monthlyBreakdownColumnsMeta = [
  { field: "customerName", headerName: "Customer" },
  { field: "customerId", headerName: "ID" },
  { field: "totalPoints", headerName: "Total Points" },
];

export const appHeaderMetadata = [
  { icon: "📅", label: "Jan – Mar 2025" },
  { icon: "👥", label: "5 Customers" },
  { icon: "🧾", label: "36 Transactions" },
];
