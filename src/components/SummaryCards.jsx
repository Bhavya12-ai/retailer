/**
 * SummaryCards.jsx
 * ----------------
 * Displays top-ranked customer reward totals as animated glass-morphism cards.
 */

import React from "react";
import PropTypes from "prop-types";
import { leaderboardAccents, leaderboardMedals } from "../constants/uiConstants";

const MEDALS = leaderboardMedals;
const ACCENTS = leaderboardAccents;

export default function SummaryCards({ customerTotals }) {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Leaderboard</h2>
      <table className="simple-table">
        <thead>
          <tr>
            <th style={styles.tableHeader}>Rank</th>
            <th style={styles.tableHeader}>Customer</th>
            <th style={styles.tableHeader}>Points</th>
            <th style={styles.tableHeader}>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {customerTotals.map((customer, customerRankIndex) => (
            <tr key={customer.customerId}>
              <td style={styles.tableCell}>{customerRankIndex + 1}</td>
              <td style={styles.tableCell}>{customer.customerName}</td>
              <td style={styles.tableCell}>{customer.totalPoints.toLocaleString()}</td>
              <td style={styles.tableCell}>{customer.totalTransactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const styles = {
  section: {
    marginBottom: "2.5rem",
  },
  heading: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#111",
    marginBottom: "0.9rem",
  },
  tableHeader: {
    textAlign: "left",
    padding: "10px 12px",
    background: "#f5f5f5",
    fontWeight: 700,
    color: "#111",
  },
  tableCell: {
    padding: "10px 12px",
    borderTop: "1px solid #ddd",
    color: "#111",
  },
};

SummaryCards.propTypes = {
  customerTotals: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      totalPoints: PropTypes.number.isRequired,
      totalTransactions: PropTypes.number.isRequired,
    })
  ).isRequired,
};
