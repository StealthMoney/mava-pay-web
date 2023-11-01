import { DEFAULT_TRANSACTION_PER_PAGE } from "@/config/default";
import endpoints from "@/config/endpoints";
import axiosInstance from "@/services/axios";

export const getRecentTransactions = async () => {
  return await axiosInstance.get(endpoints.TRANSACTION.GET_RECENT());
};

export const getTransactions = async (
  page: number,
  limit: number = DEFAULT_TRANSACTION_PER_PAGE,
) => {
  return await axiosInstance.get(
    endpoints.TRANSACTION.GET_TRANSACTIONS(page, limit),
  );
};
