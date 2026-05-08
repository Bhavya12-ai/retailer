/**
 * RewardsDashboard.jsx
 * ---------------------
 * Root dashboard component.  Consumes useRewardsData() and composes all
 * sub-components: SummaryCards, MonthlyBreakdown, TransactionTable.
 */

import React from "react";
import { useRewardsData } from "../hooks/useRewardsData";
import { useSelectedCustomer } from "../hooks/useSelectedCustomer";
import { rewardRules } from "../constants/uiConstants";
import SummaryCards       from "./SummaryCards";
import MonthlyBreakdown   from "./MonthlyBreakdown";
import TransactionTable   from "./TransactionTable";

// ── Skeleton loader ───────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div style={skeletonStyles.wrapper}>
      <div style={skeletonStyles.spinner} />
      <p style={skeletonStyles.text}>Fetching transactions from server…</p>
      <p style={skeletonStyles.sub}>Simulating API response (~800 ms)</p>
    </div>
  );
}

const skeletonStyles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "40vh",
    gap: "1rem",
  },
  spinner: {
    width: "52px",
    height: "52px",
    border: "4px solid rgba(129,140,248,0.15)",
    borderTop: "4px solid #818cf8",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: { color: "#e2e8f0", fontWeight: 600, margin: 0 },
  sub:  { color: "#64748b", fontSize: "0.82rem", margin: 0 },
};

// ── Error banner ──────────────────────────────────────────────────────────────
function ErrorBanner({ message }) {
  return (
    <div style={errorBannerStyles.box}>
      <span style={{ fontSize: "1.5rem" }}>⚠️</span>
      <div>
        <strong style={errorBannerStyles.title}>Failed to load data</strong>
        <p style={errorBannerStyles.msg}>{message}</p>
      </div>
    </div>
  );
}

const errorBannerStyles = {
  box: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.4)",
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    marginBottom: "2rem",
    color: "#fca5a5",
  },
  title: { display: "block", fontWeight: 700, marginBottom: "4px" },
  msg:   { margin: 0, fontSize: "0.85rem" },
};

