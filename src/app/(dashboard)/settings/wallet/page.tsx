import React from "react";
import WalletForms from "./form";

import axiosInstance from "@/services/axios";

const submitBank = async ({
  bankName,
  accountName,
  accountNumber,
  walletId,
}: {
  bankName: string;
  accountName: string;
  accountNumber: string;
  walletId: string;
}) => {
  "use server";
  const data = {
    bankName,
    bankAccountName: accountName,
    bankAccountNumber: accountNumber,
    currency: "NGN",
    walletId,
  };

  try {
    await axiosInstance.post("bankAccount", data);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response.data.message };
  }
};

const withraw = async ({
  amount,
  accountNumber,
  walletId,
}: {
  amount: string;
  accountNumber: string;
  walletId: string;
}) => {
  "use server";
  const data = {
    amount: Number(amount) * 100,
    bankAccountNumber: accountNumber,
    currency: "NGN",
    walletId,
  };

  console.log(data);

  try {
    await axiosInstance.post("withdraw", data);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response.data.message };
  }
};

const Wallet = async () => {
  const fetchWallet = async () => {
    try {
      const response = await axiosInstance.get("wallet?currency=NGN");
      return response.data.data.id;
    } catch (error) {
      return "";
    }
  };
  const walletId = await fetchWallet();
  return (
    <>
      <WalletForms
        submitBank={submitBank}
        walletId={walletId}
        withdraw={withraw}
      />
    </>
  );
};

export default Wallet;
