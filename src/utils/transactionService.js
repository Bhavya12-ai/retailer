
import transactionsData from "../data/transactions.json";
import logger from "./logger";

export const loadTransactions = async () => {
  try {
    logger.info("Loading transactions data...");
    
    await new Promise(resolve => setTimeout(resolve, 100));
    logger.info("Transactions data loaded successfully.");
    return transactionsData;
  } catch (error) {
    logger.error("Failed to load transactions data:", error);
    throw error;
  }
};