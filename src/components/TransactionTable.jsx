/**
 * TransactionTable.jsx
 * ---------------------
 * MUI DataGrid listing every individual transaction with its calculated points.
 * Supports filtering by customer name via a search input.
 */

import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { transactionTableColumnsMeta } from "../constants/uiConstants";

function pointsColor(points) {
  if (points >= 200) return "#0b6f46";
  if (points >= 90) return "#3730a3";
  if (points >= 30) return "#b45309";
  return "#334155";
}

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

export default function TransactionTable({ transactions }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredRows = useMemo(() => {
    const searchQuery = search.toLowerCase().trim();
    if (!searchQuery) return transactions;
    return transactions.filter((transaction) =>
      transaction.customerName.toLowerCase().includes(searchQuery)
    );
  }, [transactions, search]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedRows = filteredRows.slice(startIdx, endIdx);

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

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Transaction Log</h2>

      <div style={styles.searchWrapper}>
        <input
          id="txn-search"
          type="text"
          placeholder="Filter by customer name"
          value={search}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        {search && (
          <button style={styles.clearBtn} onClick={() => setSearch("")} type="button">
            Clear
          </button>
        )}
      </div>

      <p style={styles.count}>
        Showing <strong>{paginatedRows.length}</strong> of {filteredRows.length} of {transactions.length} transactions
      </p>

      <table className="simple-table">
        <thead>
          <tr>
            {transactionTableColumnsMeta.map((columnMeta) => (
              <th key={columnMeta.field} style={styles.tableHeader}>
                {columnMeta.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td style={styles.tableCell}>{transaction.transactionId}</td>
              <td style={styles.tableCell}>{transaction.customerName}</td>
              <td style={styles.tableCell}>{transaction.customerId}</td>
              <td style={styles.tableCell}>{transaction.date}</td>
              <td style={styles.tableCell}>{transaction.monthLabel}</td>
              <td style={styles.tableCell}>${transaction.amount.toFixed(2)}</td>
              <td style={styles.tableCell}>
                <span style={{ color: pointsColor(transaction.points), fontWeight: 700 }}>
                  {transaction.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredRows.length === 0 && <p style={styles.emptyState}>No matching transactions found.</p>}

      {filteredRows.length > 0 && (
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
  section: { marginBottom: "2rem" },
  heading: { fontSize: "1.15rem", fontWeight: 700, color: "#111", marginBottom: "0.9rem" },
  searchWrapper: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    marginBottom: "0.75rem",
  },
  searchInput: {
    flex: "1 1 240px",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "0.95rem",
    width: "100%",
  },
  clearBtn: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #999",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  count: { color: "#444", fontSize: "0.9rem", marginBottom: "0.75rem" },
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

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      monthKey: PropTypes.string.isRequired,
      monthLabel: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    })
  ).isRequired,
};
