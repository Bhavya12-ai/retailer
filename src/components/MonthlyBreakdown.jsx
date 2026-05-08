/**
 * MonthlyBreakdown.jsx
 * --------------------
 * MUI DataGrid showing each customer's points broken down by month,
 * plus a "Total" column.  Rows are sortable and paginated via MUI.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { monthlyBreakdownColumnsMeta } from "../constants/uiConstants";

function pointColor(points) {
  if (points >= 300) return "#0b6f46";
  if (points >= 150) return "#3730a3";
  if (points >= 50) return "#b45309";
  return "#334155";
}

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

export default function MonthlyBreakdown({ monthlyData, months, selectedCustomerId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter to only show selected customer
  const selectedCustomerData = selectedCustomerId && monthlyData[selectedCustomerId]
    ? { [selectedCustomerId]: monthlyData[selectedCustomerId] }
    : monthlyData;

  const rows = Object.entries(selectedCustomerData).map(([customerId, { customerName, months: monthlyPointsByCustomer }]) => {
    const row = { customerId, customerName };
    months.forEach(({ key }) => {
      row[key] = monthlyPointsByCustomer[key]?.points ?? 0;
    });
    row.totalPoints = Object.values(monthlyPointsByCustomer).reduce(
      (sum, monthData) => sum + monthData.points,
      0
    );
    return row;
  });

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedRows = rows.slice(startIdx, endIdx);

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Monthly Points Breakdown</h2>
      <p style={styles.subtitle}>Points earned per customer, per month.</p>

      <table className="simple-table">
        <thead>
          <tr>
            {monthlyBreakdownColumnsMeta.map((columnMeta) => (
              <th key={columnMeta.field} style={styles.tableHeader}>
                {columnMeta.headerName}
              </th>
            ))}
            {months.map((month) => (
              <th key={month.key} style={styles.tableHeader}>
                {month.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row) => (
            <tr key={row.customerId}>
              <td style={styles.tableCell}>{row.customerName}</td>
              <td style={styles.tableCell}>{row.customerId}</td>
              <td style={styles.tableCell}>
                <span style={{ color: pointColor(row.totalPoints), fontWeight: 700 }}>
                  {row.totalPoints.toLocaleString()}
                </span>
              </td>
              {months.map((month) => (
                <td key={month.key} style={styles.tableCell}>
                  {row[month.key].toLocaleString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && <p style={styles.emptyState}>Monthly breakdown data is not available.</p>}

      {rows.length > 0 && (
        <div style={styles.paginationWrapper}>
          <div style={styles.rowsPerPageControl}>
            <label style={styles.label}>Rows per page:</label>
            <select
              value={rowsPerPage}
              onChange={(event) => handleChangeRowsPerPage(Number(event.target.value))}
              style={styles.select}
            >
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

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
    </section>
  );
}

const styles = {
  section: { marginBottom: "2.5rem" },
  heading: { fontSize: "1.25rem", fontWeight: 700, color: "#111", marginBottom: "0.4rem" },
  subtitle: { color: "#444", fontSize: "0.95rem", marginBottom: "1rem" },
  tableHeader: { textAlign: "left", padding: "10px 12px", background: "#f5f5f5", fontWeight: 700 },
  tableCell: { padding: "10px 12px", borderTop: "1px solid #ddd", color: "#111" },
  emptyState: { color: "#555", fontSize: "0.95rem", marginTop: "0.75rem" },
  paginationWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1.25rem",
    padding: "0.75rem 0",
    borderTop: "1px solid #ddd",
    gap: "1rem",
    flexWrap: "wrap",
  },
  rowsPerPageControl: { display: "flex", alignItems: "center", gap: "0.5rem" },
  label: { fontSize: "0.9rem", color: "#111", fontWeight: 600 },
  select: {
    padding: "6px 8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "0.9rem",
    cursor: "pointer",
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

MonthlyBreakdown.propTypes = {
  monthlyData: PropTypes.objectOf(
    PropTypes.shape({
      customerName: PropTypes.string.isRequired,
      months: PropTypes.objectOf(
        PropTypes.shape({
          points: PropTypes.number.isRequired,
          transactionCount: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  months: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCustomerId: PropTypes.string,
};
