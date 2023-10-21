import { getProfile } from "@/app/services/user";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const user = await getProfile()

  if (!user?.data?.data) {
    redirect("/login")
  }
  const wallet = user.data.data.account.walletDetails
  return (
    <div className="flex flex-col gap-6">
      <CardsSection />
      <TableSection />
    </div>
  );
};

export default DashboardPage;

const CardsSection = () => {
  return (
    <div className="grid grid-cols-12 gap-6 w-full">
      <SmallCard twProps="bg-orange-100" title="Total Amount Exchanged" amount="0.00024 BTC" icon="/icons/wallet.svg" />
      <SmallCard twProps="bg-green-100" title="Total Amount Received" amount="30,000 NGN" icon="/icons/wallet-green.svg" />
    </div>
  );
};

const TableSection = () => {
  return (
    <section>
      <p className="text-xl font-medium">Recent Transactions</p>
      <div>
        <Link href="./transactions">
          <span className="text-brand-primary font-semibold text-sm hover:underline ml-auto">See all</span>
        </Link>
        <div>

        </div>
      </div>
    </section>
  )
}

const SmallCard = ({ twProps, title, amount, icon }: { twProps: string, title: string, amount: string, icon: string }) => {
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
