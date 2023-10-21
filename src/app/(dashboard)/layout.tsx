import Image from "next/image";
import {} from "@radix-ui/react-icons";
import { auth } from "@/auth";
import SideNav from "@/components/sideNav";
import DashboardHeader from "@/components/dashboardHeader";
import { redirect } from "next/navigation";

const sideNavList = [
  {
    link: "/dashboard",
    name: "Dashboard",
    icon: "/icons/humbleicons.svg",
  },
  {
    link: "/notification",
    name: "Notification",
    icon: "/icons/notif.svg",
  },
  {
    link: "/transactions",
    name: "Transactions",
    icon: "/icons/transaction.svg",
  },
  {
    link: "/settings",
    name: "Settings",
    icon: "/icons/setting.svg",
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.name) {
    redirect("/login")
  }

  const name = session?.user.name;
  const initials = name
    ?.split(" ")
    .slice(0, 2)
    .map((name) => name.trim().charAt(0))
    .join("");

  return (
    <div className="flex h-full">
      <div className="sidebar w-[264px] px-4">
        <div className="mt-8 ml-8">
          <Image alt="mavapay" src="/mavapay.svg" width={100} height={100} />
        </div>

        <div className="flex flex-col gap-4 mt-[120px]">
          {sideNavList.map(({link, name, icon}) => <SideNav key={name} link={link} name={name} icon={icon} />)}
        </div>
      </div>
      <div className="main w-full h-full flex flex-col">
        <section className="w-full py-4 px-6">
          <DashboardHeader session={session} navList={sideNavList} />
        </section>
        <main className="bg-custom-gray-200 p-6 h-full overflow-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
