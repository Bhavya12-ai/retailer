import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SummaryCards from "../components/SummaryCards";
import RulesLegend from "../components/RulesLegend";
import { transactionShape, customerTotalShape, monthShape, monthlyDataShape } from "../constants/propTypes";
import "./styles/DashboardPage.css";

const ITEMS_PER_PAGE = 10;

export default function DashboardPage({ loading, error, transactions, monthlyData, customerTotals, months, onSelectCustomer, onReload }) {
  const hasNoTransactions = !loading && !error && customerTotals.length === 0;
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    onSelectCustomer(customerId);
  };

  const totalPages = Math.ceil(customerTotals.length / ITEMS_PER_PAGE);
  const paginatedCustomers = customerTotals.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <main className="dashboard-page-main">
      <RulesLegend />

      {loading && <p className="dashboard-loading">Loading transactions…</p>}
      {error && (
        <div className="dashboard-error-box">
          <p className="dashboard-error-text">Error: {error}</p>
          <button className="dashboard-retry-button" type="button" onClick={onReload}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <section className="customer-panel-section">
            <div className="customer-panel-header">
              <div>
                <h2 className="dashboard-section-title">Customer Selector</h2>
                <p className="dashboard-section-subtitle">Choose a customer to view details.</p>
              </div>
              <select
                value={selectedCustomerId}
                onChange={(event) => handleSelectCustomer(event.target.value)}
                className="customer-select"
              >
                <option value="" disabled>
                  Select a customer
                </option>
                {customerTotals.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.customerName} ({customer.customerId})
                  </option>
                ))}
              </select>
            </div>
          </section>

          <SummaryCards customerTotals={paginatedCustomers} />

          {customerTotals.length > ITEMS_PER_PAGE && (
            <div className="dashboard-pagination-wrapper">
              <div className="dashboard-page-info">Page {currentPage} of {totalPages}</div>
              <div className="dashboard-pagination-controls">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="dashboard-pagination-button"
                  type="button"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="dashboard-pagination-button"
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {hasNoTransactions && <p className="dashboard-empty-state">No transactions available.</p>}
        </>
      )}
    </main>
  );
}

DashboardPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  transactions: PropTypes.arrayOf(transactionShape).isRequired,
  monthlyData: monthlyDataShape.isRequired,
  customerTotals: PropTypes.arrayOf(customerTotalShape).isRequired,
  months: PropTypes.arrayOf(monthShape).isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
};
