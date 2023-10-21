import React from "react";
import TabSwitcher from "./tabswitcher";
import { redirect } from "next/navigation";

const Profile = () => {
  redirect("/settings/account")
  return (
    <></>
  );
};

export default Profile;
