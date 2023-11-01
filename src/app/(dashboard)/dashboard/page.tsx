import { getRecentTransactions } from "@/app/services/transaction";
import { getProfile } from "@/app/services/user";
import TransactionTable from "@/components/transactionTable";
import { Wallet, WalletCurrency } from "@/types/wallet";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { currencyUnitConversion, currencyUnitFormat } from "@/util";

const DashboardPage = async () => {
  const user = await getProfile();
  if (!user?.data?.data) {
    redirect("/login");
  }
  const wallets = user.data.data.account.WalletDetails;
  const totalSatsExchanged = currencyUnitConversion(
    user.data.data.account.totalSatsExchanged ?? 0,
    WalletCurrency.Btc,
    false,
  );

  const res = await getRecentTransactions();
  const recentTxns = res.data.data ?? [];

  return (
    <div className="flex flex-col gap-6 h-full">
      <CardsSection wallets={wallets} totalSatsExchanged={totalSatsExchanged} />
      <TableSection>
        <TransactionTable data={recentTxns} />
      </TableSection>
    </div>
  );
};

export default DashboardPage;

const CardsSection = ({
  wallets,
  totalSatsExchanged,
}: {
  wallets: Wallet[];
  totalSatsExchanged: number;
}) => {
  const ngnWallet = currencyUnitConversion(
    wallets.find((data) => data.currency === WalletCurrency.Ngn)?.balance ?? 0,
    WalletCurrency.Ngn,
    false,
  );

  return (
    <div className="grid grid-cols-12 gap-6 w-full">
      <SmallCard
        twProps="bg-orange-100"
        title="Total Amount Exchanged"
        amount={currencyUnitFormat(totalSatsExchanged, WalletCurrency.Btc)}
        icon="/icons/wallet.svg"
      />
      <SmallCard
        twProps="bg-green-100"
        title="Current Balance"
        amount={currencyUnitFormat(ngnWallet, WalletCurrency.Ngn)}
        icon="/icons/wallet-green.svg"
      />
    </div>
  );
};

const TableSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-full">
      <div className="flex justify-between">
        <p className="text-lg font-medium text-custom-gray-800">
          Recent Transactions
        </p>
        <Link href="./transactions">
          <span className="text-brand-primary font-semibold text-sm hover:underline ml-auto">
            See all
          </span>
        </Link>
      </div>
      <div className="p-6 bg-white w-full h-full rounded-2xl shadow-lg mt-4">
        {children}
      </div>
    </section>
  );
};

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
    <div className="col-span-2 md:col-span-3 p-4 flex flex-col gap-4 rounded-2xl bg-white">
      <div className={`p-4 rounded-full w-fit ${twProps}`}>
        <Image src={icon} alt="wallet" width={24} height={24} />
      </div>
      <p className="text-custom-gray-400 font-medium">{title}</p>
      <p className="text-2xl font-medium">{amount}</p>
    </div>
  );
};
