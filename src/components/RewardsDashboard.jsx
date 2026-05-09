
import React from "react";
import { useRewardsData } from "../hooks/useRewardsData";
import { useSelectedCustomer } from "../hooks/useSelectedCustomer";
import { rewardRules } from "../constants/uiConstants";
import SummaryCards from "./SummaryCards";
import MonthlyBreakdown from "./MonthlyBreakdown";
import TransactionTable from "./TransactionTable";
import "./styles/RewardsDashboard.css";

function Skeleton() {
  return (
    <div className="rewards-skeleton-wrapper">
      <div className="rewards-skeleton-spinner" />
      <p className="rewards-skeleton-text">Fetching transactions from server…</p>
      <p className="rewards-skeleton-sub">Simulating API response (~800 ms)</p>
    </div>
  );
}

function ErrorBanner({ message }) {
  return (
    <div className="rewards-error-box">
      <div>
        <strong className="rewards-error-title">Failed to load data</strong>
        <p className="rewards-error-message">{message}</p>
      </div>
    </div>
  );
}

function RulesLegend() {
  return (
    <div className="rules-legend-box">
      <strong className="rules-legend-title">Reward Rules</strong>
      <div className="rules-legend-grid">
        {rewardRules.map((rule) => (
          <div key={rule.range} className="rules-legend-chip">
            <span className="rules-legend-dot" style={{ background: rule.color }} />
            <span className="rules-legend-range">{rule.range}</span>
            <span className="rules-legend-points" style={{ color: rule.color }}>
              {rule.pointsDescription}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <main className="rewards-dashboard-main">
      <RulesLegend />

      {loading && <Skeleton />}
      {error && <ErrorBanner message={error} />}

      {!loading && !error && (
        <>
          <section className="customer-panel-section">
            <div className="customer-panel-header">
              <div>
                <h2 className="rewards-section-title">Customer selector</h2>
                <p className="rewards-section-subtitle">
                  Choose a customer to view their recent reward activity.
                </p>
              </div>
              <select
                value={selectedCustomerId}
                onChange={(event) => setSelectedCustomerId(event.target.value)}
                className="customer-select"
              >
                {customerTotals.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.customerName} ({customer.customerId})
                  </option>
                ))}
              </select>
            </div>

            {selectedCustomer ? (
              <div className="selected-customer-summary">
                <div className="summary-item">
                  <strong className="summary-label">Name</strong>
                  <span>{selectedCustomer.customerName}</span>
                </div>
                <div className="summary-item">
                  <strong className="summary-label">Customer ID</strong>
                  <span>{selectedCustomer.customerId}</span>
                </div>
                <div className="summary-item">
                  <strong className="summary-label">Total points</strong>
                  <span>{selectedCustomer.totalPoints.toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <strong className="summary-label">Total transactions</strong>
                  <span>{selectedCustomer.totalTransactions}</span>
                </div>
              </div>
            ) : null}
          </section>

          <SummaryCards customerTotals={customerTotals} />
          <MonthlyBreakdown monthlyData={monthlyData} months={months} selectedCustomerId={selectedCustomerId} />

          <section className="selected-customer-details-section">
            <h2 className="rewards-section-title">Recent 3 months details</h2>
            {selectedCustomer ? (
              <>
                <table className="simple-table rewards-monthly-summary-table">
                  <thead>
                    <tr>
                      <th className="rewards-table-header">Month</th>
                      <th className="rewards-table-header">Points</th>
                      <th className="rewards-table-header">Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomerMonthSummary.map((entry) => (
                      <tr key={entry.monthKey}>
                        <td className="rewards-table-cell">{entry.monthLabel}</td>
                        <td className="rewards-table-cell">{entry.points}</td>
                        <td className="rewards-table-cell">{entry.transactionCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {selectedCustomerTransactions.length === 0 ? (
                  <p className="rewards-empty-state">No transactions in the last 3 months.</p>
                ) : (
                  <TransactionTable transactions={selectedCustomerTransactions} />
                )}
              </>
            ) : (
              <p className="rewards-empty-state">No transactions</p>
            )}
          </section>

          {hasNoTransactions && <p className="rewards-empty-state">No transactions</p>}
        </>
      )}
    </main>
  );
}
