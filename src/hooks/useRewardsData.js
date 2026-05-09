
import { useState, useEffect, useMemo } from "react";
import transactionsData from "../data/transactions.json";
import { calculatePoints, formatMonth, getMonthKey } from "../utils/calculatePoints";

export function useRewardsData() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [fetchKey, setFetchKey]         = useState(0);

  const reload = () => setFetchKey((current) => current + 1);

  useEffect(() => {
    let cancelled = false; 

    setLoading(true);
    setError(null);

    const loadData = () => {
      if (!cancelled) {
        setTransactions(transactionsData);
        setLoading(false);
      }
    };

    const timer = setTimeout(loadData, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fetchKey]);

  const enrichedTransactions = useMemo(
    () =>
      transactions.map((transaction) => ({
        ...transaction,
        id:         transaction.transactionId,
        points:     calculatePoints(transaction.amount),
        monthKey:   getMonthKey(transaction.date),
        monthLabel: formatMonth(transaction.date),
      })),
    [transactions]
  );

  const months = useMemo(() => {
    const monthKeys = [...new Set(enrichedTransactions.map((transaction) => transaction.monthKey))].sort();
    return monthKeys.map((monthKey) => ({
      key: monthKey,
      label: formatMonth(monthKey + "-01"),
    }));
  }, [enrichedTransactions]);

  const monthlyData = useMemo(() => {
    const customerMonthlyPointsMap = {};

    enrichedTransactions.forEach(({ customerId, customerName, monthKey, points }) => {
      if (!customerMonthlyPointsMap[customerId]) {
        customerMonthlyPointsMap[customerId] = { customerName, months: {} };
      }
      if (!customerMonthlyPointsMap[customerId].months[monthKey]) {
        customerMonthlyPointsMap[customerId].months[monthKey] = { points: 0, transactionCount: 0 };
      }
      customerMonthlyPointsMap[customerId].months[monthKey].points += points;
      customerMonthlyPointsMap[customerId].months[monthKey].transactionCount += 1;
    });

    return customerMonthlyPointsMap;
  }, [enrichedTransactions]);

  const customerTotals = useMemo(() => {
    return Object.entries(monthlyData)
      .map(([customerId, { customerName, months }]) => {
        const totalPoints = Object.values(months).reduce((sum, monthData) => sum + monthData.points, 0);
        const totalTransactions = Object.values(months).reduce(
          (sum, monthData) => sum + monthData.transactionCount,
          0
        );
        return { customerId, customerName, totalPoints, totalTransactions };
      })
      .sort((customerA, customerB) => customerB.totalPoints - customerA.totalPoints);
  }, [monthlyData]);

  return {
    loading,
    error,
    transactions: enrichedTransactions,
    monthlyData,
    customerTotals,
    months,
    reload,
  };
}
