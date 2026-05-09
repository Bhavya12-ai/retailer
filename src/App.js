
import React, { useEffect, useState } from "react";
import { useRewardsData } from "./hooks/useRewardsData";
import DashboardPage from "./pages/DashboardPage";
import MonthlyViewPage from "./pages/MonthlyViewPage";
import DetailedViewPage from "./pages/DetailedViewPage";
import { pageStrings } from "./constants/uiConstants";
import "./App.css";

export default function App() {
  const {
    loading,
    error,
    transactions,
    monthlyData,
    customerTotals,
    months,
    reload,
  } = useRewardsData();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  useEffect(() => {
    if (!loading && !error && customerTotals.length > 0 && !selectedCustomerId) {
      setSelectedCustomerId(customerTotals[0].customerId);
    }
  }, [loading, error, customerTotals, selectedCustomerId]);

  useEffect(() => {
    if ((loading || error) && currentPage !== "dashboard") {
      setCurrentPage("dashboard");
    }
  }, [loading, error, currentPage]);

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
        <h1 className="page-title">{pageStrings.dashboardHeading}</h1>
        <p className="page-subtitle">
          {currentPage === "dashboard" && pageStrings.dashboardHint}
          {currentPage === "monthly" && pageStrings.monthlyHint}
          {currentPage === "detailed" && pageStrings.detailedHint}
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
            onReload={reload}
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
