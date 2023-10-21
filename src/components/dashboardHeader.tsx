"use client"
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { SideNavProps } from "./sideNav";
import { Session, User } from "next-auth";

type DashboardHeaderProps = {
  navList: SideNavProps[]
  session: Session
};

const DashboardHeader = ({navList, session}: DashboardHeaderProps) => {
  const pathname = usePathname()
  const navHeading = navList.find(nav => nav.link === pathname)?.name ?? "Dashboard"

  const name = session.user.name as string;
  const initials = name
    ?.split(" ")
    .slice(0, 2)
    .map((name) => name.trim().charAt(0))
    .join("");

  const [firstName, lastName] = name.split(" ")
  return (
    <nav className="flex justify-between items-center">
      <p className="text-xl font-medium text-custom-gray-800">{navHeading}</p>
      <div className="flex gap-8 items-center">
        <Image
          src="/icons/notif.svg"
          alt="notification"
          width={20}
          height={20}
        />
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 grid place-items-center bg-brand-primary rounded-full text-white font-bold">
            {initials}
          </div>
          <div className="flex flex-col font-semibold text-custom-gray-800 leading-none ">
            <span>{firstName}</span>
            <span>{lastName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
