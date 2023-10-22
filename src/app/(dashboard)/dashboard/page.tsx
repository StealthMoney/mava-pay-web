import { getRecentTransactions } from "@/app/services/transaction";
import { getProfile } from "@/app/services/user";
import TransactionTable from "@/components/transactionTable";
import { Wallet } from "@/types/wallet";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const user = await getProfile();
  if (!user?.data?.data) {
    redirect("/login");
  }
  const wallets = user.data.data.account.WalletDetails;

  const res = await getRecentTransactions();
  const recentTxns = res.data.data ?? [];

  return (
    <div className="flex flex-col gap-6 h-full">
      <CardsSection wallets={wallets} />
      <TableSection>
        <TransactionTable data={recentTxns} />
      </TableSection>
    </div>
  );
};

export default DashboardPage;

const CardsSection = ({ wallets }: { wallets: Wallet[] }) => {
  const btcWallet =
    wallets.find((data) => data.currency === "BTC")?.balance ?? 0;
  const ngnWallet =
    wallets.find((data) => data.currency === "NGN")?.balance ?? 0;
  const numberFormat = (number: number, symbol: string) =>
    `${new Intl.NumberFormat("en-NG").format(number)} ${symbol}`;
  return (
    <div className="grid grid-cols-12 gap-6 w-full">
      <SmallCard
        twProps="bg-orange-100"
        title="Total Amount Exchanged"
        amount={numberFormat(btcWallet, "BTC")}
        icon="/icons/wallet.svg"
      />
      <SmallCard
        twProps="bg-green-100"
        title="Total Amount Received"
        amount={numberFormat(ngnWallet, "NGN")}
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
