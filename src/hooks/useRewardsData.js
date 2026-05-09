/**
 * useRewardsData.js
 * -----------------
 * Custom hook that orchestrates:
 *   1. Fetching transactions via the simulated API
 *   2. Calculating points per transaction
 *   3. Aggregating points per customer per month
 *   4. Aggregating total points per customer
 *
 * Returns: { loading, error, transactions, monthlyData, customerTotals, months }
 */

import { useState, useEffect, useMemo } from "react";
import { fetchTransactions } from "../api/fetchTransactions";
import { calculatePoints, formatMonth, getMonthKey } from "../utils/calculatePoints";
import { logger } from "../utils/logger";

export function useRewardsData() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [fetchKey, setFetchKey]         = useState(0);

  const reload = () => setFetchKey((current) => current + 1);

  // ── 1. Fetch on mount / retry ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false; // guard against setting state on unmounted component

    setLoading(true);
    setError(null);

    fetchTransactions()
      .then((data) => {
        if (!cancelled) {
          setTransactions(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load transactions.");
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [fetchKey]);

  // ── 2. Enrich transactions with calculated points ──────────────────────────
  const enrichedTransactions = useMemo(
    () =>
      transactions.map((transaction) => ({
        ...transaction,
        id:            transaction.transactionId,
        points:        calculatePoints(transaction.amount),
        monthKey:      getMonthKey(transaction.date),
        monthLabel:    formatMonth(transaction.date),
      })),
    [transactions]
  );

  useEffect(() => {
    if (enrichedTransactions.length === 0) return;
    logTransactions(enrichedTransactions);
  }, [enrichedTransactions]);

  // ── 3. Sorted unique months (chronological) ────────────────────────────────
  const months = useMemo(() => {
    const monthKeys = [...new Set(enrichedTransactions.map((transaction) => transaction.monthKey))].sort();
    return monthKeys.map((monthKey) => ({
      key: monthKey,
      label: formatMonth(monthKey + "-01"), // build a valid date from the key
    }));
  }, [enrichedTransactions]);

  // ── 4. Monthly breakdown: { customerId → { monthKey → { points, txCount } } }
  const monthlyData = useMemo(() => {
    const customerMonthlyPointsMap = {}; // customerMonthlyPointsMap[customerId][monthKey] = { customerName, points, transactionCount }

    enrichedTransactions.forEach(({ customerId, customerName, monthKey, points }) => {
      if (!customerMonthlyPointsMap[customerId]) {
        customerMonthlyPointsMap[customerId] = { customerName, months: {} };
      }
      if (!customerMonthlyPointsMap[customerId].months[monthKey]) {
        customerMonthlyPointsMap[customerId].months[monthKey] = { points: 0, transactionCount: 0 };
      }
      customerMonthlyPointsMap[customerId].months[monthKey].points             += points;
      customerMonthlyPointsMap[customerId].months[monthKey].transactionCount += 1;
    });

    return customerMonthlyPointsMap;
  }, [enrichedTransactions]);

  // ── 5. Customer totals ─────────────────────────────────────────────────────
  const customerTotals = useMemo(() => {
    return Object.entries(monthlyData).map(([customerId, { customerName, months }]) => {
      const totalPoints        = Object.values(months).reduce(
        (sum, monthData) => sum + monthData.points,
        0
      );
      const totalTransactions = Object.values(months).reduce(
        (sum, monthData) => sum + monthData.transactionCount,
        0
      );
      return { customerId, customerName, totalPoints, totalTransactions };
    }).sort((customerA, customerB) => customerB.totalPoints - customerA.totalPoints); // descending by points
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

export function logTransactions(transactions) {
  if (!transactions.length) {
    logger.info("No transactions available to log.");
    return;
  }

  logger.info(`Transaction summary (${transactions.length} records)`);
  console.group("Transaction Log");
  transactions.forEach((transaction) => {
    console.log(
      `${transaction.transactionId} | ${transaction.customerName} (${transaction.customerId}) | $${transaction.amount} | ${transaction.date} | ${transaction.points} points`
    );
  });
  console.groupEnd();
}