// ── Point rule legend ─────────────────────────────────────────────────────────
function RulesLegend() {
  return (
    <div style={legendStyles.box}>
      <strong style={legendStyles.title}>📋 Reward Rules</strong>
      <div style={legendStyles.grid}>
        {rewardRules.map((rule) => (
          <div key={rule.range} style={legendStyles.chip}>
            <span style={{ ...legendStyles.dot, background: rule.color }} />
            <span style={legendStyles.range}>{rule.range}</span>
            <span style={{ ...legendStyles.pointsDescription, color: rule.color }}>{rule.pointsDescription}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const legendStyles = {
  box:   { background: "rgba(30,41,59,0.6)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "12px", padding: "1rem 1.5rem", marginBottom: "2rem" },
  title: { color: "#e2e8f0", fontSize: "0.95rem", display: "block", marginBottom: "0.75rem" },
  grid:  { display: "flex", flexWrap: "wrap", gap: "0.75rem" },
  chip:  { display: "flex", alignItems: "center", gap: "8px", background: "rgba(15,23,42,0.7)", borderRadius: "8px", padding: "6px 14px" },
  dot:   { width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0 },
  range: { color: "#94a3b8", fontSize: "0.82rem" },
  pointsDescription:   { fontWeight: 700, fontSize: "0.82rem" },
};

// ── Main dashboard ────────────────────────────────────────────────────────────
export default function RewardsDashboard() {
  const { loading, error, transactions, monthlyData, customerTotals, months } =
    useRewardsData();

  const {
    selectedCustomerId,
    setSelectedCustomerId,
    selectedCustomer,
    selectedCustomerTransactions,
    selectedCustomerMonthSummary,
  } = useSelectedCustomer(customerTotals, transactions, monthlyData, months);

  const hasNoTransactions = !loading && !error && customerTotals.length === 0;

  return (
    <main style={dash.main}>
      <RulesLegend />

      {loading && <Skeleton />}
      {error && <ErrorBanner message={error} />}

      {!loading && !error && (
        <>
          <section style={styles.customerPanelSection}>
            <div style={styles.customerPanelHeader}>
              <div>
                <h2 style={styles.sectionTitle}>👥 Customer selector</h2>
                <p style={styles.sectionSubtitle}>
                  Choose a customer to view their recent reward activity.
                </p>
              </div>
              <select
                value={selectedCustomerId}
                onChange={(event) => setSelectedCustomerId(event.target.value)}
                style={styles.customerSelect}
              >
                {customerTotals.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.customerName} ({customer.customerId})
                  </option>
                ))}
              </select>
            </div>

            {selectedCustomer ? (
              <div style={styles.selectedCustomerSummary}>
                <div style={styles.summaryItem}>
                  <strong style={styles.summaryLabel}>Name</strong>
                  <span>{selectedCustomer.customerName}</span>
                </div>
                <div style={styles.summaryItem}>
                  <strong style={styles.summaryLabel}>Customer ID</strong>
                  <span>{selectedCustomer.customerId}</span>
                </div>
                <div style={styles.summaryItem}>
                  <strong style={styles.summaryLabel}>Total points</strong>
                  <span>{selectedCustomer.totalPoints.toLocaleString()}</span>
                </div>
                <div style={styles.summaryItem}>
                  <strong style={styles.summaryLabel}>Total transactions</strong>
                  <span>{selectedCustomer.totalTransactions}</span>
                </div>
              </div>
            ) : null}
          </section>

          <SummaryCards customerTotals={customerTotals} />
          <MonthlyBreakdown
            monthlyData={monthlyData}
            months={months}
            customerTotals={customerTotals}
          />

          <section style={styles.selectedCustomerDetailsSection}>
            <h2 style={styles.sectionTitle}>📊 Recent 3 months details</h2>
            {selectedCustomer ? (
              <>
                <table style={styles.monthlySummaryTable}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Month</th>
                      <th style={styles.tableHeader}>Points</th>
                      <th style={styles.tableHeader}>Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomerMonthSummary.map((entry) => (
                      <tr key={entry.monthKey}>
                        <td style={styles.tableCell}>{entry.monthLabel}</td>
                        <td style={styles.tableCell}>{entry.points}</td>
                        <td style={styles.tableCell}>{entry.transactionCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {selectedCustomerTransactions.length === 0 ? (
                  <p style={styles.emptyState}>No transactions in the last 3 months.</p>
                ) : (
                  <TransactionTable transactions={selectedCustomerTransactions} />
                )}
              </>
            ) : (
              <p style={styles.emptyState}>No transactions</p>
            )}
          </section>

          {hasNoTransactions && <p style={styles.emptyState}>No transactions</p>}
        </>
      )}
    </main>
  );
}

const dash = {
  main: { width: "100%" },
};

const styles = {
  customerPanelSection: {
    marginBottom: "2rem",
    padding: "1.25rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
  },
  customerPanelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1rem",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#111",
    margin: 0,
  },
  sectionSubtitle: {
    color: "#444",
    fontSize: "0.9rem",
    margin: "0.25rem 0 0",
  },
  customerSelect: {
    minWidth: "240px",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#fff",
    color: "#111",
    fontSize: "0.95rem",
  },
  selectedCustomerSummary: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(140px, 1fr))",
    gap: "1rem",
  },
  summaryItem: {
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
  },
  summaryLabel: {
    display: "block",
    color: "#444",
    fontSize: "0.82rem",
    marginBottom: "0.35rem",
  },
  selectedCustomerDetailsSection: {
    marginBottom: "2rem",
  },
  monthlySummaryTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
  },
  tableHeader: {
    textAlign: "left",
    padding: "12px 14px",
    borderBottom: "1px solid #ddd",
    color: "#111",
    fontSize: "0.95rem",
    background: "#f5f5f5",
  },
  tableCell: {
    padding: "12px 14px",
    borderBottom: "1px solid #eee",
    color: "#111",
    fontSize: "0.95rem",
  },
  emptyState: {
    color: "#555",
    padding: "1rem 0",
    fontSize: "0.95rem",
  },
};
