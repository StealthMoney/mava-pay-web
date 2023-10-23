import React from "react";
import WalletForms from "./form";
import { Wallet } from "@/types/wallet";
import Image from "next/image";

import axiosInstance from "@/services/axios";
import { nairaUnitConversion } from "@/util";
import { getRecentTransactions } from "@/app/services/transaction";

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

  try {
    await axiosInstance.post("withdraw", data);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.response.data.message };
  }
};

const getQuote = async ({ amount }: { amount: string }) => {
  "use server";
  const data = {
    amount,
    sourceCurrency: "BTC",
    targetCurrency: "NGN",
    paymentMethod: "LIGHTNING",
  };
  try {
    const res = await axiosInstance.post("quote", data);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    console.log(error.resposne);
    return { success: false, message: error?.response?.data?.message };
  }
};

const getOrder = async (quoteId: string) => {
  "use server";
  try {
    const res = await axiosInstance.get(`quote/accept?id=${quoteId}`);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return { success: false, message: error.response.data.message };
  }
};

const getOrderById = async (orderId: string) => {
  "use server";
  try {
    const res = await axiosInstance.get(`order?id=${orderId}`);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    console.log(error.response);
    return { success: false, message: error.response.data.message };
  }
};

const CardsSection = ({ wallets }: { wallets: Wallet[] }) => {
  const btcWallet =
    wallets.find((data) => data.currency === "BTC")?.balance ?? 0;
  const ngnWallet = nairaUnitConversion(
    wallets.find((data) => data.currency === "NGN")?.balance ?? 0,
    "naira"
  );
  const usdWallet =
    wallets.find((data) => data.currency === "USD")?.balance ?? 0;
  const numberFormat = (number: number, symbol: string) =>
    `${new Intl.NumberFormat("en-NG").format(number)} ${symbol}`;
  return (
    <div className="grid grid-cols-12 gap-6 w-full mb-7">
      <SmallCard
        twProps="bg-green-100"
        title="Naira Balance"
        amount={numberFormat(ngnWallet, "NGN")}
        icon="/icons/wallet-green.svg"
      />
      <SmallCard
        twProps="bg-orange-100"
        title="BTC Balance"
        amount={numberFormat(btcWallet, "BTC")}
        icon="/icons/wallet.svg"
      />

      <SmallCard
        twProps="bg-green-100"
        title="USD Balance"
        amount={numberFormat(usdWallet, "USD")}
        icon="/icons/wallet-green.svg"
      />
    </div>
  );
};

function findWallet(wallets: Wallet[], currency: string): Wallet | null {
  for (let i = 0; i < wallets.length; i++) {
    if (wallets[i].currency === currency) {
      return wallets[i];
    }
  }
  return null;
}

const SmallCard = ({
  twProps,
  title,
  amount,
  icon,
}: {
  twProps: string;
  title: string;
  amount: string;
  icon: string;
}) => {
  return (
    <div className="col-span-2 md:col-span-3 p-8 flex flex-col gap-4 rounded-2xl bg-white">
      <div className={`p-4 rounded-full w-fit ${twProps}`}>
        <Image src={icon} alt="wallet" width={24} height={24} />
      </div>
      <p className="text-custom-gray-400 font-medium">{title}</p>
      <p className="text-2xl font-medium">{amount}</p>
    </div>
  );
};

const Wallet = async () => {
  const fetchWallet = async () => {
    try {
      const response = await axiosInstance.get("wallet");
      return response.data.data;
    } catch (error) {
      return [];
    }
  };
  const wallets = await fetchWallet();
  let wallet = findWallet(wallets, "NGN");
  return (
    <>
      <CardsSection wallets={wallets} />
      <WalletForms
        submitBank={submitBank}
        walletId={wallet ? wallet?.id : ""}
        withdraw={withraw}
        getQuote={getQuote}
        getOrder={getOrder}
        getOrderById={getOrderById}
      />
    </>
  );
};

export default Wallet;
