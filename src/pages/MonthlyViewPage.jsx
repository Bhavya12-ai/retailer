import React from "react";
import PropTypes from "prop-types";
import MonthlyBreakdown from "../components/MonthlyBreakdown";

export default function MonthlyViewPage({ customerTotals, monthlyData, months, selectedCustomerId, onBack, onNext }) {
  const selectedCustomer = customerTotals.find((c) => c.customerId === selectedCustomerId);

  if (!selectedCustomer) {
    return <p style={styles.error}>Customer not found.</p>;
  }

  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>
          Monthly Breakdown: {selectedCustomer.customerName}
        </h1>
      </div>

      <MonthlyBreakdown monthlyData={monthlyData} months={months} selectedCustomerId={selectedCustomerId} />

      <div style={styles.footer}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>
        <button style={styles.nextButton} onClick={onNext}>
          View Detailed Transactions →
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
  footer: {
    marginTop: "2rem",
    display: "flex",
    gap: "1rem",
    justifyContent: "space-between",
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
  nextButton: {
    padding: "10px 16px",
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    fontSize: "0.95rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: { color: "#c41e3a", fontSize: "1rem", textAlign: "center", padding: "2rem" },
};

MonthlyViewPage.propTypes = {
  customerTotals: PropTypes.array.isRequired,
  monthlyData: PropTypes.object.isRequired,
  months: PropTypes.array.isRequired,
  selectedCustomerId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};
