"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SideNavProps = {
  link: string;
  name: string;
  icon: string;
};

const SideNav = ({ link, name, icon }: SideNavProps) => {
  const pathname = usePathname()
  const isActive = pathname === link
  return (
    <Link href={link}>
      <div
        data-active-route={isActive || null}
        className="flex group data-[active-route]:text-brand-primary items-center gap-4 font-medium text-custom-gray-400 p-4 w-full "
      >
        <Image src={icon} alt={name} width={24} height={24} className="" />
        <div>{name}</div>
      </div>
    </Link>
  );
};

export default SideNav