
import React from "react";
import PropTypes from "prop-types";
import { summaryCardText } from "../constants/uiConstants";
import { customerTotalShape } from "../constants/propTypes";
import "./styles/SummaryCards.css";

export default function SummaryCards({ customerTotals }) {
  return (
    <section className="summary-cards-section">
      <h2 className="summary-cards-heading">{summaryCardText.heading}</h2>
      <table className="simple-table summary-cards-table">
        <thead>
          <tr>
            <th className="summary-cards-table-header">{summaryCardText.headers[0]}</th>
            <th className="summary-cards-table-header">{summaryCardText.headers[1]}</th>
            <th className="summary-cards-table-header">{summaryCardText.headers[2]}</th>
            <th className="summary-cards-table-header">{summaryCardText.headers[3]}</th>
          </tr>
        </thead>
        <tbody>
          {customerTotals.map((customer, customerRankIndex) => (
            <tr key={customer.customerId}>
              <td className="summary-cards-table-cell">{customerRankIndex + 1}</td>
              <td className="summary-cards-table-cell">{customer.customerName}</td>
              <td className="summary-cards-table-cell">{customer.totalPoints.toLocaleString()}</td>
              <td className="summary-cards-table-cell">{customer.totalTransactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

SummaryCards.propTypes = {
  customerTotals: PropTypes.arrayOf(customerTotalShape).isRequired,
};
