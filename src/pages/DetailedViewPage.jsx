import React from "react";
import PropTypes from "prop-types";
import TransactionTable from "../components/TransactionTable";
import { customerTotalShape, transactionShape } from "../constants/propTypes";
import { pageStrings } from "../constants/uiConstants";
import "./DetailedViewPage.css";

export default function DetailedViewPage({ customerTotals, transactions, selectedCustomerId, onBack }) {
  const selectedCustomer = customerTotals.find((c) => c.customerId === selectedCustomerId);

  if (!selectedCustomer) {
    return <p className="detailed-view-error">{pageStrings.customerNotFound}</p>;
  }

  const customerTransactions = transactions.filter((txn) => txn.customerId === selectedCustomerId);

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 2);

  const recentTransactions = customerTransactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txnDate >= threeMonthsAgo;
  });

  return (
    <main className="detailed-view-main">
      <div className="detailed-view-header">
        {/* <button className="detailed-view-back-button" onClick={onBack}>
          {pageStrings.backToMonthlyView}
        </button> */}
        <h1 className="detailed-view-title">
          Transaction Details: {selectedCustomer.customerName}
        </h1>
      </div>

      <div className="detailed-view-summary">
        <div className="detailed-view-summary-item">
          <strong>{pageStrings.customerIdLabel}</strong>
          <span>{selectedCustomer.customerId}</span>
        </div>
        <div className="detailed-view-summary-item">
          <strong>{pageStrings.totalPointsLabel}</strong>
          <span>{selectedCustomer.totalPoints.toLocaleString()}</span>
        </div>
        <div className="detailed-view-summary-item">
          <strong>{pageStrings.totalTransactions}</strong>
          <span>{selectedCustomer.totalTransactions}</span>
        </div>
        <div className="detailed-view-summary-item">
          <strong>{pageStrings.recentTransactionsLabel}</strong>
          <span>{recentTransactions.length}</span>
        </div>
      </div>

      {recentTransactions.length > 0 ? (
        <TransactionTable transactions={recentTransactions} />
      ) : (
        <p className="detailed-view-empty-state">No transactions in the recent 3 months.</p>
      )}

      <div className="detailed-view-footer">
        <button className="detailed-view-back-button" onClick={onBack}>
          ← Back to Monthly View
        </button>
      </div>
    </main>
  );
}

DetailedViewPage.propTypes = {
  customerTotals: PropTypes.arrayOf(customerTotalShape).isRequired,
  transactions: PropTypes.arrayOf(transactionShape).isRequired,
  selectedCustomerId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};
