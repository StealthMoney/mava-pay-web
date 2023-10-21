import React from "react";
import TabSwitcher from "./tabswitcher";

const SettingsLayout = async ({children}: {children: React.ReactNode}) => {
  return (
    <div className="p-6 bg-white w-full h-full rounded-2xl shadow-lg flex flex-col gap-8">
      <TabSwitcher />
      <div>
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;