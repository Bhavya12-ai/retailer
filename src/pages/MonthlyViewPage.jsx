import React from "react";
import PropTypes from "prop-types";
import MonthlyBreakdown from "../components/MonthlyBreakdown";
import { customerTotalShape, monthShape, monthlyDataShape } from "../constants/propTypes";
import { pageStrings } from "../constants/uiConstants";
import "./styles/MonthlyViewPage.css";

export default function MonthlyViewPage({ customerTotals, monthlyData, months, selectedCustomerId, onBack, onNext }) {
  const selectedCustomer = customerTotals.find((c) => c.customerId === selectedCustomerId);

  if (!selectedCustomer) {
    return <p className="monthly-view-error">{pageStrings.customerNotFound}</p>;
  }

  return (
    <main className="monthly-view-main">
      <div className="monthly-view-header">
        {/* <button className="monthly-view-back-button" onClick={onBack}>
          ← Back to Dashboard
        </button> */}
        <h1 className="monthly-view-title">
          Monthly Breakdown: {selectedCustomer.customerName}
        </h1>
      </div>

      <MonthlyBreakdown monthlyData={monthlyData} months={months} selectedCustomerId={selectedCustomerId} />

      <div className="monthly-view-footer">
        <button className="monthly-view-back-button" onClick={onBack}>
          {pageStrings.backToDashboard}
        </button>
        <button className="monthly-view-next-button" onClick={onNext}>
          {pageStrings.viewDetailedTransactions || "View Detailed Transactions →"}
        </button>
      </div>
    </main>
  );
}

MonthlyViewPage.propTypes = {
  customerTotals: PropTypes.arrayOf(customerTotalShape).isRequired,
  monthlyData: monthlyDataShape.isRequired,
  months: PropTypes.arrayOf(monthShape).isRequired,
  selectedCustomerId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};
