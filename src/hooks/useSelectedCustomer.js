import { useEffect, useMemo, useState } from "react";

export function useSelectedCustomer(customerTotals, transactions, monthlyData, months) {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  useEffect(() => {
    if (!selectedCustomerId && customerTotals.length > 0) {
      setSelectedCustomerId(customerTotals[0].customerId);
    }
  }, [customerTotals, selectedCustomerId]);

  const selectedCustomer = useMemo(
    () => customerTotals.find((customer) => customer.customerId === selectedCustomerId) || null,
    [customerTotals, selectedCustomerId]
  );

  const recentMonths = useMemo(() => months.slice(-3), [months]);

  const selectedCustomerTransactions = useMemo(() => {
    if (!selectedCustomerId) return [];
    return transactions.filter((transaction) =>
      transaction.customerId === selectedCustomerId &&
      recentMonths.some((month) => month.key === transaction.monthKey)
    );
  }, [selectedCustomerId, transactions, recentMonths]);

  const selectedCustomerMonthSummary = useMemo(() => {
    if (!selectedCustomerId) return [];
    return recentMonths.map((month) => {
      const monthData = monthlyData[selectedCustomerId]?.months?.[month.key] || {
        points: 0,
        transactionCount: 0,
      };
      return {
        monthKey: month.key,
        monthLabel: month.label,
        points: monthData.points,
        transactionCount: monthData.transactionCount,
      };
    });
  }, [selectedCustomerId, monthlyData, recentMonths]);

  return {
    selectedCustomerId,
    setSelectedCustomerId,
    selectedCustomer,
    recentMonths,
    selectedCustomerTransactions,
    selectedCustomerMonthSummary,
  };
}
