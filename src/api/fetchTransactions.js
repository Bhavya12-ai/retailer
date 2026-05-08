/**
 * fetchTransactions.js
 * --------------------
 * Simulates an asynchronous API call by loading a local JSON payload
 * from the public/data folder. This stays inside the project without
 * requiring a separate backend service.
 *
 * The delay below is purely to mimic network latency in the UI.
 */

import { logger } from "../utils/logger";

export function fetchTransactions() {
  logger.info("Starting fetch for /data/transactions.json");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/data/transactions.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load mock data: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          logger.info(`Loaded ${data.length} transactions from local mock JSON`);
          resolve(data);
        })
        .catch((error) => {
          logger.error("Transaction fetch failed", error);
          reject(error);
        });
    }, 600);
  });
}
