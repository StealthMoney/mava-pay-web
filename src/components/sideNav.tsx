"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SideNavProps = {
  link: string;
  name: string;
  icon: string | React.ReactNode;
  component?: React.ReactNode;
};

const SideNav = ({ link, name, icon, component }: SideNavProps) => {
  const pathname = usePathname();
  const initRoute = "/" + pathname.split("/")[1];
  const isActive = initRoute === link;
  return (
    <>
      {component ? (
        component
      ) : (
        <Link href={link}>
          <div
            data-active-route={isActive || null}
            className="flex group data-[active-route]:text-brand-primary items-center gap-4 font-medium text-custom-gray-400 p-4 w-full rounded-xl hover:bg-brand-primary-transparent hover:text-custom-gray-800 cursor-pointer"
          >
            {typeof icon === "string" ? (
              <Image
                src={icon}
                alt={name}
                width={24}
                height={24}
                className="text-brand-primary fill-brand-primary stroke-brand-primary"
              />
            ) : (
              icon
            )}
            <div>{name}</div>
          </div>
        </Link>
      )}
    </>
  );
};

export default SideNav;
