/**
 * MonthlyBreakdown.jsx
 * --------------------
 * MUI DataGrid showing each customer's points broken down by month,
 * plus a "Total" column.  Rows are sortable and paginated via MUI.
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  monthlyBreakdownColumnsMeta,
  ROWS_PER_PAGE_OPTIONS,
  monthlyBreakdownText,
  tableLabels,
} from "../constants/uiConstants";
import "./MonthlyBreakdown.css";

function pointClass(points) {
  if (points >= 300) return "monthly-breakdown-points-high";
  if (points >= 150) return "monthly-breakdown-points-mid";
  if (points >= 50) return "monthly-breakdown-points-low";
  return "monthly-breakdown-points-base";
}

export default function MonthlyBreakdown({ monthlyData, months, selectedCustomerId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    <section className="monthly-breakdown-section">
      <h2 className="monthly-breakdown-heading">{monthlyBreakdownText.heading}</h2>
      <p className="monthly-breakdown-subtitle">{monthlyBreakdownText.subtitle}</p>

      <table className="simple-table monthly-breakdown-table">
        <thead>
          <tr>
            {monthlyBreakdownColumnsMeta.map((columnMeta) => (
              <th key={columnMeta.field} className="monthly-breakdown-table-header">
                {columnMeta.headerName}
              </th>
            ))}
            {months.map((month) => (
              <th key={month.key} className="monthly-breakdown-table-header">
                {month.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row) => (
            <tr key={row.customerId}>
              <td className="monthly-breakdown-table-cell">{row.customerName}</td>
              <td className="monthly-breakdown-table-cell">{row.customerId}</td>
              <td className="monthly-breakdown-table-cell">
                <span className={pointClass(row.totalPoints)}>
                  {row.totalPoints.toLocaleString()}
                </span>
              </td>
              {months.map((month) => (
                <td key={month.key} className="monthly-breakdown-table-cell">
                  {row[month.key].toLocaleString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && <p className="monthly-breakdown-empty-state">{monthlyBreakdownText.emptyState}</p>}

      {rows.length > 0 && (
        <div className="monthly-breakdown-pagination">
          <div className="monthly-breakdown-rows-per-page">
            <label className="monthly-breakdown-label">{tableLabels.rowsPerPage}</label>
            <select
              value={rowsPerPage}
              onChange={(event) => handleChangeRowsPerPage(Number(event.target.value))}
              className="monthly-breakdown-select"
            >
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="monthly-breakdown-page-info">
            Page {currentPage} of {totalPages}
          </div>

          <div className="monthly-breakdown-controls">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="monthly-breakdown-pagination-button"
              type="button"
            >
              {tableLabels.previousButton}
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="monthly-breakdown-pagination-button"
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
