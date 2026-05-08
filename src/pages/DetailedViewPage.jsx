import React from "react";
import PropTypes from "prop-types";
import TransactionTable from "../components/TransactionTable";

export default function DetailedViewPage({ customerTotals, transactions, selectedCustomerId, onBack }) {
  const selectedCustomer = customerTotals.find((c) => c.customerId === selectedCustomerId);

  if (!selectedCustomer) {
    return <p style={styles.error}>Customer not found.</p>;
  }

  // Filter transactions for the selected customer
  const customerTransactions = transactions.filter(
    (txn) => txn.customerId === selectedCustomerId
  );

  // Get recent 3 months
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 2);

  const recentTransactions = customerTransactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txnDate >= threeMonthsAgo;
  });

  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Monthly View
        </button>
        <h1 style={styles.title}>
          Transaction Details: {selectedCustomer.customerName}
        </h1>
      </div>

      <div style={styles.summary}>
        <div style={styles.summaryItem}>
          <strong>Customer ID:</strong>
          <span>{selectedCustomer.customerId}</span>
        </div>
        <div style={styles.summaryItem}>
          <strong>Total Points:</strong>
          <span>{selectedCustomer.totalPoints.toLocaleString()}</span>
        </div>
        <div style={styles.summaryItem}>
          <strong>Total Transactions:</strong>
          <span>{selectedCustomer.totalTransactions}</span>
        </div>
        <div style={styles.summaryItem}>
          <strong>Recent 3-Month Transactions:</strong>
          <span>{recentTransactions.length}</span>
        </div>
      </div>

      {recentTransactions.length > 0 ? (
        <TransactionTable transactions={recentTransactions} />
      ) : (
        <p style={styles.emptyState}>No transactions in the recent 3 months.</p>
      )}

      <div style={styles.footer}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Monthly View
        </button>
      </div>
    </main>
  );
}

const styles = {
  main: { padding: "0" },
  header: {
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  title: { fontSize: "1.5rem", fontWeight: 700, color: "#111", margin: "0" },
  summary: {
    background: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "1.25rem 1.5rem",
    marginBottom: "1.5rem",
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  footer: {
    marginTop: "2rem",
    display: "flex",
    gap: "1rem",
  },
  backButton: {
    padding: "10px 16px",
    border: "1px solid #999",
    background: "#f5f5f5",
    color: "#111",
    fontSize: "0.95rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  emptyState: { color: "#555", fontSize: "0.95rem", textAlign: "center", padding: "2rem" },
  error: { color: "#c41e3a", fontSize: "1rem", textAlign: "center", padding: "2rem" },
};

DetailedViewPage.propTypes = {
  customerTotals: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  selectedCustomerId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};
