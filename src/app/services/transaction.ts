import endpoints from "@/config/endpoints";
import axiosInstance from "@/services/axios";

export const getRecentTransactions = async () => {
  return await axiosInstance.get(endpoints.TRANSACTION.GET_RECENT());
};
