export const rewardRules = [
  { range: "$0 – $50",    pointsDescription: "0 points",      },
  { range: "$50 – $100",  pointsDescription: "+1 point / $1",   },
  { range: "Over $100",   pointsDescription: "+2 points / $1",   },
  { range: "Example $120", pointsDescription: "2×$20 + 1×$50 = 90 points"},
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

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

export const tableLabels = {
  transactionLogHeading: "Transaction Log",
  searchPlaceholder: "Search txn ID, customer, date or month",
  filterCustomerPlaceholder: "Filter by customer ID",
  filterMonthPlaceholder: "Filter by month",
  clearButton: "Clear",
  rowsPerPage: "Rows per page:",
  previousButton: "Previous",
  nextButton: "Next",
  noMatchingTransactions: "No matching transactions found.",
};

export const monthlyBreakdownText = {
  heading: "Monthly Points Breakdown",
  subtitle: "Points earned per customer, per month.",
  emptyState: "Monthly breakdown data is not available.",
};

export const summaryCardText = {
  heading: "Leaderboard",
  headers: ["Rank", "Customer", "Points", "Transactions"],
};

export const pageStrings = {
  dashboardHeading: "Customer Rewards Dashboard",
  dashboardHint: "Select a customer to view their reward activity.",
  monthlyHint: "Monthly breakdown of reward points.",
  detailedHint: "Detailed transaction view.",
  customerNotFound: "Customer not found.",
  noRecentTransactions: "No transactions in the recent 3 months.",
  totalTransactions: "Total Transactions:",
  customerIdLabel: "Customer ID:",
  totalPointsLabel: "Total Points:",
  recentTransactionsLabel: "Recent 3-Month Transactions:",
  backToMonthlyView: "← Back to Monthly View",
  backToDashboard: "← Back to Dashboard",
  viewDetailedTransactions: "View Detailed Transactions →",
};

export const appHeaderMetadata = [
  { icon: "📅", label: "Jan – Mar 2025" },
  { icon: "👥", label: "5 Customers" },
  { icon: "🧾", label: "36 Transactions" },
];
