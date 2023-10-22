"use client";
import React from "react";
// import * as Tabs from "@radix-ui/react-tabs";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const tabLinks = [
  { name: "Account Settings", path: "account" },
  // { name: "Security", path: "security" },
  { name: "Developer", path: "developer" },
  { name: "Wallet", path: "wallet" },
];

const TabSwitcher = () => {
  const pathList = usePathname()?.split("/");
  const activePath = pathList[pathList.length - 1];
  const activeTabIndex = tabLinks.findIndex((tab) => tab.path === activePath);

  return (
    <div>
      <Tabs size="md" variant="unstyled" index={activeTabIndex}>
        <TabList>
          {tabLinks.map(({ name, path }) => (
            <Tab
              data-active={activePath === path || null}
              className="group data-[active]:text-brand-primary text-custom-gray-400"
              key={path}
            >
              <Link className="" href={path}>
                <div>{name}</div>
              </Link>
            </Tab>
          ))}
        </TabList>
        <TabIndicator
          mt="-3px"
          height="2px"
          borderRadius="1px"
          className="bg-brand-primary"
        />
      </Tabs>
      {/* <Tabs.Root
          className="flex flex-col w-[300px] "
          defaultValue="account"
          value={pathname}
          onValueChange={handleSwitch}
        >
          <Tabs.List
            className="shrink-0 flex border-b border-mauve6"
            aria-label="Manage your account"
          >
            <Tabs.Trigger
              className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="account"
            >
              Account Settings
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="security"
            >
              Security
            </Tabs.Trigger>
            <Tabs.Trigger
              className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
              value="developer"
            >
              Developer
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root> */}
    </div>
  );
};

export default TabSwitcher;
