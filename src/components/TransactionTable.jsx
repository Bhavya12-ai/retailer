
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "./TransactionTable.css";
import {
  transactionTableColumnsMeta,
  ROWS_PER_PAGE_OPTIONS,
  tableLabels,
} from "../constants/uiConstants";
import { transactionShape } from "../constants/propTypes";

function pointsClass(points) {
  if (points >= 200) return "txn-points-high";
  if (points >= 90) return "txn-points-mid";
  if (points >= 30) return "txn-points-low";
  return "txn-points-base";
}

export default function TransactionTable({ transactions }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState("");
  const [selectedMonthFilter, setSelectedMonthFilter] = useState("");

  const monthOptions = useMemo(
    () => [...new Set(transactions.map((transaction) => transaction.monthLabel))],
    [transactions]
  );

  const customerIdOptions = useMemo(
    () => [...new Set(transactions.map((transaction) => transaction.customerId))],
    [transactions]
  );

  const filteredRows = useMemo(() => {
    const searchQuery = search.toLowerCase().trim();

    return transactions.filter((transaction) => {
      if (selectedCustomerFilter && transaction.customerId !== selectedCustomerFilter) return false;
      if (selectedMonthFilter && transaction.monthLabel !== selectedMonthFilter) return false;

      if (!searchQuery) return true;

      return [
        transaction.customerName,
        transaction.customerId,
        transaction.transactionId,
        transaction.date,
        transaction.monthLabel,
      ].some((value) => value.toLowerCase().includes(searchQuery));
    });
  }, [transactions, search, selectedCustomerFilter, selectedMonthFilter]);

  const sortedRows = useMemo(() => {
    const rowCopy = [...filteredRows];
    return rowCopy.sort((a, b) => {
      let left = a[sortField];
      let right = b[sortField];

      if (sortField === "date") {
        left = new Date(left);
        right = new Date(right);
      }

      if (typeof left === "string" && typeof right === "string") {
        left = left.toLowerCase();
        right = right.toLowerCase();
      }

      let comparison = 0;
      if (left > right) comparison = 1;
      if (left < right) comparison = -1;
      if (sortDirection === "desc") comparison *= -1;
      return comparison;
    });
  }, [filteredRows, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / rowsPerPage));
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedRows = sortedRows.slice(startIdx, endIdx);

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

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCustomerFilter("");
    setSelectedMonthFilter("");
    setCurrentPage(1);
  };

  return (
    <section className="transaction-table-section">
      <h2 className="transaction-table-heading">{tableLabels.transactionLogHeading}</h2>

      <div className="transaction-table-search-wrapper">
        <input
          id="txn-search"
          type="text"
          placeholder={tableLabels.searchPlaceholder}
          value={search}
          onChange={handleSearch}
          className="transaction-table-search-input"
        />

        <select
          value={selectedCustomerFilter}
          onChange={(event) => {
            setSelectedCustomerFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="transaction-table-filter-select"
        >
          <option value="">{tableLabels.filterCustomerPlaceholder}</option>
          {customerIdOptions.map((customerId) => (
            <option key={customerId} value={customerId}>
              {customerId}
            </option>
          ))}
        </select>

        <select
          value={selectedMonthFilter}
          onChange={(event) => {
            setSelectedMonthFilter(event.target.value);
            setCurrentPage(1);
          }}
          className="transaction-table-filter-select"
        >
          <option value="">{tableLabels.filterMonthPlaceholder}</option>
          {monthOptions.map((monthLabel) => (
            <option key={monthLabel} value={monthLabel}>
              {monthLabel}
            </option>
          ))}
        </select>

        {(search || selectedCustomerFilter || selectedMonthFilter) && (
          <button className="transaction-table-clear-btn" onClick={handleClearFilters} type="button">
            {tableLabels.clearButton}
          </button>
        )}
      </div>

      <p className="transaction-table-count">
        Showing <strong>{paginatedRows.length}</strong> of {filteredRows.length} of {transactions.length} transactions
      </p>

      <table className="simple-table transaction-table">
        <thead>
          <tr>
            {transactionTableColumnsMeta.map((columnMeta) => (
              <th
                key={columnMeta.field}
                className={`transaction-table-header ${
                  sortField === columnMeta.field ? "transaction-table-header-active" : ""
                }`}
                onClick={() => {
                  if (sortField === columnMeta.field) {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortField(columnMeta.field);
                    setSortDirection("asc");
                  }
                  setCurrentPage(1);
                }}
              >
                {columnMeta.headerName}
                {/* <span
                  className={`transaction-table-sort-icon ${
                    sortField === columnMeta.field ? "active" : ""
                  }`}
                >
                  {sortField === columnMeta.field
                    ? sortDirection === "asc"
                      ? "▲"
                      : "▼"
                    : "⇅"}
                </span> */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td className="transaction-table-cell">{transaction.transactionId}</td>
              <td className="transaction-table-cell">{transaction.customerName}</td>
              <td className="transaction-table-cell">{transaction.customerId}</td>
              <td className="transaction-table-cell">{transaction.date}</td>
              <td className="transaction-table-cell">{transaction.monthLabel}</td>
              <td className="transaction-table-cell">${transaction.amount.toFixed(2)}</td>
              <td className="transaction-table-cell">
                <span className={`txn-points ${pointsClass(transaction.points)}`}>
                  {transaction.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredRows.length === 0 && (
        <p className="transaction-table-empty-state">{tableLabels.noMatchingTransactions}</p>
      )}

      {filteredRows.length > 0 && (
        <div className="transaction-table-pagination">
          <div className="transaction-table-rows-per-page">
            <label className="transaction-table-label">{tableLabels.rowsPerPage}</label>
            <select
              value={rowsPerPage}
              onChange={(event) => handleChangeRowsPerPage(Number(event.target.value))}
              className="transaction-table-select"
            >
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="transaction-table-page-info">
            Page {currentPage} of {totalPages}
          </div>

          <div className="transaction-table-pagination-controls">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="transaction-table-pagination-button"
              type="button"
            >
              {tableLabels.previousButton}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="transaction-table-pagination-button"
              type="button"
            >
              {tableLabels.nextButton}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(transactionShape).isRequired,
};
