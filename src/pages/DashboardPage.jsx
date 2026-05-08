import React, { useState } from "react";
import PropTypes from "prop-types";
import SummaryCards from "../components/SummaryCards";
import { rewardRules } from "../constants/uiConstants";

function RulesLegend() {
  return (
    <div style={legendStyles.box}>
      <strong style={legendStyles.title}>Reward Rules</strong>
      <div style={legendStyles.grid}>
        {rewardRules.map((rule) => (
          <div key={rule.range} style={legendStyles.chip}>
            <span style={{ ...legendStyles.dot, background: rule.color }} />
            <span style={legendStyles.range}>{rule.range}</span>
            <span style={{ ...legendStyles.pointsDescription, color: rule.color }}>
              {rule.pointsDescription}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const legendStyles = {
  box: {
    background: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "1rem 1.25rem",
    marginBottom: "2rem",
  },
  title: { color: "#111", fontSize: "0.95rem", display: "block", marginBottom: "0.75rem" },
  grid: { display: "flex", flexWrap: "wrap", gap: "0.75rem" },
  chip: { display: "flex", alignItems: "center", gap: "8px", background: "#fff", borderRadius: "6px", padding: "6px 12px", border: "1px solid #ddd" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0 },
  range: { color: "#555", fontSize: "0.82rem" },
  pointsDescription: { fontWeight: 700, fontSize: "0.82rem" },
};

const ITEMS_PER_PAGE = 10;

export default function DashboardPage({ loading, error, transactions, monthlyData, customerTotals, months, onSelectCustomer }) {
  const hasNoTransactions = !loading && !error && customerTotals.length === 0;
  const [selectedCustomerId, setSelectedCustomerId] = useState(
    customerTotals.length > 0 ? customerTotals[0].customerId : ""
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    onSelectCustomer(customerId);
  };

  const totalPages = Math.ceil(customerTotals.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedCustomers = customerTotals.slice(startIdx, endIdx);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <main style={styles.main}>
      <RulesLegend />

      {loading && <p style={styles.loading}>Loading transactions…</p>}
      {error && <p style={styles.error}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <section style={styles.customerPanelSection}>
            <div style={styles.customerPanelHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Customer Selector</h2>
                <p style={styles.sectionSubtitle}>Choose a customer to view details.</p>
              </div>
              <select
                value={selectedCustomerId}
                onChange={(event) => handleSelectCustomer(event.target.value)}
                style={styles.customerSelect}
              >
                {customerTotals.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.customerName} ({customer.customerId})
                  </option>
                ))}
              </select>
            </div>
          </section>

          <SummaryCards customerTotals={paginatedCustomers} onSelectCustomer={handleSelectCustomer} />

          {customerTotals.length > ITEMS_PER_PAGE && (
            <div style={styles.paginationWrapper}>
              <div style={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </div>
              <div style={styles.paginationControls}>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  style={{ ...styles.paginationButton, opacity: currentPage === 1 ? 0.5 : 1 }}
                  type="button"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  style={{ ...styles.paginationButton, opacity: currentPage === totalPages ? 0.5 : 1 }}
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {hasNoTransactions && <p style={styles.emptyState}>No transactions available.</p>}
        </>
      )}
    </main>
  );
}

const styles = {
  main: { padding: "0" },
  loading: { color: "#666", fontSize: "1rem", textAlign: "center", padding: "2rem" },
  error: { color: "#c41e3a", fontSize: "1rem", textAlign: "center", padding: "2rem" },
  customerPanelSection: { marginBottom: "2rem" },
  customerPanelHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "2rem",
  },
  sectionTitle: { fontSize: "1.15rem", fontWeight: 700, color: "#111", marginBottom: "0.4rem" },
  sectionSubtitle: { color: "#555", fontSize: "0.9rem" },
  customerSelect: {
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "0.95rem",
    cursor: "pointer",
    minWidth: "280px",
  },
  emptyState: { color: "#555", fontSize: "0.95rem", textAlign: "center", padding: "2rem" },
  paginationWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "1.5rem",
    gap: "1.5rem",
  },
  pageInfo: { fontSize: "0.9rem", color: "#555", fontWeight: 600 },
  paginationControls: { display: "flex", gap: "0.5rem" },
  paginationButton: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    background: "#fff",
    color: "#111",
    fontSize: "0.9rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

DashboardPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  transactions: PropTypes.array.isRequired,
  monthlyData: PropTypes.object.isRequired,
  customerTotals: PropTypes.array.isRequired,
  months: PropTypes.array.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
};
