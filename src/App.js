/**
 * App.js
 * ------
 * Root application component.  Renders the page shell (header + footer)
 * and mounts the RewardsDashboard.
 */

import React, { useState } from "react";
import { useRewardsData } from "./hooks/useRewardsData";
import DashboardPage from "./pages/DashboardPage";
import MonthlyViewPage from "./pages/MonthlyViewPage";
import DetailedViewPage from "./pages/DetailedViewPage";
import "./App.css";

export default function App() {
  const { loading, error, transactions, monthlyData, customerTotals, months } = useRewardsData();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedCustomerId, setSelectedCustomerId] = useState(
    customerTotals.length > 0 ? customerTotals[0].customerId : ""
  );

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    setCurrentPage("monthly");
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
  };

  const handleGotoDetailed = () => {
    setCurrentPage("detailed");
  };

  const handleBackToMonthly = () => {
    setCurrentPage("monthly");
  };

  return (
    <div className="app-root">
      <div className="page-title-block">
        <h1 className="page-title">Customer Rewards Dashboard</h1>
        <p className="page-subtitle">
          {currentPage === "dashboard" && "Select a customer to view their reward activity."}
          {currentPage === "monthly" && "Monthly breakdown of reward points."}
          {currentPage === "detailed" && "Detailed transaction view."}
        </p>
      </div>

      <div className="content-wrapper">
        {currentPage === "dashboard" && (
          <DashboardPage
            loading={loading}
            error={error}
            transactions={transactions}
            monthlyData={monthlyData}
            customerTotals={customerTotals}
            months={months}
            onSelectCustomer={handleSelectCustomer}
          />
        )}

        {currentPage === "monthly" && (
          <MonthlyViewPage
            customerTotals={customerTotals}
            monthlyData={monthlyData}
            months={months}
            selectedCustomerId={selectedCustomerId}
            onBack={handleBackToDashboard}
            onNext={handleGotoDetailed}
          />
        )}

        {currentPage === "detailed" && (
          <DetailedViewPage
            customerTotals={customerTotals}
            transactions={transactions}
            selectedCustomerId={selectedCustomerId}
            onBack={handleBackToMonthly}
          />
        )}
      </div>
    </div>
  );
}
